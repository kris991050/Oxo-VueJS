import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    const oxoValues = [-1, 1, 0] // Define values representing X, O and none
    const winMatrix = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]] // Different combinations of winning grids
    return {
      oxoValues: oxoValues,
      winMatrix: winMatrix,
      sizeBoxElement: 180,
      oxoGrid: [
        // Element array containing Oxo grid informations
        {
          id: 0,
          gridPosition: [0, 0],
          value: oxoValues[2],
          win: false
        },
        {
          id: 1,
          gridPosition: [1, 0],
          value: oxoValues[2],
          win: false
        },
        {
          id: 2,
          gridPosition: [2, 0],
          value: oxoValues[2],
          win: false
        },
        {
          id: 3,
          gridPosition: [0, 1],
          value: oxoValues[2],
          win: false
        },
        {
          id: 4,
          gridPosition: [1, 1],
          value: oxoValues[2],
          win: false
        },
        {
          id: 5,
          gridPosition: [2, 1],
          value: oxoValues[2],
          win: false
        },
        {
          id: 6,
          gridPosition: [0, 2],
          value: oxoValues[2],
          win: false
        },
        {
          id: 7,
          gridPosition: [1, 2],
          value: oxoValues[2],
          win: false
        },
        {
          id: 8,
          gridPosition: [2, 2],
          value: oxoValues[2],
          win: false
        }
      ]
    };
  },
  mutations,
  actions,
  getters
};
