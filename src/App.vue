<template>
  <div id="app">
    <div id="nav">
      <NavBar />
    </div>
    <router-view />
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-left: 10%;
  padding-right: 10%;
}

#nav {
  a {
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
  }
}

h1 {
  font-size: 1.3rem;
}
</style>
