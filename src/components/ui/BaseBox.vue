<template>
  <div class="box">
    <slot></slot>
  </div>
</template>

<style scoped>
.box {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 70px;
  text-align: center;
  margin: 4px auto;
  height: 180px;
  width: 180px;
}

</style>