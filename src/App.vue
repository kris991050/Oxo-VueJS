<template>
  <!-- hearder will hold place for titles and navigation links -->
  <the-header></the-header>
  <main>
    <!-- router-view will hold place for different components -->
    <router-view v-slot="slotProps">
      <transition name="route">
      <!-- <transition name="route" mode="out-in"> -->
        <keep-alive>
          <component :is="slotProps.Component"></component>
        </keep-alive>
      </transition>
    </router-view>
  </main>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
  components: {
    TheHeader
  },
  mounted() {
    this.$store.dispatch('scoresModule/fetchSavedScores');
  }
}
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

/* main {
  display: flex;
  justify-content: space-around;
} */

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.5s ease-out;
}

/* .route-leave-active {
  transition: all 0.5s ease-in;
} */

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>