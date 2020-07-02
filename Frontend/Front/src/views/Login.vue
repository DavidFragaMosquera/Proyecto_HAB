<template>
  <div class="todo">
    <vue-headful title="Iniciar sesión" />
<!-- LOGIN DE USUARIO -->
    <div class="caja">
    <div class="login">
      <fieldset>
        <h2>Iniciar sesión</h2>
        <form>
          <input type="text" placeholder="Nombre de usuario" v-model="login" />
          <br />
          <input type="password" placeholder="Contraseña" v-model="password" />
          <br />
        </form>
          <button @click="Login(login, password)">Acceder</button>
      </fieldset>
    </div>
<!-- RECUPERAR CONTRASEÑA -->
  <div>
    <h4>¿No recuerdas tu contraseña?</h4> 
    <button @click="showRecoveryPassword()">Recuperar Contraseña</button>
    <div class="recuperarContraseña" v-show="seeRecoveryPassword">
      <h5>Escribe a continuación tu mail y te enviamos una nueva :)</h5>
      <input type="email" v-model="mail" placeholder="Escribe tu e-mail">
      <br>
      <button @click="recoveryPassword()">Enviar</button>
      <button class="volver2" @click="seeRecoveryPassword = false">Volver</button>
    </div>  
  </div>
<!-- REACTIVAR USUARIO ELIMINADO -->
    <br>
    <h4>¿Has eliminado tu cuenta y quieres recuperarla?</h4>
    <button @click="showReactivate()">Reactiva tu cuenta</button>
    <div class="ReactivarUsuario" v-show="seeReactivate">
      <h5>Escribe a continuación tu nombre de usuario y contraseña</h5>
      <input type="text" placeholder="Nombre de usuario" v-model="loginRecover">
      <br>
      <input type="password" placeholder="Contraseña" v-model="passwordRecover">
      <br>
      <button @click="reactivate()">Reactivar cuenta</button>
      <button class="volver" @click="seeReactivate = false">Volver</button>
    </div>
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
          Swal.fire({
              icon: "success",
              title: 'Login correcto',
              text: "Disfruta por la web, compra y vende mucho 😀",
              timer: 3000
          });
          self.$router.push("/profile");

        })
        .catch(function(error) {
         Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Nombre de usuario o contraseña incorrecta',
          timer: 2000
        })
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

<style scoped>

.todo{
  text-align: center;
  background-image: url('../assets/persona.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  height: 900px;
  width: 1800px;
  min-width: 98vw;
  padding-top: 1rem;
  margin-top: 0rem;
}
.caja{
  background: rgba(0, 0, 0, 0.322);
  padding-bottom: 2rem;
  width: 25%;
  border-radius: 20px;
  margin-left: 50rem;
  margin-top: 4rem;
  box-shadow: 0px 8px 6px -6px rgba(78, 90, 100, 0.479); 

}
.login form input, .ReactivarUsuario input{
  margin: 0.5rem;
}
.login button{
  margin-top: 0.5rem;
  box-shadow: 0px 8px 6px -6px rgba(78, 90, 100, 0.479)

}
.recuperarContraseña button, .ReactivarUsuario button{
  margin: 1rem;
}
h4, h2{
  color: rgb(48, 175, 97);
}
.volver,.volver2{
  background: rgba(54, 49, 49, 0.219);
  box-shadow: 0px 8px 6px -6px rgba(78, 90, 100, 0.479)
}


</style>

