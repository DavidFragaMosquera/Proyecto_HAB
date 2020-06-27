<template>
  <div>
    <vue-headful title="Login" />
<!-- LOGIN DE USUARIO -->
    <div class="login">
      <fieldset>
        <h2>Login</h2>
        <form>
          <input type="text" placeholder="Nombre de usuario" v-model="login" />
          <br />
          <input type="password" placeholder="Contraseña" v-model="password" />
          <br />
        </form>
          <button @click="Login(login, password)">Login</button>
      </fieldset>
    </div>
<!-- RECUPERAR CONTRASEÑA -->
  <div>
    <h5>¿No recuerdas tu contraseña?</h5>
     <h5>No te preocupes, pincha en el siguiente botón para recuperarla</h5> 
    <button @click="showRecoveryPassword()">Recuperar Contraseña</button>
    <div class="recuperarContraseña" v-show="seeRecoveryPassword">
      <h3>RECUPERAR CONTRASEÑA</h3>
      <h4>¿Has olvidado tu contraseña?</h4>
      <h5>No te preocupes, pon a continuación tu mail y te enviamos una nueva :)</h5>
      <input type="email" v-model="mail" placeholder="Escribe tu e-mail">
      <br>
      <button @click="recoveryPassword()">Enviar</button>
      <button @click="seeRecoveryPassword = false">Volver</button>
    </div>  
  </div>
<!-- REACTIVAR USUARIO ELIMINADO -->
    <br>
    <h5>¿Has eliminado tu cuenta y quieres recuperarla?</h5>
    <button @click="showReactivate()">Reactiva tu cuenta</button>
    <div class="ReactivarUsuario" v-show="seeReactivate">
      <h3>Reactivar tu cuenta</h3>
      <input type="text" placeholder="Nombre de usuario" v-model="loginRecover">
      <br>
      <input type="password" placeholder="Contraseña" v-model="passwordRecover">
      <br>
      <button @click="reactivate()">Reactivar cuenta</button>
      <button @click="seeReactivate = false">Volver</button>
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
      seeRecoveryPassword: false,
      mail: "",
      loginRecover: "",
      passwordRecover: "",
      seeReactivate: false,
    };
  },
  methods: {
// HACER LOGIN
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
          console.error(error.response.data.message);
        });
    },
// RECUPERAR CONTRASEÑA
    recoveryPassword(){
      const self = this;
      axios
        .put("http://localhost:3000/user/recovery", {
          mail: self.mail
        })
        .then(function(response) {
          Swal.fire({
              icon: "success",
              title: 'Revisa tu correo para recuperar contraseña',
              text: "Mira en 'spam' y no olvides cambiar tu contraseña en cuanto puedas",
              timer: 3000
          })
          self.seeRecoveryPassword = false;
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
        showRecoveryPassword() {
          this.seeRecoveryPassword = true;
    },
// REACTIVAR USUARIO
  reactivate() {
      const self = this;
      axios
        .put("http://localhost:3000/user/reactivate", {
          login: self.loginRecover,
          password: self.passwordRecover,
        })
        .then(function(response) {
          Swal.fire({
              icon: "success",
              title: "Cuenta recuperada, gracias por volver",
              text: "Recuerda de volver a hacer login con tus datos",
              timer: 3000
          })
          self.seeReactivate = false;
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
    showReactivate() {
      this.seeReactivate = true;
    }
  }
};
</script>

<style></style>