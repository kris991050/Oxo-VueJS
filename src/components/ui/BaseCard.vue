<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    widthCard: {
      type: String,
      default: '10rem'
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  /* margin: 2rem auto; */
  width: v-bind(widthCard);
  /* max-width: 40rem; */
}
</style>