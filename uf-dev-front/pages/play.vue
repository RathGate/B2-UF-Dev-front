<template>
  <Navbar></Navbar>
  <main>
    <div v-if="isGamePlaying" class="game-ctn">
      <div class="board-ctn">
        <div ref="board_div" id="board" :class="game_data.player_color === 'Black' ? 'inverted' : ''" v-html="board_html" style="" @click="boardClickHandler">
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
    <div v-else>
      WAITING FOR AN OPPONENT....
    </div>
  </main>
</template>

<style>
.game-ctn {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
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
#board {
  background-image: url("~/assets/img/board/board_bg_2.png");
  background-size: contain;
  width: 800px;
  aspect-ratio: 1;
  position: relative;
}
.game-ctn, .board-ctn, #board {
  max-width: 100%;
}
.inverted {
  transform: rotate(180deg);
}
</style>

<script setup>
const WS_IP = "192.168.1.69"
const WS_PORT = "6969"
let socket = ref();
const board_div = ref(null)

onMounted(() =>{
  board = document.getElementById("board");
  socket.value = new WebSocket(`ws://${WS_IP}:${WS_PORT}`)
  // Event linked to the reception of a websocket message
  socket.value.addEventListener('message', function(event) {
    const data = event.data;
    let message = "";
    if (!data) { return; }
    try {
      message = JSON.parse(data.replaceAll(/\\/g, ``))
    } catch (Exception) {
      console.log(data)
    }
    if (message["game"]) {
      if (!isGamePlaying.value && message["game"]) {
        isGamePlaying.value = true
      }
        game_data.value.parse_game_data(message)
        board_html.value = drawBoard(game_data.value.board, false)
        saved_board_html = board_html.value;
    }
  });

// Event linked to the opening of a websocket connection
  socket.value.addEventListener('open', function(event) {
    // Todo ?
    console.log('WebSocket connection opened.');
  });

// Event linked to the closing of a websocket connection
  socket.value.addEventListener('close', function(event) {
    // Todo ?
    console.log('WebSocket connection closed.');
  });
})




const history = computed(() =>{
  return history_arr.value;
})

let game_data = ref(new GameData());

import {onMounted} from "vue";

let isGamePlaying = ref(false)
let isFrozen = false;

let board_html = ref("");
let saved_board_html;
let board;
let history_arr = ref([])

let selected_index = -1;
let legal_moves = {};

function boardClickHandler($e) {
  if (isFrozen) {
    return;
  }
  let index = getIndexFromClick($e)
  if (!isValidIndex(index)) {
    selected_index = -1;
    board_div.value.innerHTML = saved_board_html
    return;
  }
  squareClickHandler(index)
}

function squareClickHandler(index) {
  if (!isValidIndex(index) || isFrozen || !game_data.value.legal_moves || game_data.value.player_color !== game_data.value.current_turn) {
    return;
  }

  if (game_data.value.legal_moves[index]) {
    board_div.value.innerHTML = saved_board_html
    selected_index = index;
    addHints(index, game_data.value.legal_moves[index], board_div.value)
    return;
  }

  if (game_data.value.legal_moves[selected_index] && game_data.value.legal_moves[selected_index].includes(index)) {
    socket.value.send(`${selected_index} ${index}`)
  }
  selected_index = -1;
  board_div.value.innerHTML = saved_board_html
}
</script>

