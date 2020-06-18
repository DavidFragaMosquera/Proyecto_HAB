<template>
  <div id="nav">
      <p><router-link :to="{ name:'Home'}"> Home</router-link></p>
      <p><router-link :to="{ name:'Login'}"> Login </router-link></p>
      <p><router-link :to="{ name:'Products'}">Productos</router-link></p>
      <p><router-link :to="{ name:'NewUser'}"> Registrate </router-link></p>
      <p><router-link :to="{ name:'About'}"> About</router-link></p>

      <br/>
      <button @click="logoutUser()">Logout</button>
    </div>
</template>

<script>
import { clearlogin, clearAuthToken, clearId } from "../aux/helpers.js";
export default {
  name: "MenuCustom",
  methods: {
    logoutUser() {
      this.$router.push("/user/logIn");
      clearlogin();
      clearAuthToken();
      clearId();
    },
  },
};
</script>

<style scoped>
#nav{
  
  display: flex;
  text-decoration: none;
  justify-content: center;
  text-decoration: none;
  background: white;
  font-weight: bold;
}
#nav p{
  padding: 0.75rem; 
  border-right: 1.5px solid rgb(0, 0, 0);
  text-decoration: none;
  color: black;
}
#nav p:last-child /* ,regist */{
  border-right: none;
}
button{
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: bold;
  color: red;
  background: white;
}
.regist{
  border-right: none;
  color: black;
}
</style>