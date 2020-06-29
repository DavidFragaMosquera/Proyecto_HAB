<template>
  <div class="todo">
    <!-- <div class="buscador">
      <label for="bySearch">🔍 Busca articulos por nombre, categoria o precio</label>
      <br>
      <input
        v-model="search"
        id="search"
        name="bySearch"
        type="search"
        placeholder="Busca tu articulo "
        size="33"/>
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
        <p>
          Disponible {{articulo.fecha_fin | moment(" DD-MM-YYYY")}}
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
                 <br>
                 <input type="date" id="fecha_inicio" name="fecha_inicio" v-model="datosCompra.fecha_inicio" />
                 <br>
                 <label for="fecha_fin"> Fecha Fin:</label>
                 <br>
                 <input type="date" id="fecha_fin" name="fecha_fin" v-model="datosCompra.fecha_fin" />
                 <br>
                 <label for="direccion"> Direccción:</label>
                 <br>
                 <input type="text" id="direccion" name="direccion" v-model="datosCompra.direccion" />
                 <br>
                 </form>
                  <button @click="buyProductEvent(articulo)">Comprar</button>
                 <button class="voltar" @click="closeModal()">Volver</button>
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
    datosCompra: Object, 
    
},

data(){
  return {
    modal:false,
    /* search: "" */
  }
},
//BUSCADOR
/*   computed: {
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
  }, */

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
</script>

<style scoped>
div{
display: inline-block;
}
.modal {
position: fixed;
top: 5;
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

/* .modalbox button .voltar{
 margin-left: 2rem;
} */

img {
  position: relative;
  display: block;
  margin-left: 1rem;
  /* flex: 1 1 0px; */
  transition: transform 700ms;
}

/* div:focus-within img,
div:hover img {
  transform: translateX(-5%);
}

img:focus ~ img,
img:hover ~ img {
  transform: translateX(5%);
} */

div img:focus,
div img:hover {
  transform: scale(1.3);
  z-index: 1;
}

h2{
  color: rgb(48, 175, 97);
  text-align: left;
  margin-left: 6rem;  
}

router-link{
  text-decoration: none;
}

</style>