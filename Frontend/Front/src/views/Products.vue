<template>
  <div class="articulos">
    <vue-headful title="Articulos" />
    <div>
      <div class="buscador">
      <label for="bySearch">🔍 Busca articulos por nombre, categoria o precio</label>
      <br>
      <input
        v-model="search"
        id="search"
        name="bySearch"
        type="search"
        placeholder="Busca tu articulo "
        size="33"/>
    </div>
      <listaproductos 
        :articulos="articulos"
        :articulo="articulo" 
        :alquileres="alquileres" 
        :cesiones="cesiones" 
        :verArticulos="verArticulos"
        v-on:go="mostrarArticulo"
        v-on:verArticulo="verArticulo"
        v-on:comprar="comprar"
        :datosCompra="datosCompra"     
        >
        </listaproductos>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import vueHeadful from "vue-headful";
import listaproductos from "@/components/ShowProducts.vue";
import formatDateToDB from "@/aux/helpers.js"
import Swal from "sweetalert2";

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
      datosCompra: {},
      correctData: false,
      search: ""
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
    },
// FUNCION PARA COMPRAR UN PRODUCTO
      comprar(data) {
        this.validateBuy();
        const self = this;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log(self.correctData)
          if (self.correctData === true){
        axios
        .post("http://localhost:3000/products/pedido/" + data, {
          direccion: self.datosCompra.direccion,
          fecha_inicio: self.datosCompra.fecha_inicio,
          fecha_fin: self.datosCompra.fecha_fin
    })
    .then(function(response){
        Swal.fire({
            icon: "success",
            title: "Articulo comprado con exito",
            text: "Revisa tu mail para la confirmación de la compra",
            timer: "3000"
          });
        self.emptyBuy();
    })
    .catch(function(error){
      console.error(error.response.data.message)
    });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Faltan datos por cubrir',
        timer: 3000
      })
    }
  },
    validateBuy() {
      if (
        this.datosCompra.direccion === "" ||
        this.datosCompra.fecha_inicio === "" ||
        this.datosCompra.fecha_fin === ""
      ) {
        this.correctData = false;
      } else {
        this.correctData = true;
      }
    },
    emptyBuy() {
      this.datosCompra.direccion = "";
      this.datosCompra.fecha_inicio = "";
      this.datosCompra.fecha_fin ="";
  }
  },
  created() {
    this.showProducts();
    this.showCesion();
    this.showRent();

  },
  computed: {
    filteredProducts() {
      if(!this.search) {
        return this.articulos;
      }
      return this.articulos.filter(
        (articulo) =>
          articulo.nombre_articulo.toLowerCase().includes(this.search.toLowerCase())  ||
          articulo.tipo.toLowerCase().includes(this.search.toLowerCase()) ||
          articulo.subtipo.toLowerCase().includes(this.search.toLowerCase()) ||
          articulo.precio.toLowerCase().includes(this.search.toLowerCase()) 
      );
    },
  },
};
</script>