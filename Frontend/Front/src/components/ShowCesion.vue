<template>
  <div>
      <div class="articulo" v-show="verArticulos">
         <h3>
          {{articulo.nombre_articulo}}
        </h3>
        <img :src="articulo.imagen" alt="imagen articulo">
       
        <p>
          {{articulo.descripcion}}
        </p>
        <p> Precio: 
          {{articulo.precio}}€/dia
        </p>
        <p>
          Disponible {{articulo.fecha_fin | moment(" DD-MM-YYYY")}}
        </p>
        <br>
        <button @click="openModal()">Comprar</button> 
        <br>
        <div v-show="modal" class="modal">
          <div class="modalBox">
            <form>
            <h3>Rellena los datos para finalizar tu pedido, gracias</h3>
                 <label for="fecha_inicio"> Fecha Inicio:</label>
                 <br>
                 <input type="date" id="fecha_inicio" name="fecha_inicio" v-model="datosCompra.fecha_inicio" />
                 <br>
                 <label for="fecha_fin"> Fecha Fin:</label>
                 <br>
                 <input type="date" id="fecha_fin" name="fecha_fin" v-model="datosCompra.fecha_fin" />
                 <br>
                 <label for="direccion"> Dirección:</label>
                 <br>
                 <input type="text" id="direccion" name="direccion" v-model="datosCompra.direccion" />
                 <br>
                 </form>
                 <button @click="buyProductEvent(articulo)">Comprar</button>
                 <button class="voltar" @click="closeModal()">Cerrar</button>
          </div>
        </div>
        <br>
        <button @click="verArticuloEvent">Volver al menu</button>
      </div>
<!-- VER ARTICULOS ECOMMERCE Y PRODUCTOS -->
    <div class="ecommerce_productos"
          v-show="!verArticulos">  
          <h2>Fotografias e-commerce y producto</h2>
      <div 
           v-for="(ecommerce_producto, index) in ecommerce_productos" 
           :key="ecommerce_producto.id">
        <img :src="ecommerce_producto.imagen" alt="foto ecommerce y producto" 
        @click="mostrarArticuloEvent(index)">
      </div>
    </div>
<!-- VER ARTICULOS BODAS Y EVENTOS -->
        <div 
          v-show="!verArticulos">  
          <h2>Fotografias bodas y eventos</h2>
      <div class="Bodas y eventos" 
           v-for="(bodas_eventos, index) in bodas_eventoss" 
           :key="bodas_eventos.tittle">
        <img :src="bodas_eventos.imagen" alt="foto bodas y eventos" 
        @click="mostrarBodasEvent(index)">
      </div>
    </div>
<!-- VER ARTICULOS RETRATO Y NATURALEZA -->
      <div 
          v-show="!verArticulos">  
          <h2>Fotografias retrato y naturaleza</h2>
      <div class="Retrato" 
           v-for="(retrato_naturaleza, index) in retrato_naturalezas" 
           :key="retrato_naturaleza.tittle">
        <img :src="retrato_naturaleza.imagen" alt="foto retrato y naturaleza" 
        @click="mostrarImagenEvent(index)">
      </div>
    </div>
    <button><router-link :to="{ name:'Products'}"> Volver al menú</router-link></button>    
  </div>
</template>

<script>
import Swal from "sweetalert2";
import VModal from "vue-js-modal";
import formatDateToDB from "@/aux/helpers.js"
export default {
name: 'listaproductos',
props:{
    ecommerce_productos: Array,
    articulo: Object,
    bodas_eventoss: Array,
    retrato_naturalezas: Array,
    verArticulos: Boolean,
    id: Number,
    comprar: Array, 
    datosCompra: Object,
}, 
data(){
  return {
    modal:false,
  }
},
methods: {
  mostrarArticuloEvent(index) {
      let data = this.ecommerce_productos[index].id;
      this.$emit("go", data);
    },
  mostrarBodasEvent(index) {
      let data = this.bodas_eventoss[index].id;
      this.$emit("go", data);
    },
  mostrarImagenEvent(index) {
      let data = this.retrato_naturalezas[index].id;
      this.$emit("go", data);
    },
  verArticuloEvent() {
      this.$emit("verArticulo");
    },
  openModal() {
    this.modal = true;

  },
  closeModal() {
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
padding-bottom: 2rem;
}

.modalBox {
background: black;
margin: 15% auto;
padding:100px;
border: 1px solid rgb(48, 175, 97);
border-radius: 13px;
width: 80%;
}

.modalBox button{
  margin: 1rem;
}


img {
  position: relative;
  text-align: left;
  display: block;
  transition: transform 700ms;
}

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