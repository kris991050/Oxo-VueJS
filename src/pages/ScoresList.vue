<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card widthCard="auto">
        <header>
          <h2>Saved Scores</h2>
          <base-button @click="clearScores">Clear Scores</base-button>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasSavedScores && !isLoading">
          <score-item
            v-for="score in savedScores"
            :key="score.id"
            :score="score"
          ></score-item>
        </ul>
        <h3 v-else>There is no score saved yet</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import ScoreItem from '../components/scores/ScoreItem.vue';

export default {
  components: {
    ScoreItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    savedScores() {
      return this.$store.getters['scoresModule/getSavedScores']
    },
    hasSavedScores() {
      return this.$store.getters['scoresModule/hasSavedScores'];
    }
  },
  // created() {
  //   this.loadSavedScores();
  // },
  methods: {
    async loadSavedScores() {
      this.isLoading = true;
      // try {
      //   // await this.$store.dispatch('requests/fetchRequests');
      //   await this.$store.getters['scoresModule/getSavedScores']
      // } catch (error) {
      //   this.error = error.message || 'Something failed!';
      // }
      this.isLoading = false;
    },
    clearScores() {
      this.$store.dispatch('scoresModule/clearSavedScores')
    },
    handleError() {
      this.error = null;
    }
  }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>