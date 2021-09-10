<template>
  <div class="simple-box">
    <button v-on:click="getCategories">Obtener categorias</button>
    <div v-if="serverConnect">
      <select v-model="selected">
        <option
          v-for="option in options"
          v-bind:key="option.id"
          v-bind:value="option.id"
        >
          {{ option.name }}
        </option>
      </select>
      <div v-if="selected != null" class="simple-box">
        <label>Descripción del seleccionado:</label>
        <div class="simple-box success-server">
          <label>{{ options.find((x) => x.id == selected).description }}</label>
        </div>
        <button v-on:click="countVowels">
          Contar vocales en la descripción
        </button>
        <p>Cantidad vocales: {{ countVowelsValue }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Interop",
  data: function () {
    return {
      selected: null,
      options: [],
      serverConnect: null,
      countVowelsValue: null,
    };
  },
  methods: {
    getCategories: function () {
      let self = this;
      self.serverConnect = null;

      axios
        .post("http://localhost:5000/graphql", {
          query: `
                {
                    allCategories{
                        id,
                        name,
                        description
                    }
                }
                    `,
        })
        .then((result) => {
          (self.serverConnect = true),
            (self.options = result.data.data.allCategories);
        })
        .catch(() => {
          self.serverConnect = false;
        });
    },
    countVowels: function () {
      let self = this;

      axios
        .post("http://localhost:5000/graphql", {
          query: `
                mutation {
                        countVowels(id: ${self.selected}) {
                            totalVowels
                        }
                    }
                    `,
        })
        .then((result) => {
          (self.serverConnect = true),
            (self.countVowelsValue = result.data.data.countVowels.totalVowels);
        })
        .catch(() => {
          self.serverConnect = false;
        });
    },
  },
};
</script>

<style>
</style>