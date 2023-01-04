export default {
  namespaced: true,
  state() {
    const counterMax = 30
    return {
        counterMax: counterMax,
        turnCounter: counterMax
    };
  },
  getters: {
    getCounter(state) {
      return state.turnCounter;
    },
    getCounterMax(state) {
      return state.counterMax;
    }
  },
  mutations: {
    setCounter(state, payload) {
      state.turnCounter = payload
    }
  },
  actions: {
    resetCounter(context) {
      const counterMax = context.getters['getCounterMax']
      context.commit('setCounter', counterMax)
    },

    setCounter(context, counterValue) {
      context.commit('setCounter', counterValue)
    }
  }
};
