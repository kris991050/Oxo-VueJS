<template>
  <header>
    <nav>
      <div>
        <router-link class="link-image" to="/"><img :src=imageOxo></router-link>
      </div>
      <ul>
        <li>
          <router-link to="/oxo">Oxo</router-link>
        </li>
        <li>
          <router-link to="/scores">Scores</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>

export default {
    data: function() {
        return {
            imageOxo: this.$store.getters['oxoModule/getImageOxo'],
        }
    }
  }
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}

img {
  display: block;
  margin-left: 0px;
  margin-top: 0px;
  width: 100%;
  height: auto;
  justify-content: center
}

.link-image {
  width: 15%;
  height: auto;
}
</style>