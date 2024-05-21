<template>
  <div class="game-ctn">
    <div class="board-ctn">
      <div id="board" v-html="drawBoard(last_state)" style="" @click="boardClickHandler">
      </div>
    </div>
    <div class="history">
      <div class="history-title">HISTORY</div>
      <div class="history-ctn">
        <template v-for="(item, i) in history">
          <div v-if="i % 2 === 0" class="history-cell">{{ Math.floor(i / 2) + 1}}</div>
          <div class="history-cell">{{item}}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.game-ctn {
  display: flex;
  gap: 20px;
}
.history {
  max-width: 500px;
  width: 500px;

  &-title {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
  }
  &-ctn {
    display: grid;
    grid-template-columns: 20% 1fr 1fr;
  }
  &-cell {
    height: 40px;
    border: 1px solid red;
  }
}
.history

.board-ctn {

}
#board {
  background-image: url("~/assets/img/board/board_bg_2.png");
  background-size: contain;
  width: 800px;
  aspect-ratio: 1;
  //display: grid;
  //grid-template-columns: repeat(8, 1fr);
  //grid-template-rows: repeat(8, 1fr);
  position: relative;
}

</style>
<script setup>
import {onMounted} from "vue";
let board;
onMounted(() =>{
  drawBoard(last_state);
  board = document.getElementById("board");
})
let isFrozen = false;
let saved_board;
let selected_index = -1;
let state_re = /^(?:(?<turn>[WB]):)*W(?<white>((K?(?:3[0-2]|[12][0-9]|[0-9]))(?:,K?(?:3[0-2]|[12][0-9]|[0-9]))*))?:B(?<black>((K?(?:3[0-2]|[12][0-9]|[0-9]))(?:,K?(?:3[0-2]|[12][0-9]|[0-9]))*))?$/
let last_state = "W14,18,19,21,23,24,K26,29,30,31,32:B1,2,3,4,6,7,9,10,11,12";
let legal_moves_str = ["10x17"];
let legal_moves = {};
let html_str = ref("");

function boardClickHandler($e) {

  if (isFrozen) {
    return;
  }
  let index = getIndexFromClick($e)
  if (!isValidIndex(index)) {
    resetBoard();
    return;
  }
  squareClickHandler(index)
}

function getIndexFromClick(e) {
  if (!e) { return -1 }
  let x = e.offsetX;
  let y = e.offsetY;
  let w = e.target.offsetWidth;
  let col = Math.floor(x / (w/8));
  let row = Math.floor(y / (w/8));
  return toIndex(col, row)
}

function resetBoard() {
  selected_index = -1;
  refreshBoard();
}

function squareClickHandler(index) {
  if (!isValidIndex(index) || isFrozen) {
    console.log("wtfr")
    return;
  }

  if (legal_moves[index]) {
    resetBoard();
    selected_index = index;
    hello.value.push(index)
    console.log(hello.value)
    addHints(index, legal_moves[index])
    console.log("here")
    return;
  }

  if (legal_moves[selected_index] && legal_moves[selected_index].includes(index)) {
    // TODO : ENVOYER LE MOVE
    console.log("Should send the move !")
  }
  resetBoard();
}

function addHints(origin, moves) {
  if (!board || !moves) { return; }
  board.innerHTML += `<div class="piece square-${origin} highlight"></div>`

  moves.forEach(move => {
    if (isValidIndex(move)) {
      board.innerHTML += `<div class="piece square-${move} hint"></div>`
    }
  })
}

function refreshBoard() {
  if (board && board.innerHTML !== saved_board) {
    board.innerHTML = saved_board;
  }
}

function drawBoard(state=last_state, addToHTML=false) {
  if (!state || !state_re.test(state)) {
    return null;
  }
  let temp = "";

  const { turn, white, black } = state_re.exec(state).groups;
  let color_pos = {"white": white.split(","), "black": black.split(",")};

  for (const [color, positions] of Object.entries(color_pos)) {
    positions.forEach(position => {
      let type = position.includes("K") ? "king" : "man";
      let nb = position.replace(/\D/g,'');
      if (nb < 1 || nb > 32) {
        return null;
      }
      temp += `<div class="piece square-${nb} ${color}-${type}"></div>`
    })
  }
  if (addToHTML) {
    let board = document.getElementById("board");
    board.innerHTML = temp;
  }
  saved_board = temp;
  return temp;
}

function parseMoves(moves) {
  legal_moves = {}
  if (!moves) {
    return legal_moves;
  }
  moves.forEach(move => {
    if (!/^\d+[x-]\d+$/.test(move)) {
      return;
    }
    let positions = move.split(/[x-]/);
    if (positions.length !== 2) { return; }

    let start_index = parseInt(positions[0]);
    let end_index = parseInt(positions[1]);
    if (!isValidIndex(start_index) || !isValidIndex(end_index)) { return; }
    if (legal_moves[start_index] === undefined) {
      legal_moves[start_index] = [end_index];
    } else {
      legal_moves[start_index].push(end_index);
    }
  })
  return legal_moves;
}
function isValidIndex(number) {
  return !isNaN(number) && number <= 32 && number > 0
}
function isValidPoint(x, y) {
  if (isNaN(x) || isNaN(y) ||
    x < 0 || x > 7 || y < 0 || y > 7) {
    return false;
  }
  return !(x%2 === y%2);
}

function toIndex(x, y) {
  if (!isValidPoint(x, y)) {
    return -1;
  }
  return Math.floor(y * 4 + x / 2)+1
}

parseMoves(legal_moves_str);

const hello = ref(["2x5","6x5","7-6","7x5"])
const history = computed(() =>{
  return hello.value;
})

</script>