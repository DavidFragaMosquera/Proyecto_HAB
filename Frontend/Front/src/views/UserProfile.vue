<template>
  <div>
<!-- CABECERA -->
    <vue-headful title="PerfilUsuario"/>
      <div>
      <div class="welcome">
       <h2>Bienvenido, {{ userData.login }}</h2>
       <h3>Este es tu area personal donde puedes editar tus datos y subir nuevos productos</h3>
        <img :src="userData.imagen" alt="foto perfil usuario" />
      </div>
<!-- BOTONES -->
        <button @click="showEditProfile()">Editar perfil</button>
        <button @click="showNewProduct()">Nuevo articulo</button>
<!-- NUEVO ARTICULO -->
    <div class="nuevoArticulo" v-show="seeProduct">
      <h2>Sube un nuevo articulo</h2>
      <form>
        <fieldset>
          <ul>
       <!--   <li>           
                <label for="imagen"></label>
                <br/>
                <input type="file" name="imagen" id="imagen"/>
              </li> -->

            <li>
              <label for="nombre_articulo">Nombre</label>
              <br/>
              <input type="text" name="nombre_articulo" id="nombre_articulo" v-model="nombre_articulo" />
            </li>

            <li>
              <label for="tipo">Categoria:</label>
              <br/>
              <select
                name="tipo"
                id="tipo"
                v-model="tipo">
                <option value="cesion_derechos">Cesion Derechos Imagen</option>
                <option value="alquiler">Alquiler de equipos</option>
              </select>
            </li>

            <li>
              <label for="subtipo">Subcategoria:</label>
              <br/>
              <select
                name="subtipo"
                id="subtipo"
                v-model="subtipo">
                <option value="ecommerce_producto">Cesion Derechos Imagen</option>
                <option value="bodas_eventos">Bodas y Eventos</option>
                <option value="retrato_naturaleza">Retrato y naturaleza</option>
                <option value="camaras_reflex">Camaras reflex</option>
                <option value="drones">Drones</option>
                <option value="accesorios">Accesiorios</option>
              </select>
            </li>

            <li>
              <label for="precio">Precio:</label>
              <br/>
              <input
                type="number"
                name="precio"
                id="precio"
                v-model="precio"/>
            </li>

            <li>
            <label for="descripcion">Descripcion</label>
            <textarea 
            name="descripcion"
            id="descripcion"
            v-model="descripcion">
            </textarea>
            </li>
          </ul>
        </fieldset>
      </form>
      <button @click="createProduct()">Subir producto</button>
      <button @click="seeProduct = false">Volver</button>
    </div>

<!-- LISTADO DATOS DE USUARIO -->
      <div v-show="!showEdit">
        <ul class="datosperfil">
          <li> Descripcion: {{ userData.descripcion }}</li>
          <li> Nombre: {{ userData.nombre }}</li>
          <li> Apellidos: {{ userData.apellidos }}</li>
          <li> Fecha de nacimiento: {{ userData.fecha_nacimiento }}</li>
          <li> Email: {{ userData.mail }}</li>
          <li> Telefono: {{ userData.telefono }}</li>
          <li> Direccion: {{ userData.direccion }}</li>
        </ul>

<!-- LISTADO ARTICULOS DE USUARIO -->
 <h3>Mis productos</h3>
 <div class="articulosUsuario">
        <ul v-for="articulo in articulos" :key="articulo.id">
          <li><img :src="articulo.imagen" alt="imagen articulo"></li>
          <li>Nombre: {{ articulo.nombre_articulo }}</li>
          <li>Descripcion: {{ articulo.descripcion }}</li>
          <li>Precio: {{ articulo.precio }}</li>

          <button @click="showProduct(articulo)">Editar</button>
          <button @click="deleteProduct(articulo)">Borrar</button>
        </ul>
      </div>
<!-- BOTONES PARA FUNCIONES DE EDICION DE USUARIO --> 
      </div>
    </div>
<!-- EDICION DATOS USUARIO -->
    <div class="edit" v-show="showEdit">
      <h3>Editar usuario</h3>
      <input type="text" v-model="newDescripcion" placeholder="Biografia"/>
      <input type="text" v-model="newNombre" placeholder="Nombre"/>
      <input type="text" v-model="newApellidos" placeholder="Apellidos"/>
      <input type="date" v-model="newFechaNacimiento"/>
      <!-- <input type="file"/> -->
      <input type="text" v-model="newMail" placeholder="Email"/>
      <input type="text" v-model="newTelefono" placeholder="Telefono"/>
      <input type="text" v-model="newDireccion" placeholder="Dirección"/>

      <button @click="editUser()">Modificar</button>
      <button @click="showEdit=false">Volver</button>
    
    </div>

