<template>
  <div class="user_page">
    <div class="user_history_ctn">
      <h3 v-if="watchingUser">··· {{ watchingUser.username }}'s recent games ···</h3>
      <table v-if="games">
        <thead>
        <tr>
          <th scope="col">Rounds</th>
          <th scope="col">Played Against</th>
          <th scope="col">Played at</th>
          <th scope="col">Played as</th>
          <th scope="col">Result</th>
          <th scope="col">Download PDN</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="game in games" :class="game.played_as === game.game_result ? 'win' : 'loose'">
          <td>{{ game.rounds }} </td>
          <td>
              <NuxtLink :to="{ name: 'user-id', params: { id:  game.opponent ? game.opponent : game.username }}" class="players-container">
                  {{ game.opponent ? game.opponent : game.username }}
              </NuxtLink>
          </td>
          <td>{{ formatDate(game.end_date) }}</td>
          <td class="centered">
            <img class="game_result_img" v-if="game.played_as === 'Black'" src="~/assets/img/board/black_king.svg">
            <img class="game_result_img" v-else-if="game.played_as === 'White'" src="~/assets/img/board/white_king.svg">
          </td>
          <td class="centered">
            <img class="game_result_img" v-if="game.game_result === 'Black'" src="~/assets/img/board/black_king.svg">
            <img class="game_result_img" v-else-if="game.game_result === 'White'" src="~/assets/img/board/white_king.svg">
            <p v-else>Tie</p>
          </td>
          <td class="centered"><Icon @click="savePDN(game, `game-${game.end_date}-${game.game_result}.txt`)" name="material-symbols:download-2-rounded"/></td>
        </tr>
        </tbody>
      </table>
      <div v-else-if="!games && watchingUser">THIS PLAYER HAS NO GAME PLAYED</div>
      <div v-else>LOADING GAMES...</div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router"
import { onMounted, nextTick, ref } from "vue";


const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'
  })
}

const runtimeConfig = useRuntimeConfig();
const games = ref();
const watchingUser = ref();

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

onMounted(() => {
  nextTick(async () => {
    const watchingUserRes = await getUserByUsername(runtimeConfig.public.API_ENDPOINT, route.params.id)
      if (watchingUserRes.data && !watchingUserRes.error) {
        console.log(watchingUserRes)
        watchingUser.value = watchingUserRes.data.value
        const gameRes = await getUserGamesById(runtimeConfig.public.API_ENDPOINT, watchingUser.value.id)
        if (gameRes.data && !gameRes.error) {
          games.value = gameRes.data.value
        }
        console.log("user", watchingUser.value);
        console.log("games", games.value);
      }
  })
})



const route = useRoute();
console.log(route.params.id)

</script>

<style>
.user_page {
  padding: 100px 0 0 20px;
  width: 80%;
  margin: auto;

  .user_history_ctn {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    h3 {
      margin-bottom: 20px;
      font-family: "Teachers", sans-serif;
      font-weight: normal;
      color: #131313;
      font-size: 40px;
      text-align: center;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-family: sans-serif;
      font-size: 0.8rem;
      letter-spacing: 1px;
      width: 90%;
      border-radius: 3px;

      thead,
      tfoot {
        background-color: #131313;
        color: white;
      }

      a {
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

      .win {
        background: #d1ffd1;
      }

      .loose {
        background: #ffd1d1
      }
      .game_result_img {
        width: 30px;
      }
    }
  }
}
</style>