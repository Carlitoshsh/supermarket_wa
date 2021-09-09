<template>
  <div id="Categories">
    <p>
      Usuario autenticado: <span>{{ username }}</span>
    </p>
    <button v-on:click="getCategory">Obtener categoría</button>
    <label>
      La categoría con id = <span>{{ category_id }}</span
      >, tiene el nombre <span>{{ name }}</span> y su descripción es «<span>{{
        description
      }}</span
      >».
    </label>
    <input v-model="category" placeholder="edit me" />
    <p>category is: {{ category }}</p>

    <input v-model="description" placeholder="edit me" />
    <p>description is: {{ description }}</p>
    <button v-on:click="postCategory">Publicar categoría</button>
    <div class="error-server" v-if="!serverConnect">
      <label>✖ No hay conexión con el servidor. Reintente...</label>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Categories",

  data: function () {
    return {
      category_id: "",
      name: "",
      description: "",
      category: "",
      serverConnect: true,
    };
  },

  created: function () {
    this.username = this.$route.params.username;
  },

  methods: {
    getCategory: function () {
      this.username = this.$route.params.username;
      let self = this;
      self.serverConnect = true;

      axios
        .post("http://localhost:5000/graphql", {
          query: `
                {
                    categoryById(id: 2){
                        id,
                        name,
                        description
                    }
                }
                    `,
        })
        .then((result) => {
          (self.serverConnect = true),
            (self.category_id = result.data.data.categoryById.id),
            (self.name = result.data.data.categoryById.name),
            (self.description = result.data.data.categoryById.description);
        })
        .catch(() => {
          self.serverConnect = false;
        });
    },
    postCategory: function () {
      let self = this;
      self.serverConnect = true;

      axios
        .post("http://localhost:5000/graphql", {
          query: `
                    mutation {
                        createCategory(category: {
                            name: "${self.category}",
                            description: "${self.description}"
                        }) {
                                name
                        }
                        }
                    `,
        })
        .then((result) => {
          self.name = result.data.data.createCategory.name;
          self.serverConnect = true;
        })
        .catch(() => {
          self.serverConnect = false;
        });
    },
  },
};
</script>

<style>
#Categories {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#Categories h2 {
  font-size: 25 px;
  color: #283747;
}
#Categories span {
  color: crimson;
  font-weight: bold;
}

.error-server {
  background: var(--error-color);
  color: var(--background-color);
  border-radius: 0.5rem;
  padding: 0.3rem 0.6rem;
  margin: 1rem 0;
}
</style>