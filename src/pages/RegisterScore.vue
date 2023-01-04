<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="nameX">Name Player X</label>
      <input ref="nameX" type="text" id="nameX" v-model.trim="nameX" />
    </div>
    <div class="form-control">
      <label for="nameO">Name Player O</label>
      <input type="text" id="nameO" v-model.trim="nameO" />
    </div>
    <p class="errors" v-if="!formIsValid">Please enter non-empty names.</p>
    <div class="actions">
      <base-button type="submit">Save</base-button>
      <base-button type="button" @click="cancel()">Cancel</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      nameX: '',
      nameO: '',
      formIsValid: true,
      dueToInit: this.init
    };
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if (this.nameX === '' || this.nameO === '') {
          this.formIsValid = false;
          return;
      }

      this.$store.dispatch('scoresModule/saveScore', {
        nameX: this.nameX,
        nameO: this.nameO,
        scoreX: this.$store.getters['scoresModule/getScore'][0],
        scoreO: this.$store.getters['scoresModule/getScore'][1]
      })

      this.$router.replace('/scores');
      this.$store.dispatch('initGame')
    },

    initForm() {
      // Initialize form to empty fields and focus on first field
      this.nameX = ''
      this.nameO = ''
      this.formIsValid = true
      setTimeout(() => { // Timer used otherwise focus doesn't work well
        this.focusInput();
      }, 100)
    },

    cancel() {
      this.$router.replace('/');
    },

    focusInput() {
      this.$refs.nameX.focus()
    }
  },

  watch: {
    $route (to) {
      // Initialize form when enter this component's route
      if (to.path === "/registerScore") {
        this.initForm(); 
      }
    }
  },
  mounted() {
     this.initForm();
  }
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>