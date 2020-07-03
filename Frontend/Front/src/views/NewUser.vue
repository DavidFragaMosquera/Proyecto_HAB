<template>
  <div class="cont">
   <vue-headful title="Nuevo Usuario" />
    <h2>CREA TU CUENTA Y DISFRUTA DE LAS VENTAJAS!</h2>
    <p v-show="required">
      TIENES DATOS AÚN POR RELLENAR.
    </p>
    <div class="ventajas">
    <h3> ✔️ Alquila productos </h3>
    <h3> ✔️ Adquiere derechos de imagen </h3>
    <h3> ✔️ Pon en alquiler tus productos </h3>
    <h3> ✔️ Pon en venta derechos de imagen de tus fotos</h3>
    </div>
    <!-- FORMULARIO -->
    <div class="registro">
      <form>
      <label for="login">Nombre de usuario</label>
      <input
        type="text"
        name="login"
        placeholder="Escribe tu nombre de usuario"
        v-model="login"
      />
      <br />
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Escribe tu contraseña"
        v-model="password"
      />
      
      <br />
      <label for="nombre">Nombre</label>
      <input
        type="text"
        name="nombre"
        placeholder="Escribe tu nombre"
        v-model="nombre"
      />
      <br />
      <label for="apellidos">Apellidos</label>
      <input
        type="text"
        name="apellidos"
        placeholder="Escribe tus apellidos"
        v-model="apellidos"
      />
      <br />
      <label for="mail">Email</label>
      <input
        type="email"
        name="mail"
        placeholder="Escribe tu e-mail"
        v-model="mail"
      />
      <br />
           <label for="fecha_nacimiento">Fecha de nacimiento</label>
      <input
        type="date"
        name="fecha_nacimiento"
        placeholder="Escribe tu fecha de nacimiento"
        v-model="fecha_nacimiento"
      />
      <br />
      <br />
      </form>
        <button @click="addUser(login, nombre, apellidos, mail, password, fecha_nacimiento)">
        CREAR
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "NewUser",
  components: { /* menucustom */ },
  data() {
    return {
      login: "",
      password: "",
      nombre: "",
      apellidos: "",
      mail: "",
      fecha_nacimiento: "",
      correctData: false,
      required: false,
    };
  },
  methods: {
    validatingData() {
      if (
        this.login === "" ||
        this.password === "" ||
        this.nombre === "" ||
        this.apellidos === "" ||
        this.mail === "" ||
        this.fecha_nacimiento === ""
      ) {
        this.correctData = false; // NO ENVIAR //
        this.required = true;
      } else {
        this.correctData = true; // SI ENVIAR //
        this.required = false;
      }
    },
    addUser(login, password, nombre, apellidos, mail, fecha_nacimiento) {
      // VALIDANDO DATOS DEL FORMULARIO //
      this.validatingData();
      if (this.correctData === true) {
        let self = this;
        axios 
          .post("http://localhost:3000/new-user", {
            login: self.login,
            nombre: self.nombre,
            apellidos: self.apellidos,
            mail: self.mail,
            password: self.password,
            fecha_nacimiento: self.fecha_nacimiento
          })
          .then(function(response) {
            self.emptyFields();
            self.required = false;
            Swal.fire({
              icon: "success",
              title: 'Cliente creado',
              text: "Revisa tu mail para validar tu cuenta, gracias 😀",
              timer: 3000
      });
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'No has rellenado todos los campos',
    timer: 2000
});
      }
    },
    emptyFields() {
      this.login = "";
      this.nombre = "";
      this.apellidos = "";
      this.mail = "";
      this.password = "";
      this.fecha_nacimiento = "";
    },
  },
};
</script>

<style scoped>
p {
  color: red;
}
form {
  padding: 1rem;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  border-radius: 20px;
  flex-direction: column;
  font-weight: bold;
}

.registro{
  background: rgba(156, 156, 156, 0.185);
  width: 25%;
  padding: 2rem;
  border-radius: 20px;
  margin-left: 40rem;
  box-shadow: 0px 8px 6px -6px rgba(32, 37, 41, 0.479); 
}
.cont{
  min-width: 98vw;
  padding: -2rem;
  background-image: url('../assets/sacofoto.jpg');
  background-size: cover;
  height: 800px;
}
.ventajas{
  text-align: left;
  position: absolute; 
  visibility: visible; 
  left: 200px; 
  top: 290px; 
  z-index: 200;
  font-weight: bold;
}
h2{
  color: rgb(48, 175, 97);
  margin-top: -1rem;
}

</style>