<template>
<div>
  <h1>NUESTROS PRODUCTOS</h1>
  <div class="descripcion">
    <h4> Disponemos de 3 categorias: </h4>
    <h5>· Camaras </h5>
    <h5>· Drones</h5>
    <h5>· Accesorios</h5>
    <h4>Clicka en la imagen para ver los productos</h4>
  </div>
    <div class="descripcion2">
    <h4> Disponemos de 3 categorias: </h4>
    <h5>· E-commerce y producto </h5>
    <h5>· Bodas y eventos</h5>
    <h5>· Retrato y naturaleza</h5>
    <h4>Clicka en la imagen para ver los productos</h4>
  </div>
  <div class="articulos">
    <vue-headful title="Articulos" />
    <div class="alquiler">
    <h3>ALQUILER EQUIPOS</h3>  
    <router-link :to="{ name:'Renting'}">
      <p> foto cabecera cesion derechos de imagen </p>
<!--     <img src="../assets/alquiler.jpg" alt="foto cabecera alquiler de equipos"> -->
    </router-link>    
    </div>
<div class="cesion">
        <h3>CESIÓN DERECHOS</h3>
    <router-link :to="{ name:'Cesion'}"> 
      <p>foto cabecera cesion derechos de imagen</p>
<!--     <img src="../assets/cesion.jpg" alt="foto cabecera cesion derechos de imagen"> -->
    </router-link>
    </div>
  </div>
  </div>
</template>

<script>


</script>
<style scoped>
h1{
  color: #42b983;
  text-decoration: overline;
  letter-spacing: 10px;

}
h3{
  letter-spacing: 3px;
}
.articulos {
display: flex;
flex-direction: column;
align-content: center;
justify-content: center;
}
.articulos .cesion p{
  background-image: url('../assets/flower.jpg');
}
.articulos .alquiler p{
  background-image: url('../assets/login.jpg');
}

.alquiler, .cesion {
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 5px;
  transition: all .7 ;
  position: relative;
  cursor: pointer;
}
.articulos p{
  border: 2px solid rgba(255, 255, 255, 0.308);
  font-size: 0;
  background-position: center;
  background-size: 142%;
  background-repeat: no-repeat;
  width: 60rem;
  height: 20rem;
  margin: 0 auto;
  margin-right: 10rem;
  transition:  all .5s;
  position: relative;
  margin-bottom: 1rem;
  border-radius: 5px;
}
.cesion p{
  margin-left: 10rem;
}
.articulos p:hover{
  border-radius: 5px;
  filter: saturate(120%);
  background-size: 200%;
  transition: all 0.7s;
  opacity: 0.8; 
 
}
.articulos p::after{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/lupi.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 10rem;
  transition: all 0.8s;
  opacity: 0;
}
.articulos p:hover::after{
  top: 0;
  transition: all 0.8s;
  transform: scale(1.4);
  opacity: 1;
}
.descripcion{
  text-align: center;
  position: absolute; 
  visibility: visible; 
  left: 220px; 
  top: 365px; 
  z-index: 200;
  font-weight: bold;
  background: rgba(75, 74, 74, 0.233);
  padding: 2.3rem;
  border-radius: 2%;
  box-shadow: 0px 8px 6px -6px rgba(78, 73, 98, 0.548); 
}
.descripcion2{
  text-align: center;
  position: absolute; 
  visibility: visible; 
  left: 1220px; 
  top: 765px; 
  z-index: 200;
  font-weight: bold;
  background: rgba(75, 74, 74, 0.233);
  padding: 2.3rem;
  border-radius: 2%;
  box-shadow: 0px 8px 6px -6px rgba(78, 73, 98, 0.548); 

}
h4{
  color: #42b983;
}

</style>