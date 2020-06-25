<template>
  <div class="todo">
<!--     <div>
      <label for="bySearch">Búsqueda</label>
      <br />
      <input
        v-model="search"
        id="search"
        name="bySearch"
        type="search"
        placeholder="Busca tu articulo 🔍"
      />
    </div> -->
    <div class="articulo" v-show="verArticulos">
         <h3>
          {{articulo.nombre_articulo}}
        </h3>
        <img :src="articulo.imagen" alt="imagen articulo">
       
        <p>
          {{articulo.descripcion}}
        </p>
        <p> Precio: 
          {{articulo.precio}}€
        </p>
        <br>

        <button @click="openModal()">Comprar</button>
        <br>
        <!-- <button @click="verArticuloEvent">Volver</button> -->
          <div v-show="modal" class="modal">
          <div class="modalBox">
            <form>
            <h3>Rellena los datos para finalizar tu compra, gracias</h3>
                 <label for="fecha_inicio"> Fecha Inicio:</label>
                 <input type="date" id="fecha_inicio" name="fecha_inicio" v-model="datosCompra.fecha_inicio" />

                 <label for="fecha_fin"> Fecha Fin:</label>
                 <input type="date" id="fecha_fin" name="fecha_fin" v-model="datosCompra.fecha_fin" />

                 <label for="direccion"> Direccción:</label>
                 <input type="text" id="direccion" name="direccion" v-model="datosCompra.direccion" />

                 </form>
                  <button @click="buyProductEvent(articulo)">Comprar</button>
                 <button @click="closeModal()">Volver</button>
          </div>
        </div>
        <br>
        <button @click="verArticuloEvent">Volver</button>
      </div>
    <div class="articulos"
          v-show="!verArticulos">  
          <h2>Todos los articulos</h2>
      <div class="Allproducts" 
           v-for="(articulo, index) in articulos" 
           :key="articulo.id">
        <img :src="articulo.imagen" alt="foto articulo" 
        @click="mostrarArticuloEvent(index)">
      </div>
    </div>

      <div 
          v-show="!verArticulos">  
        <h2><router-link :to="{ name:'Cesion'}"> Cesion derechos de imagen</router-link></h2>
      <div class="Cesiones" 
           v-for="(cesion, index) in cesiones" 
           :key="cesion.tittle">
        <img :src="cesion.imagen" alt="foto alquiler de equipos" 
        @click="mostrarCesionEvent(index)">
      </div>
    </div>
    
      <div 
          v-show="!verArticulos">  
        <h2><router-link :to="{ name:'Renting'}"> Alquiler de equipos</router-link></h2>
      <div class="Alquileres" 
           v-for="(alquiler, index) in alquileres" 
           :key="alquiler.tittle">
        <img :src="alquiler.imagen" alt="foto alquiler de equipos" 
        @click="mostrarAlquilerEvent(index)">
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import VModal from "vue-js-modal";
import formatDateToDB from "@/aux/helpers.js"

export default {
name: 'listaproductos', 

props:{
    articulos: Array,
    articulo: Object,
    cesiones: Array,
    alquileres: Array,
    verArticulos: Boolean,
    id: Number,
    comprar: Array, 
    datosCompra: Object 
},

data(){
  return {
    modal:false
  }
},

methods: {
  mostrarArticuloEvent(index) {  
      let data = this.articulos[index].id;
      this.$emit("go", data);
    },
  mostrarCesionEvent(index) {  
      let data = this.cesiones[index].id;
      this.$emit("go", data);
    },
  mostrarAlquilerEvent(index) {  
      let data = this.alquileres[index].id;
      this.$emit("go", data);
    },
  verArticuloEvent() {
      this.$emit("verArticulo");
    },
  openModal() {
    this.modal = true;

  },
  closeModal(){
    this.modal = false;

},
  buyProductEvent(articulo) {
    let data = articulo.id
    this.$emit("comprar", data);
  }
}
}


/*data(){
   return {
    search:"",
} */
// },
/* computed: {
    filteredProducts() {
      if (!this.search) {
        return this.articulos;
      }
      return this.articulos.filter(
        (articulo) =>
          articulo.nombre_articulo.toLowerCase().includes(this.search.toLowerCase())  ||
          articulo.tipo.toLowerCase().includes(this.search.toLowerCase()) ||
          articulo.subtipo.toLowerCase().includes(this.search.toLowerCase()) 
  this.$router.push("/user/logIn");

      )
    },
}, */
/* 
};*/


</script>

<style scoped>
div{
display: inline-block;
}
.modal {
position: fixed;
top: 0;
left: 0;
bottom: 0;
background: rgba(0, 0, 0, 0.5);
width: 100%;
}

.modalbox {
background: black;
margin: 15% auto;
padding: 20px;
border: 1px solid black;
width: 80%;
}
</style>