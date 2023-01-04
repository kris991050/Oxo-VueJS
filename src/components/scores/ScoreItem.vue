<template>
  <li>
    <div>
      <p>Date recorded: {{ score.date }}</p>
      <p>Score {{ score.nameX }} for X: {{ score.scoreX }}</p>
      <p>Score {{ score.nameO }} for O: {{ score.scoreO }}</p>
    </div>
  </li>
</template>

<script>
export default {
  props: ['score']
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

p {
  margin: 0.5rem 0 0 0;
}
</style>