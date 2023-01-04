<template>
  <section>
    <base-container style="left: 100px">
      <div class="box_wrapper" key="gridElement.id">
          <!-- for loop on the 9 different boxes of the grid.
          Parameters value (-1 or 1 for X or O), position in space and if should be shown or not (for the winning animations) -->
          <oxo-element v-for="gridElement in oxoGrid"
            :key="gridElement.id"
            :value="gridElement.value"
            :gridPosition="gridElement.gridPosition"
            :elementWin="gridElement.win"
            @click="playElement(gridElement)"
          ></oxo-element>
      </div>
    </base-container>
    <base-container :style=styleContainerInfo>
      <div class="info_row">
        <base-button @click="newGame">New Game</base-button>
        <br><br>
        <base-card>
          <span>Starting Player:</span>
          <br><br>
          <input type="radio" id="X" :value=oxoValues[0] v-model="playerStart">
          <label for="X">X</label>
          <br>
          <input type="radio" id="O" :value=oxoValues[1] v-model="playerStart">
          <label for="O">O</label>
        </base-card>
        <br><br>
        <base-card v-if="!winner">Player's Turn: <img :src=playerImage :key="turn"><br><br>Time Left: {{ counterDisplay }} s</base-card>
        <base-card v-else-if="winner">Winner: <img :src=playerImage :key="turn"></base-card>
        <br><br>
        <base-card>Scores: <br><br>X: {{ scoreX }}<br>O: {{ scoreO }}</base-card>
        <br>
        <base-button link to="/registerScore">Save Scores</base-button>
        <!-- <base-button @click="saveScores()">Save Scores</base-button> -->
      </div>
    </base-container>
  </section>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import OxoElement from '../components/oxo/OxoElement.vue';

export default {
  components: {
    OxoElement,
  },
  setup() {
    const store = useStore();

    const imageX = ref(store.getters['oxoModule/getImageX']);
    const imageO = ref(store.getters['oxoModule/getImageO']);
    const imageNone = ref(store.getters['oxoModule/getImageNone']);
    const valueX = ref(store.getters['oxoModule/getOxoValues'][0]);
    const valueO = ref(store.getters['oxoModule/getOxoValues'][1]);
    const sizeBoxElement = ref(store.getters['oxoModule/getSizeBoxElement']);
    const playerStart = ref(store.getters['oxoModule/getOxoValues'][0]);
    const startTimer = ref(true);

    const styleContainerInfo = computed(function() {
      // Dynamically define grid element position
      return { 'left': 4*sizeBoxElement.value + 'px'};
    });
    const oxoGrid = computed(function() {
      return store.getters['oxoModule/getOxoGrid'];
    });
    const oxoValues = computed(function() {
      return store.getters['oxoModule/getOxoValues'];
    });
    const turn = computed(function() {
      return store.getters.getTurn;
    });
    const winner = computed(function() {
      return store.getters.getWinner;
    });
    const playerImage = computed(function() {
      // Used to update the "Player's Trun" or "Winner" information box with correct image (X or O)
      if (turn.value === valueX.value) {return imageX.value;}
      else if (turn.value === valueO.value) {return imageO.value;}
      else {return imageNone.value}
    });
    const counterDisplay = computed(function() {
      return store.getters['counterModule/getCounter'];
    });
    const scoreX = computed(function() {
      return store.getters['scoresModule/getScore'][0];
    });
    const scoreO = computed(function() {
      return store.getters['scoresModule/getScore'][1];
    });

    async function newGame() {
      // Trigger initializing action that will initialize Oxo grid. Triggered by functional button
      if(startTimer.value) {
        startTimer.value = false;
        await store.dispatch('setNewGame', playerStart.value);

        setTimeout(() => { // Timeout used to allow the previous countDown() timer to stop
          countDown();
            }, 1000);
        }
    }

    function countDown() {
      // Management of the "Player's Turn" counter
      startTimer.value = true
      const counterInterval = setInterval(() => {
        if (winner.value || !startTimer.value) {
          // If winner exists, stop the counter
          clearInterval(counterInterval);
        }
        else if (counterDisplay.value === 0) {
          // If counter comes down to 0, set winner to other player
          clearInterval(counterInterval);
          store.dispatch('switchTurn');
          store.dispatch('setWinner', true);
        }
        else {
          store.dispatch('counterModule/setCounter', counterDisplay.value-1)
        }
      }, 1000);
    }

    async function playElement(gridElement) {
      // Activated when clicking on an grid box -> trigger next play phase.
      if (!gridElement.value && !winner.value) {
        store.dispatch('oxoModule/setOxoElement', {id: gridElement.id, value: turn.value, show: gridElement.show});

        // Check for win situation
        const winElements = await store.dispatch('checkWin');
        
        // If win, prepare winning grid elements for transitions render and increase score
        if (winner.value) {
          setTimeout(() => { // Timeout used to allow proper images animations to take place
            store.dispatch('setWinElements', winElements);
          }, 500)
          store.dispatch('scoresModule/incScore', turn.value);
        }
        // If no win, switch turn to next player and reset counter
        else if (!winner.value) {
          store.dispatch('switchTurn');
          store.dispatch('counterModule/resetCounter');
        }
        }    
      // In case click on a box already filled in
      else if (!winner.value) {
        console.log("Box already assigned")
      }
    } 

    onMounted(() => {

    })

    return {
      playerStart: playerStart,
      styleContainerInfo: styleContainerInfo,
      oxoGrid: oxoGrid,
      oxoValues: oxoValues,
      turn: turn,
      winner: winner,
      playerImage: playerImage,
      counterDisplay: counterDisplay,
      scoreX: scoreX,
      scoreO: scoreO,
      newGame,
      playElement
    };
  }
}
</script>

<style scoped>

.box_wrapper {
  /* position: relative; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

section {
  display: inline-block;
}

.info_row {
  display: relative
}

img {
  /* display: block; */
  margin-left: 20px;
  margin-top: 5px;
  width: 50%;
  height: 50%;
  /* justify-content: center */
}
</style>