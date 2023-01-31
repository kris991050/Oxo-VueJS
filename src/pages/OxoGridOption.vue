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
        <base-button @click="newGame()">New Game</base-button>
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
        <base-card v-if="!this.winner">Player's Turn: <img :src=playerImage :key="turn"><br><br>Time Left: {{ counterDisplay }} s</base-card>
        <base-card v-else-if="this.winner">Winner: <img :src=playerImage :key="turn"></base-card>
        <br><br>
        <base-card>Scores: <br><br>X: {{ scoreX }}<br>O: {{ scoreO }}</base-card>
        <br>
        <base-button link to="/registerScore">Save Scores</base-button>
        <!-- <base-button @click="saveScores">Save Scores</base-button> -->
      </div>
    </base-container>
  </section>
</template>

<script>
import OxoElement from '../components/oxo/OxoElement.vue';

export default {
  components: {
    OxoElement,
  },
  data: function() {
    return {
      imageX: this.$store.getters['oxoModule/getImageX'],
      imageO: this.$store.getters['oxoModule/getImageO'],
      imageNone: this.$store.getters['oxoModule/getImageNone'],
      valueX: this.$store.getters['oxoModule/getOxoValues'][0],
      valueO: this.$store.getters['oxoModule/getOxoValues'][1],
      sizeBoxElement: this.$store.getters['oxoModule/getSizeBoxElement'],
      playerStart: this.$store.getters['oxoModule/getOxoValues'][0],
      startTimer: true
    }
  },
  computed: {
    styleContainerInfo() {
      // Dynamically define grid element position
      return { 'left': 4*this.sizeBoxElement + 'px'}
    },
    oxoGrid() {
      return this.$store.getters['oxoModule/getOxoGrid'];
    },
    oxoValues() {
      return this.$store.getters['oxoModule/getOxoValues'];
    },
    turn() {
      return this.$store.getters['getTurn']
    },
    winner() {
      return this.$store.getters['getWinner']
    },
    playerImage() {
      // Used to update the "Player's Trun" or "Winner" information box with correct image (X or O)
      if (this.turn === this.valueX) {return this.imageX;}
      else if (this.turn === this.valueO) {return this.imageO;}
      else {return this.imageNone}
    },
    counterDisplay() {
      return this.$store.getters['counterModule/getCounter']
    },
    scoreX() {
      return this.$store.getters['scoresModule/getScore'][0];
    },
    scoreO() {
      return this.$store.getters['scoresModule/getScore'][1];
    }
  },
  methods: {
    async newGame() {
      // Trigger initializing action that will initialize Oxo grid. Triggered by functional button
      if(this.startTimer) {
        this.startTimer = false
        await this.$store.dispatch('setNewGame', this.playerStart);

        setTimeout(() => { // Timeout used to allow the previous countDown() timer to stop
          this.countDown();
            }, 1000)
        }
    },

    countDown() {
      // Management of the "Player's Turn" counter
      this.startTimer = true
      const counterInterval = setInterval(() => {
        if (this.winner || !this.startTimer) {
          // If winner exists, stop the counter
          clearInterval(counterInterval);
        }
        else if (this.counterDisplay === 0) {
          // If counter comes down to 0, set winner to other player
          clearInterval(counterInterval);
          this.$store.dispatch('switchTurn');
          this.$store.dispatch('setWinner', true);
          this.$store.dispatch('scoresModule/incScore', this.turn);
        }
        else {
          this.$store.dispatch('counterModule/setCounter', this.counterDisplay-1)
        }
      }, 1000);
    },

    async playElement(gridElement) {
      // Activated when clicking on an grid box -> trigger next play phase.
      if (!gridElement.value && !this.winner) {
        this.$store.dispatch('oxoModule/setOxoElement', {id: gridElement.id, value: this.turn, show: gridElement.show});

        // Check for win situation
        const winElements = await this.$store.dispatch('checkWin');
        
        // If win, prepare winning grid elements for transitions render and increase score
        if (this.winner) {
          setTimeout(() => { // Timeout used to allow proper images animations to take place
            this.$store.dispatch('setWinElements', winElements);
          }, 500)
          this.$store.dispatch('scoresModule/incScore', this.turn);
        }
        // If no win, switch turn to next player and reset counter
        else if (!this.winner) {
          this.$store.dispatch('switchTurn');
          this.$store.dispatch('counterModule/resetCounter');
        }
        }    
      // In case click on a box already filled in
      else if (!this.winner) {
        console.log("Box already assigned")
      }
    }
  }
  // created() {
  //   this.$store.dispatch('initGame');
  // }
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