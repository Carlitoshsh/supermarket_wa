<template>
  <div class="simple-box">
    <label>Código proveedor</label>
    <input type="number" v-model="id" />
    <label>Nombre</label>
    <input v-model="name" />
    <label>Cedula</label>
    <input type="number" v-model="identificationId" />
    <label>Telefono</label>
    <input v-model="phone" />
    <label>Direccion</label>
    <input v-model="address" />
    <button v-on:click="saveSupplier">Publicar proveedor</button>
    <div class="simple-box error-server" v-if="serverConnect == false">
      <label>✖ No hay conexión con el servidor. Reintente...</label>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Suppliers",
  data: function () {
    return {
      id: 1234,
      name: "",
      identificationId: "",
      phone: "",
      address: "",
      serverConnect: null,
    };
  },
  methods: {
    saveSupplier: function () {
      let self = this;
      self.serverConnect = null;
      axios
        .post("http://localhost:5000/graphql", {
          query: `
              mutation {
                  createSupplier(supplier: {
                      id: ${self.id},
                      name: "${self.name}",
                      identificationId: "${self.identificationId}",
                      phone: "${self.phone}",
                      address: "${self.address}",

                  }) {
                      name
                    }
                  }
          `,
        })
        .then((result) => {
          self.name = result.data.data.createSupplier.name;
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
</style>