<template>
  <div id="app">
    <div id="nav">
      <menucustom></menucustom>
    </div>
    <router-view/>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
