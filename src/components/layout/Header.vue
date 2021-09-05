<template>
  <div class="header">
    <h3>Supermarket</h3>
    <nav>
      <button v-on:click="init" v-if="is_auth">Inicio</button>
      <button v-on:click="categories" v-if="is_auth">Categorías</button>
      <button v-if="is_auth">Productos</button>
      <button v-if="is_auth">Cerrar Sesión</button>
    </nav>
  </div>
</template>


<script>
export default {
  name: "Header",

  data: function () {
    return {
      is_auth: localStorage.getItem("isAuth") || false,
    };
  },

  methods: {
    init: function () {
      if (this.$route.name != "user") {
        let username = localStorage.getItem("current_username");
        this.$router.push({ name: "user", params: { username: username } });
      }
    },

    categories: function () {
      if (this.$route.name != "categories") {
        let username = localStorage.getItem("current_username");
        this.$router.push({
          name: "categories",
          params: { username: username },
        });
      }
    },
  },

  beforeCreate: function () {
    localStorage.setItem("current_username", "Carlos");
    localStorage.setItem("isAuth", true);

    this.$router.push({ name: "user", params: { username: "Carlos" } });
  },
};
</script>


<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media only screen and (max-width: 700px) {
  .header {
    flex-direction: column;
  }
}
</style>
