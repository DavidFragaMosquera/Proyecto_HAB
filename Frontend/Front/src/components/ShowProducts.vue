<template>
  <div>
    <h2>Nuestros productos</h2>
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

    <div class="Products">
        <h2>Todos</h2>
      <div class="Allproducts" v-for="articulo in articulos"  :key="articulo.id">
        <p>
          {{articulo.id}}
        </p>
        <p>
          {{articulo.nombre_articulo}}
        </p>
        <p>
          {{articulo.descripcion}}
        </p>
        <p>
          Disponibilidad:
          {{articulo.disponibilidad}}
        </p>
        <p>
          imagen:
          <img :src="articulo.imagen" alt="foto articulo">
        </p>
        <p> precio:
          {{ articulo.precio }}
        </p>
        <p>
          {{ articulo.tipo }}
        </p>
        <p>
          {{ articulo.subtipo }}
        </p>
        <p>
          {{ articulo.fecha_inicio }}
        </p>
        <p>
          {{ articulo.fecha_fin }}
        </p>
        <p> id_usuario:
          {{ articulo.id_usuario }}
        </p>
        <!-- <button @click="buy()">Comprar</button> -->
      </div>

        <h2>Cesion de derechos</h2>
      <div class="CesionDerechos" v-for="cesion in cesiones"  :key="cesion.title">
        <p>
          id:
          {{cesion.id}}
        </p>
        <p>
          {{cesion.nombre_articulo}}
        </p>
        <p>
          {{cesion.descripcion}}
        </p>
        <p>
          Disponibilidad:
          {{cesion.disponibilidad}}
        </p>
        <p>
          <img :src="cesion.imagen" alt="foto cesion de imagenes">
        </p>
        <p> precio:
          {{ cesion.precio }}
        </p>
        <p>
          {{ cesion.tipo }}
        </p>
        <p>
          {{ cesion.subtipo }}
        </p>
        <p>
          {{ cesion.fecha_inicio }}
        </p>
        <p>
          {{ cesion.fecha_fin }}
        </p>
        <p> id_usuario:
          {{ cesion.id_usuario }}
        </p>
        <!-- <button @click="buy()">Comprar</button> -->
      </div>

        <h2>Alquiler</h2>
      <div class="Alquiler" v-for="alquiler in alquileres"  :key="alquiler.name">
        <p>
          {{ alquiler.id}}
        </p>
        <p>
          {{ alquiler.nombre_articulo}}
        </p>
        <p>
          {{ alquiler.descripcion}}
        </p>
        <p>
          Disponibilidad:
          {{ alquiler.disponibilidad}}
        </p>
        <p>
          <img :src="alquiler.imagen" alt="foto alquiler producto">
        </p>
        <p> precio:
          {{ alquiler.precio }}
        </p>
        <p>
          {{ alquiler.tipo }}
        </p>
        <p>
          {{ alquiler.subtipo }}
        </p>
        <p>
          {{ alquiler.fecha_inicio }}
        </p>
        <p>
          {{ alquiler.fecha_fin }}
        </p>
        <p> id_usuario:
          {{ alquiler.id_usuario }}
        </p>
        <!-- <button @click="buy()">Comprar</button> -->
      </div>
    </div>
  </div>
</template>

<script>
/* import Swal from "sweetalert2"; */
export default {
name: 'listaproductos',
props:{
    articulos: Array,
    cesiones: Array,
    alquileres: Array,
}, 


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