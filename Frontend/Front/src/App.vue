<template>
  <div id="app">
    <div id="nav">
      <menucustom class="menuC"></menucustom>
    </div>
    <transition name="fade">
    <router-view/>
    </transition>
    <footercustom></footercustom>
    
  </div>
</template>

<script>
import footercustom from "@/components/FooterCustom.vue"
import menucustom from "@/components/MenuCustom.vue"
import Swal from "sweetalert2";

export default {
  name: "App",
  components: { menucustom, footercustom }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&family=Lexend+Tera&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Ubuntu&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');
*{
  font-family: 'Ubuntu', sans-serif;
}
.fade-enter-active, .fade-leave-active {
     transition-property: opacity;
     transition-duration: .25s;
}

.fade-enter-active {
     transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
     opacity: 0
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background: #241f2e; */
  background: black;
  color: #fff;
  list-style: none;
  min-height: 100vh;

}
#nav {
  padding: 30px;
/*   position: -webkit-sticky;
  position: sticky; */
  top: -1px;
}

#nav a {
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

ul{
  list-style: none;
}

button{
  border-radius: 9px;
  padding: 0.7rem 2rem;
  background: rgb(104, 39, 104);
  color: #fff;
  font-weight: bold;
  transition: all 0.9s ease;
  position: relative;
  
}
button:hover {
  background:rgb(44, 7, 33);
  overflow: hidden;
  top: 1.7px;
  transition: all 0.9s ease;

}
input{
  border-radius: 13px;
  padding: 0.5rem 1rem ;
}
textarea{
  border-radius: 13px;
  padding: 0.5rem 2rem ;
}
select{
    border-radius: 13px;
  padding: 0.5rem 2rem ;
}
date {
  border-radius: 13px;
  padding: 0.5rem 10rem;
}
h1{
font-family: 'Russo One', sans-serif;
}
img{
  max-width: 700px;
  max-height: 200px; 
}

a{
  text-decoration: none;
  color: rgb(48, 175, 97);

}

</style>
