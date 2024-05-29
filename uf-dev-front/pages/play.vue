<template>
  <main>
    <div v-if="isGamePlaying" class="game-ctn"  :class="game_data.player_color === 'Black' ? 'inverted' : ''" >
      <div class="board-ctn shadow">
        <template v-if="game_data.player_color === 'Black'">
          <div class="numbers-vt">
            <div class="number">29</div><div class="number"></div>
            <div class="number">21</div><div class="number"></div>
            <div class="number">13</div><div class="number"></div>
            <div class="number">5</div><div class="number"></div>
          </div>
          <div class="numbers-ht">
            <div class="number">4</div><div class="number"></div>
            <div class="number">3</div><div class="number"></div>
            <div class="number">2</div><div class="number"></div>
            <div class="number">1</div><div class="number"></div>
          </div>
        </template>
        <template v-else>
          <div class="numbers-vt">
            <div class="number">4</div><div class="number"></div>
            <div class="number">12</div><div class="number"></div>
            <div class="number">20</div><div class="number"></div>
            <div class="number">28</div><div class="number"></div>
          </div>
          <div class="numbers-ht">
            <div class="number">29</div><div class="number"></div>
            <div class="number">30</div><div class="number"></div>
            <div class="number">31</div><div class="number"></div>
            <div class="number">32</div><div class="number"></div>
          </div>
        </template>

        <div ref="board_div" id="board" v-html="board_html" style="" @click="boardClickHandler">
        </div>
      </div>
      <div class="info-ctn">

        <div class="player-ctn">
          <div class="pfp shadow"><img src="~/assets/img/placeholder_pfp.png" alt=""></div>
          <div class="player">
            <div class="username">{{ game_data.opponent_username }}</div>
            <div class="color-ctn"><span>Playing </span>
              <span class="color" v-if="game_data.player_color == 'Black'">White <img height="25" src="~/assets/img/board/white_king.svg"></span>
              <span class="color" v-if="game_data.player_color == 'White'">Black <img height="25" src="~/assets/img/board/black_king.svg"></span>
            </div>
          </div>
        </div>
        <div v-if="!game_data.isGameOver" class="to-move"><span class="color">{{ game_data.current_turn }}</span> to move !</div>
        <div v-else class="to-move result">
          <div v-if="game_data.result.score === 'Tie'" class="result-title"><span class="color">✨ TIE ✨</span></div>
          <div v-else class="result-title"><span class="color">✨ {{ game_data.result.score }} WINS ✨</span></div>
          <div v-if="game_data.result.score_comment" class="result-comment">{{ game_data.result.score_comment }}</div>
          <div class="btns">
            <div class="download-btn" @click="savePDN(game_data)">Download PDN</div>
            <div class="restart-btn" @click="refresh()">Restart a game</div>
          </div>

        </div>

        <div class="game-info-ctn">

          <div class="history">

            <div class="history-ctn">
              <div class="history-cell">1.</div>
              <template v-for="(item, i) in history">

                <div v-if="i % 2 === 0 && i !== 0" class="history-cell">{{ Math.floor(i / 2) + 1}}.</div>
                <div class="history-cell move">{{item}}</div>
              </template>
            </div>
          </div>
        </div>

        <div class="player-ctn">
          <div class="pfp shadow"><img src="~/assets/img/placeholder_pfp.png" alt=""></div>
          <div class="player">
            <div class="username-ctn" ><span class="username">{{ user.username }}</span><span class="is-you"> (you)</span></div>
            <div class="color-ctn"><span>Playing </span>
              <span class="color" v-if="game_data.player_color == 'Black'">Black <img height="25" src="~/assets/img/board/black_king.svg"></span>
              <span class="color" v-if="game_data.player_color == 'White'">White <img height="25" src="~/assets/img/board/white_king.svg"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <WaitingList></WaitingList>
    </div>
  </main>
</template>

