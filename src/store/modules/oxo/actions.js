export default {
  setOxoElement(context, data) {
    // Used to update grid element with proper value and "show" property. Call the mutation of the same name.
    const grid = context.getters['getOxoGrid']
    const id = grid.findIndex(object => {return object.id === data.id;});
    context.commit('setOxoElement', {id: id, value: data.value, win: data.win});
  }
}  
