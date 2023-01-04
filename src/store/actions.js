export default {
    switchTurn(context) {
      // Triggers next player's turn to play by updating the "turn" variable (using setTrun mutation)
      let turn = context.getters['getTurn']
      const oxoValues = context.getters['oxoModule/getOxoValues']
  
      // Switch to next turn
      if (turn === oxoValues[0]) {turn = oxoValues[1]}
      else if (turn === oxoValues[1]) {turn = oxoValues[0]}
      //turn = oxoValues[(oxoValues.findIndex(object => object === turn)+1)%2] // Oneliner alternative
  
      context.commit('setTurn', turn);
    },

    async setNewGame(context, startPlayer) {
      // Game initialization
      const oxoValues = context.getters['oxoModule/getOxoValues']
      const grid = context.getters['oxoModule/getOxoGrid']

      // Initialize "turn" variable to 1st player
      await context.commit('setTurn', startPlayer);

      // Initialize "winner" variable
      await context.commit('setWinner', oxoValues[2]);

      // Initialize "turnCounter" variable
      await context.dispatch('counterModule/resetCounter');

      // Oxo grid initialization: uses "setOxoElement" action to ^put none values in each element and set "show" to true
      await grid.forEach(item => {context.commit('oxoModule/setOxoElement', {id: item.id, value: oxoValues[2], win: false})})
     },

     initGame(context) {
      context.dispatch('setNewGame');
      context.dispatch('scoresModule/resetScore');

     },

    checkWin(context) {
       // Check if winning situation
      const grid = context.getters['oxoModule/getOxoGrid']
      const winMatrix = context.getters['oxoModule/getWinMatrix']
      
      for (const index in winMatrix) {
        const winElements = winMatrix[index]
        const gridSum = grid[winElements[0]].value + grid[winElements[1]].value + grid[winElements[2]].value

        // Check for winning situation
        if (Math.abs(gridSum) === 3) {
          context.dispatch('setWinner', true)
 
          return winElements
        }
      }
      return []

      // let gridMatrix = [[0, 0, 0],[0, 0, 0],[0, 0, 0]]
      // let i = 0, j = 0
      // grid.forEach(item => {
      //   gridMatrix[Math.floor(j/3)][i%3] = item.value
      //   i++, j++
      // })
    },

    setWinner(context, data) {
      context.commit('setWinner', data)
    },

    setWinElements(context, winElements) {
      // Set the winning state:
      const grid = context.getters['oxoModule/getOxoGrid']
      for (const i in winElements) { // Set grid elements with a "show" property of false (used for winning animation)  
        context.dispatch('oxoModule/setOxoElement', {
          id: winElements[i],
          value: grid[winElements[i]].value,
          win: true
        })
      }
    }
  }  
  