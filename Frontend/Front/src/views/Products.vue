<template>
  <div class="articulos">
    <vue-headful title="Articulos" />
    <div>
      <listaproductos :articulos="articulos" :alquileres="alquileres" :cesiones="cesiones" ></listaproductos>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import vueHeadful from "vue-headful";
import listaproductos from "@/components/ShowProducts.vue";

export default {  
  name: "articulos",
  components: {
    vueHeadful,
    listaproductos,
  },
  data() {
    return {
      articulos: [],
      cesiones: [],
      alquileres: []
    };
  },
  methods: {
    // FUNCIÓN PARA MOSTRAR TODOS LOS PRODUCTOS
    showProducts() {
      let self = this;
      
      axios
        .get("http://localhost:3000/products")
        .then(function (response) {
          console.log(response)
       self.articulos = response.data.data.map((articulo) => {
         articulo.imagen = "http://localhost:3000/uploads/" + articulo.imagen;
         return articulo 
       }); 
        })
        .catch(function (error) {
          console.error(error);
        });
    },
      showCesion() {
      let self = this;
      
      axios
        .get("http://localhost:3000/products/category/cesion_derechos")
        .then(function (response) {
          console.log(response)
         self.cesiones = response.data.data.map((cesion) => {
         cesion.imagen = "http://localhost:3000/uploads/" + cesion.imagen;
         return cesion 
       });
        })
        .catch(function (error) {
          console.error(error);
        });
    },
      showRent() {
      let self = this;
  
      axios
        .get("http://localhost:3000/products/category/alquiler")
        .then(function (response) {
          console.log(response)
        self.alquileres = response.data.data.map((alquiler) => {
         alquiler.imagen = "http://localhost:3000/uploads/" + alquiler.imagen;
         return alquiler
        });
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  created() {
    this.showProducts();
    this.showCesion();
    this.showRent();
  },
};
</script>