<style lang="scss">
.btns {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
.download-btn {
  padding: 5px 10px;
  color: black;
  border-radius: 7px;
  border: 2px solid black;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}
.restart-btn {
  border: 1px solid red;
  padding: 5px 10px;
  color: black;
  background: #9cffae;
  border-radius: 7px;
  border: 2px solid black;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.result {
  display: flex;
  flex-direction: column;
  &-comment {
    font-size: 14px;
    position: relative;
    font-style: italic;
  }
}
.to-move {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5px;
  align-items: center;
  padding: 15px;
  border: 2px solid #131313;
  border-width: 2px 0;
  margin: 30px 0 0 ;
}
.info-ctn {
  display: flex;
  flex-direction: column;

  .game-info-ctn {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;
    scrollbar-gutter: stable both-edges;
    margin: 30px 0;
  }
  
  .player-ctn {
    height: 75px;
    display: flex;
    gap: 10px;
    .pfp {
      aspect-ratio: 1;
      border-radius: 10px;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }

    }
    .player {
      padding: 5px 0;
      .username {
        font-weight: bold;
      }
      .is-you {
        opacity: .7;
        font-size: 14px;
        font-style: italic;
      }
      .color-ctn {
        font-size: 12px;
        display: flex;
        gap: 5px;
        * {
          display: flex;
          align-items: center;
          gap: 5px;
        }

      }
    }
  }

  .color {
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: bold;
  }
}


.board-ctn {
  $number-width: 20px;
  position: relative;
  height: fit-content;
  margin-right: $number-width;
  .numbers-ht, .numbers-vt {
    position: absolute;
    display: grid;
  }
  .numbers-vt {
    grid-template-rows: repeat(8, 1fr);
    width: $number-width;
    height: 100%;
    top: 0px;
    right: -$number-width;
  }
  .numbers-ht{
    grid-template-columns: repeat(8, 1fr);
    height: $number-width;
    width: 100%;
    bottom: -$number-width;
    left: 0;
  }
  .number {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 12px;
  }
}


.game-ctn {
  display: flex;
  gap: 20px;
  flex-grow: 0;
  max-height: 820px;
}
.history {
  max-width: 500px;
  width: 500px;
  min-height: 300px;
  &-title {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
  }
  &-ctn {
    //max-width: 500px;
    display: grid;
    grid-template-columns: 20% 1fr 1fr;
  }
  &-cell {
    font-size: 14px;
    padding: 5px 0;
  }
  &-cell.move {
    font-weight: bold;
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
.inverted #board{
  transform: rotate(180deg);
}
</style>

<script setup>
definePageMeta({
  middleware: 'auth'
})
import {onBeforeRouteLeave} from "vue-router";
import {nextTick, onMounted} from "vue";
import WaitingList from "~/components/WaitingList.vue";

const WS_IP = "localhost"
const WS_PORT = "6969"
let socket = ref();
const user = ref();
const token = useCookie("token");
const runtimeConfig = useRuntimeConfig();
const board_div = ref(null)

function refresh() {
  window.location.reload()
}

// same as beforeRouteLeave option but with no access to `this`
onBeforeRouteLeave((to, from) => {
  if (!game_data || !game_data.value.result ) {
    return false;
  }
  const answer = window.confirm(
    "Do you really want to leave? If you're playing and the game is not finished, you'll be disqualified."
  )
  // cancel the navigation and stay on the same page
  if (!answer) return false
})

onMounted(async () =>{
  board = document.getElementById("board");

  nextTick(async () => {
    if(token.value) {
      const userRes = await getCurrentUser(runtimeConfig.public.API_ENDPOINT, token.value)
      if (userRes.data && !userRes.error) {
        user.value = userRes.data.value
        console.log(user.value)
      }
    }
  })

  socket.value = new WebSocket(`ws://${WS_IP}:${WS_PORT}`)
  // Event linked to the reception of a websocket message
  socket.value.addEventListener('message', function(event) {
    const data = event.data;
    let message = "";
    if (!data) { return; }
    try {
      message = JSON.parse(data.replaceAll(/\\/g, ``))
    } catch (Exception) {
    }
    if (message["game"]) {
      if (!isGamePlaying.value && message["game"]) {
        isGamePlaying.value = true
      }
        game_data.value.parse_game_data(message)
        board_html.value = drawBoard(game_data.value.board, false, game_data.value.last_move)
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
  return game_data.value.history;
})

let game_data = ref(new GameData());



let isGamePlaying = ref(false)
let isFrozen = false;

let board_html = ref("");
let saved_board_html;
let board;

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
    let message = {}
    message["id"] = user.value.id;
    message["username"] = user.value.username;
    message["move"] = `${selected_index} ${index}`;
    socket.value.send(JSON.stringify(message))
  }
  selected_index = -1;
  board_div.value.innerHTML = saved_board_html
}

function savePDN(game_data, filename="pdn.txt") {
  game_data = game_data.toPDN()
  let textFileAsBlob = new Blob([game_data], { type: 'text/plain' });
  let downloadLink = document.createElement('a');
  downloadLink.download = filename;
  downloadLink.innerHTML = 'Download File';

  if (window.webkitURL != null) {
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  } else {
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
  }
  downloadLink.click();
}
</script>

