export default {
  namespaced: true,
  state() {
    return {
      score: [0, 0], // Holds scores for X and O
      savedScores: [] // Holds saved scores and related data
    };
  },
  getters: {
    // List of getters used to access store variables
    getScore(state) {
      return state.score;
    },
    getSavedScores(state) {
      return state.savedScores;
    },
    hasSavedScores(_, getters) {
      return getters.getSavedScores && getters.getSavedScores.length > 0
    }
  },
  mutations: {
    incScore(state, playerIndex) {
      state.score[playerIndex] += 1
    },
    addScore(state, payload) {
      state.savedScores.unshift({
        id: payload.id,
        nameX: payload.nameX,
        nameO: payload.nameO,
        scoreX: payload.scoreX,
        scoreO: payload.scoreO,
        date: payload.date
      })
    },
    initScore(state) {
      state.score = [0, 0]
    },
    initSavedScores(state) {
      state.savedScores = []
    }
  },
  actions: {
    incScore(context, player) {
      const oxoValues = context.rootGetters['oxoModule/getOxoValues']
      const playerIndex = oxoValues.findIndex(object => {return object === player;})
      context.commit('incScore', playerIndex)
    },
    
    async fetchSavedScores(context) {
      // Gather savedScores from browser local storage
      if (localStorage.length > 0) {
        let scores = await JSON.parse(localStorage.scores);
        scores.forEach(score => context.commit('addScore', score)) 
      }
      else {
        context.dispatch('clearSavedScores')
      }
    },

    async saveScore(context, data) {
      const oldSavedScores = context.getters['getSavedScores']

      // Save scores locally into store
      const currentDate = new Date()
      const date = `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
      const id = context.getters['hasSavedScores']? oldSavedScores[(oldSavedScores.length)-1].id + 1 : 1

      await context.commit('addScore', {id: id, ...data, date: date})

      // Save scores to browser
      // localStorage Turtorial: https://blog.bitsrc.io/how-to-store-data-on-the-browser-with-javascript-9c57fc0f91b0
      const newSavedScores = context.getters['getSavedScores']
      localStorage.scores = JSON.stringify(newSavedScores)//{scoreX: this.scoreX, scoreO: this.scoreO});
    },

    clearSavedScores(context) {
      localStorage.clear()
      context.commit('initSavedScores')
    },

    resetScore(context) {
      context.commit('initScore')
    }
  }
};