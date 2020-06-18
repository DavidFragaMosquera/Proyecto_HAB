<template>
  <div>
    <vue-headful title="Login" />
    <div class="login">
      <fieldset>
        <h2>Login</h2>
        <form>
          <input type="text" placeholder="Nombre de usuario" v-model="login" />
          <br />
          <input type="password" placeholder="password" v-model="password" />
          <br />
        </form>
          <button @click="Login(login, password)">Login</button>
      </fieldset>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      login: "",
      password: "",
    };
  },
  methods: {
    Login(login, password) {
      let self = this;
      axios
        .post("http://localhost:3000/user/logIn", {
          login: self.login,
          password: self.password,
        })
        .then(function(response) {
 
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("login", response.data.login);
          localStorage.setItem("id", response.data.id);
          self.$router.push("/products");
          Swal.fire({
              icon: "success",
              title: 'Login correcto',
              text: "Disfruta por la web, compra y vende mucho 😀",
              timer: 3000
      });
        })
        .catch(function(error) {
                  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Nombre de usuario o contraseña incorrecta',
    timer: 2000
})
          console.error(error);
        });
    },
  }
};
</script>

<style></style>