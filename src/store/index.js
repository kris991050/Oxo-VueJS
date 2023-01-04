import { createStore } from 'vuex';

import actions from './actions.js';

import counterModule from './modules/counter/index.js';
import oxoModule from './modules/oxo/index.js';
import scoresModule from './modules/scores/index.js';

// Hold general variables -> turn, winner,...

const store = createStore({
  modules: {
    oxoModule: oxoModule,
    scoresModule: scoresModule,
    counterModule: counterModule
  },
  state() {
    return {
      turn: oxoModule.state().oxoValues[2], // Define who's player's turn it is
      winner: false //oxoModule.state().oxoValues[2] // Define if there is a win situation
    };
  },
  getters: {
    // List of getters used to access store variables
    getTurn(state) {
      return state.turn;
    },
    getWinner(state) {
      return state.winner;
    }
  },
  mutations: {
    setTurn(state, payload) {
      // Updates "turn" variable
      state.turn = payload;
    },
    // Updates "winner" variable
    setWinner(state, payload) {
      state.winner = payload;
    }
  },
  actions
});

export default store;