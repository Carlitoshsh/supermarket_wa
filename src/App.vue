<template>
  <div id="app">
    <header>
      <Header></Header>
    </header>
    <main class="main-component">
      <router-view></router-view>
    </main>
    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>

<script>
import Footer from "./components/layout/Footer.vue";
import Header from "./components/layout/Header.vue";

export default {
  name: "App",

  components: {
    Footer,
    Header,
  },
};
</script>

<style>
@import url("./assets/css/main.css");

button {
  border: 0.1rem solid var(--background-color);
  background: var(--primary-color);
  color: var(--background-color);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

button:hover {
  background: var(--secondary-color);
  /* cursor: pointer; */
}

#app {
  display: grid;
  grid-template: auto 1fr auto / auto 1fr auto;
  height: 100vh;
}

header {
  background: var(--primary-color);
  color: var(--background-color);
  padding: 2rem;
  grid-column: 1 / 4;
}

.left-side {
  grid-column: 1 / 2;
}

main {
  grid-column: 2 / 3;
}

.right-side {
  grid-column: 3 / 4;
}

footer {
  background: var(--secondary-color);
  color: var(--background-color);
  grid-column: 1 / 4;
  padding: 0 2rem;
}
</style>