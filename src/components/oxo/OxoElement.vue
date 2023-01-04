<template>
    <div>
      <!-- <transition name="box_change" mode="out-in"> -->
        <!-- Define each grid element. Hold image of X or O or nothing. -->
        <base-box class="box_element" :class="{ win_element : elementWin }"> <!-- v-if="elementShow" :style=styleBox> -->
          <transition :name=transitionName mode="out-in">
            <img :src=imageValue :key="value" v-if=!elementWin>
          </transition>
          </base-box>
      <!-- </transition> -->
    </div>
</template>

<script>

export default {
    props: ['value', 'gridPosition', 'elementWin'],
    data: function() {
        return {
            imageX: this.$store.getters['oxoModule/getImageX'],
            imageO: this.$store.getters['oxoModule/getImageO'],
            imageOxo: this.$store.getters['oxoModule/getImageOxo'],
            valueX: this.$store.getters['oxoModule/getOxoValues'][0],
            valueO: this.$store.getters['oxoModule/getOxoValues'][1],
            sizeBoxElement: this.$store.getters['oxoModule/getSizeBoxElement']
        }
    },
    computed: {
      imageValue() {
        // Define image to be held in the grid element (X or O)
        if (this.value === this.valueX) {return this.imageX}
        else if (this.value === this.valueO) {return this.imageO}
        else {return null}
      },
      styleBox() {
        // Dynamically define grid element position
        return { 'left': this.gridPosition[0]*this.sizeBoxElement + 'px', 'top': this.gridPosition[1]*this.sizeBoxElement + 'px' }
      },
      imageTransitionOutTime() {
        // Used in style section to change transition time if grid element is empty or hold a value (X or O)
        if (this.value) {return '0s'}
        else {return '0.5s'}
      },
      boxTransitionTime() {
        // Used in style section to change transition time if grid element is empty or hold a value (X or O)
        const winner = this.$store.getters['getWinner']
        if (winner) {return '3s'}
        else {return '0.5s'}
      },
      transitionName() {
        if (!this.elementWin) {
          return "img_change"
        }
        else {
          return "img_win"
        }
      }
    }
}
</script>

<style scoped>

img {
  display: block;
  margin-left: -40px;
  margin-top: -60px;
  width: 350%;
  justify-content: center
}

.box_element {
  position: flex;
  transition: background v-bind(boxTransitionTime) ease-in;
  /* transition-delay: 0.5s; */
}

.win_element {
  background: rgb(108, 168, 108);
}

.img_change-enter-from {
  opacity: 0;
}

.img_change-leave-to {
  opacity: 0;
}

.img_change-enter-active {
  transition: all 0.5s ease-out;
}

.img_change-leave-active {
  transition: all v-bind(imageTransitionOutTime) ease-in;
}

.img_change-enter-to,
.img_change-leave-from {
  opacity: 1;
}

.img_win-enter-from {
  opacity: 0;
  transform: scale(2);
}

.img_win-leave-to {
  opacity: 0;
  transform: scale(2.5);
}

.img_win-enter-active {
  transition: all 0s ease-out;
}

.img_win-leave-active {
  transition: all 1s ease-in;
}

.img_win-enter-to,
.img_win-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>