<!-- EDITAR ARTICULO -->
 <div class="editProduct" v-show="seeEditProduct">
      <h4>Editar producto</h4>
      <fieldset>
        <input type="text" v-model="newNombreArticulo" placeholder="Nombre articulo"/>
        <input type="text" v-model="newPrecio" placeholder="Precio" />
        <input type="text" v-model="newDescripcion" placeholder="Descripcion" />
      </fieldset>
      <button @click="editProduct()">Editar</button>
      <button @click="seeEditProduct = false">Volver</button>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Profile",
  components: { },
  data() {
    return {
      id: null,
      userData: {},
      articulos:[],
      showEdit: false,
      seeProduct: false,
      seeEditProduct: false,
      require: false,
      newDescripcion: "",
      newNombre: "",
      newApellidos: "",
      newFechaNacimiento: "",
      newMail: "",
      newTelefono: "",
      newDireccion: "",
      newNombreArticulo: "",
      newPrecio: "",
      newDescripcion: "",
      nombre_articulo:"",
      precio:"",
      tipo:"",
      subtipo:"",
      descripcion:"",
      imagen:"", 
    };
  },
  methods: {
// OBTENCION DATOS DEL USUARIO
    getUserData() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;    
        axios
          .get("http://localhost:3000/user/" + data)
          .then(function(response) {
            self.userData = response.data.data;
            self.userData.imagen = "http://localhost:3000/uploads/" + self.userData.imagen;
          })
          .catch(function(error) {
             Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No tienes acceso, logueate!',
            timer: 2000
        });
        this.$router.push("/");
          });    
    },
// OBTENCION PRODUCTOS DEL USUARIO
     getUserProducts(){
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;    
        axios
          .get("http://localhost:3000/user/products/" + data)
          .then(function(response) {
          self.articulos = response.data.data.map((articulo) => {
            articulo.imagen = "http://localhost:3000/uploads/" + articulo.imagen;
            return articulo
          });
          })
          .catch(function(error) {
            console.error(error.response.data.message)
          });
       }, 
// EDICION PERFIL DEL USUARIO
    editUser() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .put("http://localhost:3000/user/" + data, {
          descripcion: self.newDescripcion,
          nombre: self.newNombre,
          apellidos: self.newApellidos,
          fecha_nacimiento: self.newFechaNacimiento,
          mail: self.newMail,
          telefono: self.newTelefono,
          direccion: self.newDireccion,
        })
        .then(function(response) {
          console.log(response)
          self.showEdit = true;
                    Swal.fire({
            title: "Usuario editado correctamente, gracias!"
          });
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    showEditProfile() {
      this.newDescripcion = this.userData.descripcion;
      this.newNombre = this.userData.nombre;
      this.newApellidos = this.userData.apellidos;
      this.newFechaNacimiento = this.userData.fecha_nacimiento
      this.newMail = this.userData.mail;
      this.newTelefono = this.userData.telefono;
      this.newDireccion = this.userData.direccion;
      this.showEdit = true;
    }, 
// CREAR NUEVO PRODUCTO
    createProduct(){
      this.validatingProduct();
      const self = this;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .post("http://localhost:3000/products", {
          nombre_articulo: self.nombre_articulo,
          descripcion: self.descripcion,
          precio: self.precio,
          tipo: self.tipo,
          subtipo: self.subtipo,
        })
        .then(function(response) {
          Swal.fire({
            title: "Tu articulo se ha subido con exito. Gracias"
          });
          self.emptyProduct();
          self.seeProduct = false;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    validatingProduct() {
      if (
        this.nombre_articulo === "" ||
        this.descripcion === "" ||
        this.tipo === "" ||
        this.subtipo === "" ||
        this.precio === ""
      ) {
        this.correctData = false;
        this.require = true;
      } else {
        this.correctData = true;
        this.require = false;
      }
    },
    emptyProduct() {
      this.nombre_articulo = "";
      this.descripcion = "";
      this.tipo = "";
      this.subtipo = "";
      this.precio = "";
    },
    showNewProduct() {
      this.seeProduct = true;
    },
// EDITAR PRODUCTO
    editProduct() {      
      const self = this;
      const id = self.id;
      const idUser = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .put("http://localhost:3000/products/" + id, {
          nombre_articulo: self.newNombreArticulo,
          precio: self.newPrecio,
          descripcion: self.newDescripcion,
        })
        .then(function(response) {
          self.seeEditProduct = false;
          Swal.fire({
            icon: "success",
            title: "Tu articulo se ha modificado correctamente",
            timer: "3000"
          });
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
    showProduct(articulo) {
      this.id = articulo.id
      this.seeEditProduct = true;
      this.newNombreArticulo = articulo.nombre_articulo;
      this.newPrecio = articulo.precio;
      this.newDescripcion = articulo.descripcion;
    },
//BORRAR PRODUCTO
 deleteProduct(articulo) {
      const self = this;
      const id = articulo.id;
      const idUser = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      Swal.fire({
        title: "Estás seguro?",
        text: "Si lo borras no podrás deshacer cambios",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, borrar",
      }).then((result) => {
        if (result.value) {
          axios
            .delete ("http://localhost:3000/products/" + id)
            .then(function(response) {
              location.reload();
            })
            .catch(function(error) {
              console.error(error.response.data.message);
            });
          Swal.fire({
            title: "Articulo borrado",
            icon: "success",
            confirmButtonText: "OK",
            timer: "2000"
          });
        }
      });
    },
// MOSTRAR ARTICULOS ADQUIRIDOS
  },
  created() {
    this.getUserData();
    this.getUserProducts();
  },



};
</script>

<style scoped>

</style>