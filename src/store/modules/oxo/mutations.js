export default {
  setOxoElement(state, payload) {
    // Used to update grid element with proper value and "show" property. Called by the action of the same name.
    state.oxoGrid[payload.id].value = payload.value
    state.oxoGrid[payload.id].win = payload.win
  }
};