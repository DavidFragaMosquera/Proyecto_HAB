<template>
  <div>
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
        <button @click="buy()">Comprar</button> 
        <br>
        <br>
        <button @click="verArticuloEvent">Volver</button>
      </div>

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
    <router-link :to="{ name:'Products'}"> ↩️ </router-link>
  </div>
</template>

<script>
/* import Swal from "sweetalert2"; */
export default {
name: 'listaproductos',
props:{
    ecommerce_productos: Array,
    articulo: Object,
    bodas_eventoss: Array,
    retrato_naturalezas: Array,
    verArticulos: Boolean,
    id: Number
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
      )
    },
}, */
/* methods:{
buy(){
  this.$router.push("/user/logIn");

  this.$emit(comprar)
  Swal.fire({
    title: 'Articulo comprado',
    text:`Recibirás un mail con tu compra`,
    confirmButtonText: "Continuar comprando",
  });
},
} 
};*/
</script>

<style scoped>
   img {
  margin-left: 5rem;
  position: relative;
  display: inline-block;
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
</style>