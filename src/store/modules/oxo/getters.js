import imageO from '../../../images/Image-O.jpg'
import imageX from '../../../images/Image-X.jpg'
import imageOxo from '../../../images/Image-Oxo.jpg'
import imageNone from '../../../images/Image-None.jpg'

export default {
  // List of getters used to access store variables
  getOxoGrid(state) {
    return state.oxoGrid;
  },
  getWinMatrix(state) {
    return state.winMatrix;
  },
  getImageX() {
    return imageX;
  },
  getImageO() {
    return imageO;
  },
  getImageOxo() {
    return imageOxo;
  },
  getImageNone() {
    return imageNone;
  },
  getOxoValues(state) {
    return state.oxoValues;
  },
  getSizeBoxElement(state) {
    return state.sizeBoxElement
  }
};