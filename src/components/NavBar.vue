<template>
  <div class="nav-item">
    <router-link to="/" class="das-logo"> dasdas </router-link>
    <ul class="icons-list">
      <li class="icon-item"><i class="mdi mdi-twitter"></i></li>
      <li><i class="mdi mdi-soccer"></i></li>
      <li><i class="mdi mdi-goodreads"></i></li>
      <li><i class="mdi mdi-github"></i></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style lang="scss" scoped>
.nav-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .das-logo {
    background-color: $primary;
    padding: 50px 20px 0 0;
    color: $white;
  }

  .icons-list {
    display: inline-flex;
    flex-direction: row;
    justify-content: space-between;

    li {
      margin-right: 0.75rem;
      margin-left: 0.75rem;
    }
    .icon-item {
      list-style-type: none;
    }
  }
}
i {
  font-size: 25px;
  cursor: pointer;
}
</style>
