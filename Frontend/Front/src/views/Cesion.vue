<template>
  <div class="Cesion">
    <vue-headful title="Cesion derechos de imagen" />
    <div>
        <h2>Cesion derechos de imagen</h2>
      <listacesion 
        :ecommerce_productos="ecommerce_productos"
        :articulo="articulo" 
        :bodas_eventoss="bodas_eventoss" 
        :retrato_naturalezas="retrato_naturalezas" 
        :verArticulos="verArticulos"
        v-on:go="mostrarArticulo"
        v-on:verArticulo="verArticulo">
        </listacesion>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import vueHeadful from "vue-headful";
import listacesion from "@/components/ShowCesion.vue";

export default {  
  name: "articulos",
  components: {
    vueHeadful,
    listacesion,
  },
  data() {
    return {
      ecommerce_productos: [],
      articulo: {},
      bodas_eventoss: [],
      retrato_naturalezas: [],
      verArticulos: false,
    };
  },
  methods: {
    // FUNCIÓN PARA MOSTRAR FOTOS E-COMMERCE Y PRODUCTO
    showEcommerceProducto() {
      let self = this; 
      axios
        .get("http://localhost:3000/products/category/cesion_derechos/ecommerce_producto")
        .then(function (response) {
            console.log(response)
       self.ecommerce_productos = response.data.data.map((ecommerce_producto) => {
         ecommerce_producto.imagen = "http://localhost:3000/uploads/" + ecommerce_producto.imagen;
         return ecommerce_producto 
       }); 
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    // FUNCION PARA MOSTRAR FOTOS DE BODAS Y EVENTOS
      showBodasEventos() {
      let self = this; 
      axios
        .get("http://localhost:3000/products/category/cesion_derechos/bodas_eventos")
        .then(function (response) {
         self.bodas_eventoss = response.data.data.map((bodas_eventos) => {
         bodas_eventos.imagen = "http://localhost:3000/uploads/" + bodas_eventos.imagen;
         return bodas_eventos
       });
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    // FUNCION PARA MOSTRAR FOTOS RETRATO Y NATURALEZA
      showRetratoNaturaleza() {
      let self = this;
      axios
        .get("http://localhost:3000/products/category/cesion_derechos/retrato_naturaleza")
        .then(function (response) {
        self.retrato_naturalezas = response.data.data.map((retrato_naturaleza) => {
         retrato_naturaleza.imagen = "http://localhost:3000/uploads/" + retrato_naturaleza.imagen;
         return retrato_naturaleza
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
    this.showEcommerceProducto();
    this.showBodasEventos();
    this.showRetratoNaturaleza();
  },
};
</script>