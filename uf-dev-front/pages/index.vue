<script setup>
import { onMounted, nextTick, ref } from "vue";

const runtimeConfig = useRuntimeConfig();
const games = ref();

onMounted(() => {
  nextTick(async () => {
    const userRes = await getAllGames(runtimeConfig.public.API_ENDPOINT)
    if (userRes.data && !userRes.error) {
      games.value = userRes.data.value


      for (const game of games.value) {
        const gamePlayersRes = await getGamePlayersById(runtimeConfig.public.API_ENDPOINT, game.id)
        if(gamePlayersRes.data && !gamePlayersRes.error) {
        game.players = gamePlayersRes.data.value
        }
      }

      console.log(games.value)
    }
  })
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'
  })
}

function savePDN(data, filename="pdn.txt") {
  data = toPDN(data["fen"], data["history"], data["game_result"]);
  let textFileAsBlob = new Blob([data], { type: 'text/plain' });
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

<template>
  <div class="home">
    <div class="hero">
      <div class="title">
        <h1>DRAUGHTS<span class="com">.com</span></h1>
        <p class="subtitle">The goal of draughts (english checkers) is simple : capture all of the opponent's pieces or block their movements. Does it seem easy ? Don't be fooled !</p>
      </div>
      <div class="rules-ctn">
        <div class="shadow" id="board" style="" >
          <div class="piece white-man square-7"></div>
          <div class="piece white-man square-8"></div>
          <div class="piece white-man square-10"></div>
          <div class="piece white-king square-11"></div>
          <div class="piece white-man square-12"></div>
          <div class="piece white-man square-15"></div>
          <div class="piece white-man square-16"></div>
          <div class="piece white-king square-19"></div>
          <div class="piece black-man square-17"></div>
          <div class="piece black-man square-18"></div>
          <div class="piece black-man square-21"></div>
          <div class="piece black-king square-22"></div>
          <div class="piece black-man square-23"></div>
          <div class="piece black-man square-25"></div>
          <div class="piece black-man square-26"></div>
          <div class="piece black-king square-30"></div>
        </div>
        <div class="rules">
          <div class="content">
            <h3>Pieces ✨</h3>
            <ul>
              <li>Each side stars with 12 men, either black or white. Whites move first.</li>
              <li>Pieces move diagonally to an adjacent empty square, or jump over an adjacent adverse piece if the square behind is empty.</li>
              <li><b>Men</b> are your starting pieces. They can only move forward, but once they reach the other end of the board, they'll become <b>kings</b> and will be able to move in all directions.</li>
              <li>Note that in english draughts, the <b>flying king rule</b> (kings able to move as far as they want) doesn't apply !</li>
            </ul>
            <div class="sep"></div>
            <h3>Capture ✨</h3>
            <ul>
              <li>Multiple opposing pieces may be captured in a single turn provided this is done by successive jumps made by a single piece.</li>
              <li>Capturing, if possible, is mandatory ; though you don't have to take the path that would capture the maximum amount of pieces. </li>
              <li><b>Men</b> are your starting pieces. They can only move forward, but once they reach the other end of the board, they'll become <b>kings</b> and will be able to move in all directions.</li>
            </ul>
            <div class="sep"></div>
            <h3>Endgame ✨</h3>
            <ul>
              <li>The game is <b>won</b> by a player if the opponent has no pieces left or cannot move any piece anymore.</li>
              <li>The game ends in a <b>tie</b> if 20 successive king movements have been made (by both players together) without any capture.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="global_history_ctn">
      <h3>··· Latest played games ···</h3>
      <table>
        <thead>
        <tr>
          <th scope="col">Rounds</th>
          <th scope="col">Players</th>
          <th scope="col">Played at</th>
          <th scope="col">Result</th>
          <th scope="col">Download PDN</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="game in games" :class="game.played_as == game.game_result ? 'win' : 'loose'">
          <td>{{ game.rounds }} </td>
          <td>
            <NuxtLink v-for="player in game.players"  :to="{ name: 'user-id', params: { id: player.username }}" class="players-container">
                <img class="game_result_img" v-if="player.color === 'Black'" src="~/assets/img/board/black_king.svg">
                <img class="game_result_img" v-else-if="player.color === 'White'" src="~/assets/img/board/white_king.svg">
                {{ player.username }}
            </NuxtLink>
          </td>
          <td>{{ formatDate(game.end_date) }}</td>
          <td class="centered">
            <img class="game_result_img" v-if="game.game_result === 'Black'" src="~/assets/img/board/black_king.svg">
            <img class="game_result_img" v-else-if="game.game_result === 'White'" src="~/assets/img/board/white_king.svg">
            <p v-else>Tie</p>
          </td>
          <td class="centered"><Icon @click="savePDN(game, `game-${game.end_date}-${game.game_result}.txt`)" name="material-symbols:download-2-rounded"/></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss">

h1 {
  font-family: "Teachers", sans-serif;
  font-weight: normal;
  color: #131313;
  font-size: 40px;
  .com {
    font-size: 28px;
  }
}
.hero {
  .title {
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 40px;
    align-items: center;
  }
  .subtitle {
    font-size: 14px;
    font-style: italic;
    opacity: 70%;
  }
  padding: 50px 0;
  width: 60%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;

  #board {
    width: 600px;
  }  .rules-ctn {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

.rules {
  padding: 10px 0 10px 15px;
  ul {
    li {
      padding:2px 0;
    }
  }
  h3 {
    font-size: 16px;
    margin-bottom: 5px;
  }
  .sep {
    height: 1px;
    width: 100%;
    background-color: gray;
    margin: 10px 0 15px;
  }
}

.home {
  padding: 80px 0 80px 20px;
  .global_history_ctn {
    padding-top: 50px;
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    h3 {
      margin-bottom: 20px;
      font-family: "Teachers", sans-serif;
      font-weight: normal;
      color: #131313;
      font-size: 40px;
    }
    table {
      border-collapse: collapse;
      font-family: sans-serif;
      font-size: 0.8rem;
      letter-spacing: 1px;
      border-radius: 3px;
      width: 100%;

      thead,
      tfoot {
        background-color: #131313;
        color: white;
      }

      .players-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        color: #131313;
        text-decoration: none;
      }

      th,
      td {
        border: 1px solid rgb(160 160 160);
        padding: 8px 10px;
      }

      td{
        text-align: center;
      }

      tbody > tr:nth-of-type(even) {
        background-color: #fefefe;
      }
      .game_result_img {
        width: 30px;
      }
    }
  }
}
</style>
