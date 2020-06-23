<template>
  <div class="articulos">
    <vue-headful title="Articulos" />
    <div>
      <listaproductos 
        :articulos="articulos"
        :articulo="articulo" 
        :alquileres="alquileres" 
        :cesiones="cesiones" 
        :verArticulos="verArticulos"
        v-on:go="mostrarArticulo"
        v-on:verArticulo="verArticulo">
        </listaproductos>

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
      articulo: {},
      cesiones: [],
      alquileres: [],
      verArticulos: false,
    };
  },
  methods: {
    // FUNCIÓN PARA MOSTRAR TODOS LOS PRODUCTOS
    showProducts() {
      let self = this;
      
      axios
        .get("http://localhost:3000/products")
        .then(function (response) {
       self.articulos = response.data.data.map((articulo) => {
         articulo.imagen = "http://localhost:3000/uploads/" + articulo.imagen;
         return articulo 
       }); 
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    // FUNCION PARA MOSTRAR ARTICULOS DE CESION DE IMAGENES
      showCesion() {
      let self = this;
      axios
        .get("http://localhost:3000/products/category/cesion_derechos")
        .then(function (response) {
         self.cesiones = response.data.data.map((cesion) => {
         cesion.imagen = "http://localhost:3000/uploads/" + cesion.imagen;
         return cesion 
       });
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    // FUNCION PARA MOSTRAR LOS ARTICULOS EN ALQUILER
      showRent() {
      let self = this;
  
      axios
        .get("http://localhost:3000/products/category/alquiler")
        .then(function (response) {
        self.alquileres = response.data.data.map((alquiler) => {
         alquiler.imagen = "http://localhost:3000/uploads/" + alquiler.imagen;
         return alquiler
        });
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    // FUNCION PARA MOSTRAR LOS ARTICULOS DE FORMA INDIVIDUAL
      mostrarArticulo(index) {
      let self = this;
      let data = index;
      axios
        .get("http://localhost:3000/product/" + data)
        .then(function(response) {
          console.log(response)
          self.articulo = response.data.data
          self.articulo.imagen = "http://localhost:3000/uploads/" + self.articulo.imagen;
          self.verArticulos = true;
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
    verArticulo(){
      this.verArticulos=false;
    }
  },
  created() {
    this.showProducts();
    this.showCesion();
    this.showRent();
  },
};
</script>

