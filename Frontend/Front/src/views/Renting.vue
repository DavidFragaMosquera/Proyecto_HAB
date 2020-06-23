<template>
  <div class="alquiler">
    <vue-headful title="Alquiler de equipos" />
    <div>
      <h2>Alquiler de equipos</h2>
      <listaalquileres 
        :camaras="camaras"
        :articulo="articulo" 
        :drones="drones" 
        :accesorios="accesorios" 
        :verArticulos="verArticulos"
        v-on:go="mostrarArticulo"
        v-on:verArticulo="verArticulo">
        </listaalquileres>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import vueHeadful from "vue-headful";
import listaalquileres from "@/components/ShowRenting.vue";

export default {  
  name: "alquileres",
  components: {
    vueHeadful,
    listaalquileres,
  },
  data() {
    return {
      camaras: [],
      articulo: {},
      drones: [],
      accesorios: [],
      verArticulos: false 
    };
  },
  methods: {
    // FUNCIÓN PARA MOSTRAR TODOS LOS PRODUCTOS EN ALQUILER
/*     showRentingProducts() {
      let self = this;
      
      axios
        .get("http://localhost:3000/products/alquiler")
        .then(function (response) {
       self.articulos = response.data.data.map((articulo) => {
         articulo.imagen = "http://localhost:3000/uploads/" + articulo.imagen;
         return articulo 
       }); 
        })
        .catch(function (error) {
          console.error(error);
        });
    }, */
    // FUNCION PARA MOSTRAR CAMARAS EN ALQUILER
      showCamaras() {
      let self = this;
      
      axios
        .get("http://localhost:3000/products/category/alquiler/camaras_reflex")
        .then(function (response) {
         self.camaras = response.data.data.map((camara) => {
         camara.imagen = "http://localhost:3000/uploads/" + camara.imagen;
         return camara 
       });
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    // FUNCION PARA MOSTRAR DRONES EN ALQUILER
      showDrones() {
      let self = this;
      axios
        .get("http://localhost:3000/products/category/alquiler/drones")
        .then(function (response) {
          console.log(response)
        self.drones = response.data.data.map((dron) => {
         dron.imagen = "http://localhost:3000/uploads/" + dron.imagen;
         return dron
        });
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    // FUNCION PARA MOSTRAR ACCESORIOS EN ALQUILER
      showAccesorios() {
      let self = this;
      axios
        .get("http://localhost:3000/products/category/alquiler/accesorios")
        .then(function (response) {
          console.log(response)
         self.accesorios = response.data.data.map((accesorio) => {
         accesorio.imagen = "http://localhost:3000/uploads/" + accesorio.imagen;
         return accesorio
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
    this.showCamaras();
    this.showDrones();
    this.showAccesorios();
  },
};
</script>