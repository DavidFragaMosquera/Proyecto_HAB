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

    <!-- VER ARTICULO DE FORMA INDIVIDUAL -->
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
    <!-- VER ARTICULO DE FORMA INDIVIDUAL -->
<!-- VER TODAS LAS CAMARAS -->
    <div class="camaras"
          v-show="!verArticulos">  
          <h2>Camaras</h2>
      <div  
           v-for="(camara, index) in camaras" 
           :key="camara.id">
        <img :src="camara.imagen" alt="foto camara para alquilar" 
        @click="mostrarCamarasEvent(index)">
      </div>
    </div>
<!-- VER TODOS LAS CAMARAS -->
<!-- VER TODOS LOS DRONES -->
        <div 
          v-show="!verArticulos">  
          <h2>Drones</h2>
      <div class="Drones" 
           v-for="(dron, index) in drones" 
           :key="dron.tittle">
        <img :src="dron.imagen" alt="foto dron para alquilar" 
        @click="mostrarDronesEvent(index)">
      </div>
    </div>
<!-- VER TODOS LOS DRONES -->
<!-- VER TODOS LOS ACCESORIOS-->
      <div 
          v-show="!verArticulos">  
          <h2>Accesorios</h2>
      <div class="Accesorios" 
           v-for="(accesorio, index) in accesorios" 
           :key="accesorio.tittle">
        <img :src="accesorio.imagen" alt="foto accesorio para alquilar" 
        @click="mostrarAccesoriosEvent(index)">
      </div>
    </div>
<!-- VER TODOS LOS ACCESORIOS-->
    <router-link :to="{ name:'Products'}"> Volver </router-link>
  </div>
</template>

<script>
/* import Swal from "sweetalert2"; */
export default {
name: 'listaalquileres',
props:{
    camaras: Array,
    articulo: Object,
    drones: Array,
    accesorios: Array,
    verArticulos: Boolean,
    id: Number
}, 
methods: {
  mostrarCamarasEvent(index) {
      let data = this.camaras[index].id;
      this.$emit("go", data);
    },
  mostrarDronesEvent(index) {
      let data = this.drones[index].id;
      this.$emit("go", data);
    },
  mostrarAccesoriosEvent(index) {
      let data = this.accesorios[index].id;
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
   
</style>