<template>
  <div class="todo">
    <h1>P I C S F Y</h1>
    <h2>a c t i v o s  f o t o g r á f i c o s</h2>
    <div class="descripcion">
    <p> ✔️ Saca provecho a tu eqipo fotográfico alquilandoselo a otras personas </p>
    <p> ✔️ Cede derechos de tus imagenes por el precio que creas conveniente </p>
    <p> ✔️ Alquila equipo fotografico para ese viaje u ocasión especial </p>
    <p> ✔️ Adquiere derechos de imagen para usarlas en tu negocio </p>
    <button class="crear"><router-link :to="{ name:'NewUser'}"> Crear cuenta </router-link></button>
    <button><router-link :to="{ name:'Products'}"> Ver productos</router-link></button>
    </div>
  <div class="home">
    <button @click="showBuscador()">Buscador avanzado 🔽</button>

<!-- FORMULARIO PARA BUSCADOR -->
    <div  class="buscador" v-show="buscadorAvanzado">
      <form>
          <h3>🔎 Buscador de activos fotograficos</h3>
          <p>
            <b>Nombre </b>
            <br>
            <input
              v-model="nombre_articulo"
              type="search"
              name="nombre_articulo"
              size="33"
              placeholder="Escribe lo que quieras buscar"/>
          </p>
          <p>
            <b>Disponibilidad</b>
            <br>
            <input v-model="disponibilidad" type="radio" name="disponibilidad" value="1"/> Disponible
            <br>
            <input v-model="disponibilidad" type="radio" name="disponibilidad" value="0"/> No disponible
          </p>
          <p>
            <b>Fecha disponibilidad</b>
            <br>
            <input v-model="fecha_fin" type="date" name="fecha_fin" />
          </p>
          <p>
            <b>Categoria</b>
            <br>
            <input v-model="tipo" type="radio" name="tipo" value="alquiler"/> Alquiler de equipos
            <br>
            <input v-model="tipo" type="radio" name="tipo" value="cesion_derechos"/> Cesión derechos de imagen
          </p>
          <p>
            <b>Articulo</b>
            <br>
            <input v-model="subtipo" type="radio" name="subtipo" value="drones"/>Drones
            <br>
            <input v-model="subtipo" type="radio" name="subtipo" value="camaras_reflex"/>Camaras
            <br>
            <input v-model="subtipo" type="radio" name="subtipo" value="accesorios"/>Accesorios
            <br>
            <input v-model="subtipo" type="radio" name="subtipo" value="bodas_eventos"/> Fotos de bodas y eventos
            <br>
            <input v-model="subtipo" type="radio" name="subtipo" value="ecommerce_producto"/> Fotos e-commerce y producto
            <br>
            <input v-model="subtipo" type="radio" name="subtipo" value="retrato_naturaleza"/> Fotos retrato y naturaleza
          </p>
          <p>
            <b>Precio</b>
            <br>
            <input v-model="precio" type="number" name="precio"/>
          </p>
          <p>
            <input type="reset" value="Borrar" />
          </p>
        </form>
        <button @click="searchProducts()">OBTENER RESULTADOS</button>    
<!-- OBTENCION DE LOS RESULTADOS -->
        <div class="resultados">
          <ul v-for="searchResult in searchResults" :key="searchResult.id">
            <div>
              <li> <img :src="searchResult.imagen" alt="Foto articulo"> </li>
              <li> {{  searchResult.nombre_articulo }} </li>
              <li> {{  searchResult.precio }}€ </li>             
              <li> Disponible {{  searchResult.fecha_fin | moment(" D-MM-YYYY") }} </li>
              <li> {{  searchResult.tipo }} </li>
              <li> {{  searchResult.subtipo }} </li>
            </div>
          </ul>
        </div>
    </div>
  </div>
  </div>
</template>

<script>

import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: 'Home',
  components: { },
  data(){
    return {
      searchResults: [],
      search: {},
      nombre_articulo: "",
      fecha_inicio: "",
      fecha_fin: "",
      disponibilidad: "",
      tipo: "",
      subtipo: "",
      precio: "",
      imagen: "",
      buscadorAvanzado: false
    }
  },
  methods: {
  searchProducts(){
    const self = this;
    const searchProductsParams= self.makingSearchURL();
      axios
        .get(`http://localhost:3000/searching?${searchProductsParams}`)
        .then(function (response) {
          self.buscadorAvanzado = true;      
          self.searchResults = response.data.data.map((searchResult) => {
            searchResult.imagen = "http://localhost:3000/uploads/" + searchResult.imagen;
            return searchResult
          });        
        })
        .catch(function (error) {
          Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'No existen coincidencias con tu criterio de busqueda',
          timer: 3333
        })
        });
  },

  makingSearchURL(){
    const params = new URLSearchParams();
    if(!!this.nombre_articulo) {
      params.append("nombre_articulo", this.nombre_articulo);
    }
    if(!!this.fecha_inicio) {
      params.append("fecha_inicio", this.fecha_inicio);
    }
    if(!!this.fecha_fin) {
      params.append("fecha_fin", this.fecha_final);
    }
    if(!!this.disponibilidad) {
      params.append("disponibilidad", this.disponibilidad);
    }
    if(!!this.tipo) {
      params.append("tipo", this.tipo);
    }
    if(!!this.subtipo) {
      params.append("subtipo", this.subtipo);
    }
    if(!!this.precio) {
      params.append("precio", this.precio);
    }
    return params;
  },
  showBuscador(){
    this.buscadorAvanzado = !this.buscadorAvanzado;
  }
  }
}
</script>

<style scoped>

.home{
 margin-left: 15rem;
 text-align: left;
 margin-top: -5rem;
}
b{
  color: rgb(48, 175, 97);
}
.todo{
  background-image: url('../assets/landingg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  height: 900px;
  width: 1800px;
  min-width: 98vw;
  padding-top: 3rem;
  margin-top: 0rem;
}
h1{
  font-size: 3.5rem;
  margin-left: 15rem;
  margin-top: -5rem;
}
h2{
  margin-left: 15rem;
  color: rgb(48, 175, 97);
  margin-top: -2.5rem;
}

.resultados{
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
}

.resultados li{
  text-align: center;
  margin-bottom: 0.5rem;
}
.descripcion{
  text-align: left;
  position: absolute; 
  visibility: visible; 
  left: 1200px; 
  top: 350px; 
  z-index: 200;
  font-weight: bold;
}
.descripcion button{
  margin-left: 1.5rem;
  margin-top: 2rem;
  padding: 1.5rem 2rem;
  font-size: 1.3rem;
  box-shadow: 0px 8px 6px -6px rgba(59, 67, 73, 0.678); 
  

}
.descripcion .crear{
  background: rgb(35, 124, 69);
  box-shadow: 0px 8px 6px -6px rgba(78, 90, 100, 0.479); 


}
.descripcion .crear:hover{
  background:rgb(18, 44, 7);
  transition: all 0.9s ease;
  box-shadow: 0px 8px 6px -6px rgba(78, 90, 100, 0.479); 
}
.descripcion button a{
  color:white;
}



</style>
