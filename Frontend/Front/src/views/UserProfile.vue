<template>
  <div>
<!-- CABECERA -->
    <vue-headful title="PerfilUsuario"/>
      <div>
      <div class="welcome">
       <h2>Bienvenido, {{ userData.login }}</h2>
       <h3>Este es tu area personal donde puedes editar tus datos, subir nuevos productos y ver los que ya has adquirido</h3>
        <img :src="userData.imagen" alt="foto perfil usuario" />
      </div>
<!-- LISTADO DATOS DE USUARIO -->
      <div v-show="!showEdit">
        <ul class="datosperfil">
          <li> Descripcion: {{ userData.descripcion }}</li>
          <li> Nombre: {{ userData.nombre }}</li>
          <li> Apellidos: {{ userData.apellidos }}</li>
          <li> Fecha de nacimiento: {{ userData.fecha_nacimiento | moment(" DD-MM-YYYY" ) }}</li>
          <li> Email: {{ userData.mail }}</li>
          <li> Telefono: {{ userData.telefono }}</li>
          <li> Direccion: {{ userData.direccion }}</li>
        </ul>
<!-- BOTONES -->
        <button @click="showEditProfile()">Editar perfil</button>
        <button @click="showNewProduct()">Nuevo articulo</button>
        <button @click="showMyProducts()">Mis productos</button>
        <button @click="showBuyProducts()">Productos adquiridos</button>
        <button @click="showEditPassword()">Cambiar contraseña</button>
        <button @click="deleteUser()">Eliminar cuenta</button>
<!-- CAMBIAR CONTRASEÑA -->
    <div class="password" v-show="seeEditPassword">
        <h3 class="editPassword">CAMBIAR CONTRASEÑA</h3>
        <p>Antigua contraseña</p>
        <input
          type="password"
          v-model="oldPassword"
          placeholder="Contraseña anterior"/>
        <br>
        <p>Nueva contraseña</p>
        <input type="password"
               v-model="password" 
              placeholder="Nueva contraseña" />
        <br>
        <p>Repite la nueva contraseña</p>
        <input
          type="password"
          v-model="passwordRepeat"
          placeholder="Repeat your new Paswword"/>
        <br>
        <button @click="editPassword()">Editar</button>
        <button @click="seeEditPassword = false">Volver</button>
    </div>
<!-- LISTADO ARTICULOS ADQUIRIDOS -->
        <div class="boughtProducts" v-show="!articulosComprados">
          <h3>Articulos adquiridos</h3>
          <ul v-for="articuloAdquirido in articulosAdquiridos" :key="articuloAdquirido.id">
            <li><img :src="articuloAdquirido.imagen" alt="imagen articulo"></li>
            <li>{{ articuloAdquirido.nombre_articulo }}</li>
            <li>Precio: {{ articuloAdquirido.precio }}</li>
            <li> Dirección de envio: {{ articuloAdquirido.direccion }}</li>
            <li>Fecha Inicio: {{ articuloAdquirido.fecha_inicio | moment(" DD-MM-YYYY" )}}</li>
            <li>Fecha Finalización: {{ articuloAdquirido.fecha_fin | moment(" DD-MM-YYYY" ) }}</li>
            <li>Pedido nº: {{ articuloAdquirido.id }}</li>
            <button @click="openModal(articuloAdquirido)">Valorar</button>
              <div v-show="modal" class="modal">
                <div class="modalBox">
                    <h3>Puedes valorar tu producto para ayudar a otros usuarios. Gracias por tu tiempo</h3>
                    <star-rating
                      @rating-selected="rating = $event"
                      :rating="rating"
                      v-bind:star-size="33">
                    </star-rating>
                    <textarea
                      v-model="comentario"
                      name="commentario"
                      id="commentario"
                      cols="66"
                      rows="6">                     
                    </textarea>
                    <button @click="ratingProduct(articuloAdquirido, rating, comentario)">Valorar producto</button>
                    <button @click="closeModal()">Volver</button>
                </div>
              </div>
          </ul>
        </div>
<!-- NUEVO ARTICULO -->
    <div class="nuevoArticulo" v-show="seeProduct">
      <h2>Sube un nuevo articulo</h2>
      <form>
        <fieldset>
          <ul>
            <li>
              <input type="file" id="imagenArticulo" ref="imagenArticulo" @change="handleFileUploadArticulo()" />
            </li>
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
                <option value="ecommerce_producto">E-commerce y producto</option>
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
            <br>
            <li>
            <label for="descripcion">Descripción</label>
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
<!-- EDITAR ARTICULO -->
  <div class="editProduct" v-show="seeEditProduct">
      <h4>Editar producto</h4>
      
        <input type="text" v-model="newNombreArticulo" placeholder="Nombre articulo"/>
        <br>
        <input type="text" v-model="newPrecio" placeholder="Precio" />
        <br>
        <input type="text" v-model="newDescripcion" placeholder="Descripcion" />
        <br>
        <input type="file" id="imagenProducto" ref="imagenProducto" @change="handleFileUploadProducto()" />
        <br>
        <button @click="editProduct()">Modificar</button>
        <br>
        <div class="editUserProduct">
        <button @click="seeEditProduct=false">Volver</button>
        </div>
    </div>
<!-- LISTADO ARTICULOS DE USUARIO -->
    <div class="articulosUsuario" v-show="!showProducts">
      <h3>Mis productos</h3>
        <ul v-for="articulo in articulos" :key="articulo.id">
          <li><img :src="articulo.imagen" alt="imagen articulo"></li>
          <li>Nombre: {{ articulo.nombre_articulo }}</li>
          <li>Descripcion: {{ articulo.descripcion }}</li>
          <li>Precio: {{ articulo.precio }}</li>
          <button @click="showProduct(articulo)">Editar</button>
          <button @click="deleteProduct(articulo)">Borrar</button>
        </ul>
   </div>

      </div>
    </div>
<!-- EDICION DATOS USUARIO -->
    <div class="edit" v-show="showEdit">
      <h3>Editar usuario</h3>
      <input type="text" v-model="newDescripcion" placeholder="Biografia"/>
      <br>
      <input type="text" v-model="newNombre" placeholder="Nombre"/>
      <br>
      <input type="text" v-model="newApellidos" placeholder="Apellidos"/>
      <br>
      <input type="date" v-model="newFechaNacimiento"/>
      <br>
      <input type="text" v-model="newMail" placeholder="Email"/>
      <br>
      <input type="text" v-model="newTelefono" placeholder="Telefono"/>
      <br>
      <input type="text" v-model="newDireccion" placeholder="Dirección"/>
      <br>
      <input type="file" id="imagen" ref="imagen" @change="handleFileUpload()" />
      <br>
      <button @click="editUser()">Modificar</button>
      <br>
      <br>
      <div class="editUserImage">
      <button @click="showEdit=false">Volver</button>
      </div>    
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import VModal from "vue-js-modal"
import StarRating from "vue-star-rating";

export default {
  name: "Profile",
  components: { StarRating },
  data() {
    return {
      id: null,
      userData: {},
      articulos:[],
      articulosAdquiridos:[],
      showEdit: false,
      showProducts: false,
      articulosComprados: false,
      seeProduct: false,
      seeEditProduct: false,
      seeEditPassword: false,
      require: false,
      modal: false,
      newDescripcion: "",
      newNombre: "",
      newApellidos: "",
      fecha_namiento:"",
      newFechaNacimiento: "null",
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
      imagenProducto:"",
      imagenArticulo:"",
      rating: 0,
      comentario:"",
      oldPassword: "",
      password: "",
      passwordRepeat: "",
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
          self.showProducts = true;
          self.articulos = response.data.data.map((articulo) => {
            articulo.imagen = "http://localhost:3000/uploads/" + articulo.imagen;
            return articulo
          });
          })
          .catch(function(error) {
            console.error(error.response.data.message)
          });
       },
      showMyProducts(){
        this.showProducts = !this.showProducts;
      },
// EDICION PERFIL DEL USUARIO
    handleFileUpload() {
      this.imagen = this.$refs.imagen.files[0];
    },
    editUser() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      let formData = new FormData();
      formData.append("imagen", self.imagen);
      formData.append("descripcion", self.newDescripcion);
      formData.append("nombre", self.newNombre);
      formData.append("apellidos", self.newApellidos);
       /*       formData.append("fecha_nacimiento", self.userData.fecha_nacimiento);  */
      formData.append("mail", self.newMail);
      formData.append("telefono", self.newTelefono);
      formData.append("direccion", self.newDireccion);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .put("http://localhost:3000/user/" + data, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function(response) {
          self.showEdit = true;
          Swal.fire({
            icon: "success",
            title: "Usuario editado correctamente, gracias!",
            timer: "3000"
          });
        location.reload();
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
    showEditProfile() {
      this.newDescripcion = this.userData.descripcion;
      this.newNombre = this.userData.nombre;
      this.newApellidos = this.userData.apellidos;
      /*       this.newFechaNacimiento = this.userData.fecha_nacimiento */
      this.newMail = this.userData.mail;
      this.newTelefono = this.userData.telefono;
      this.newDireccion = this.userData.direccion;
      this.showEdit = true;
    }, 
// CAMBIAR CONTRASEÑA
    editPassword() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .put("http://localhost:3000/user/password/" + data, {
          oldPassword: self.oldPassword,
          newPassword: self.password,
          newPasswordRepeat: self.passwordRepeat,
        })
        .then(function(response) {
          console.log(response)
          Swal.fire({
            icon: "success",
            title: "Contraseña cambiada con exito!",
            timer: "3000"
          });
          self.emptyPassword();
          self.seeEditPassword = true;
        })
        .catch(function(error) {
          console.error(error.response.data.message);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Puede que tu contraseña antigua no sea la correcta o que no coincidan las contraseñas',
            timer: 3333
          });
        });
    },
    showEditPassword() {
      this.seeEditPassword = true;
      this.password = "";
      this.passwordRepeat = "";
    },
    emptyPassword() {
      this.oldPassword = "";
      this.newPassword = "";
      this.newPasswordRepeat = "";
    },
// CREAR NUEVO PRODUCTO
    handleFileUploadArticulo() {
      this.imagenArticulo = this.$refs.imagenArticulo.files[0]
    },
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
          imagen: self.imagenArticulo
        })
        .then(function(response) {
          Swal.fire({
            icon: "success",
            title: "Articulo creado con exito, gracias!",
            timer: "3000"
          });
          self.emptyProduct();
          self.seeProduct = false;
        })
        .catch(function(error) {
          console.error(error.response.data.message);
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
    handleFileUploadProducto() {
      this.imagenProducto = this.$refs.imagenProducto.files[0];
    },

    editProduct() {      
      const self = this;
      const id = self.id;
      const idUser = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      let formData = new FormData();
      formData.append("imagen", self.imagenProducto);
      formData.append("nombre_articulo", self.newNombreArticulo);
      formData.append("precio", self.newPrecio);
      formData.append("descripcion", self.newDescripcion);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .put("http://localhost:3000/products/" + id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function(response) {
          self.seeEditProduct = false;
          Swal.fire({
            icon: "success",
            title: "Tu articulo se ha modificado correctamente",
            timer: "3000"
          });
          location.reload();
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
    showProduct(articulo) {
      this.id = articulo.id
      this.newNombreArticulo = articulo.nombre_articulo;
      this.newPrecio = articulo.precio;
      this.newDescripcion = articulo.descripcion;
      this.seeEditProduct = true;
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
    getBuyProducts(){
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;    
        axios
          .get("http://localhost:3000/user/products/acquired/" + data)
          .then(function(response) {
          self.articulosComprados = true;
          self.articulosAdquiridos = response.data.data.map((articuloAdquirido) => {
            articuloAdquirido.imagen = "http://localhost:3000/uploads/" + articuloAdquirido.imagen;
            return articuloAdquirido
          });
          })
          .catch(function(error) {
            console.error(error.response.data.message)
          });
       },
      showBuyProducts(){
        this.articulosComprados = !this.articulosComprados;
    },
// VALORAR PRODUCTO ADQUIRIDO
    ratingProduct(articuloAdquirido, rating, comentario) {
      self = this;
      const id = articuloAdquirido.id;
      const token = localStorage.getItem("token");
      const data = localStorage.getItem("id");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
      .post("http://localhost:3000/pedidos/rating/" + id, {
        valoracion: rating,
        comentario: comentario
      })
      .then(function(response) {
        console.log(response);
        Swal.fire({
            icon: "success",
            title: "Articulo valorado correctamente",
            timer: "4000"
        });
          location.reload();
      })
      .catch(function(error){
        console.error(error.response.data.message);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ya has valorado el producto y solo puedes hacerlo una vez',
            timer: 3000
        });
      })
    },
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },
// ELIMINAR CUENTA
  deleteUser() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      Swal.fire({
        icon: "warning",
        title: "¿Eliminar cuenta?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: "Si, borrar cuenta",
      }).then((result) => {
        if (result.value) {
          axios
            .put("http://localhost:3000/user/disable/" + data)
            .then(function(response) {
              localStorage.removeItem("token");
              localStorage.removeItem("login");
              localStorage.removeItem("id");
              axios.defaults.headers.common["Authorization"] = "";
              self.$router.push("/");
            })
            .catch(function(error) {
              console.error(error.response.data.message);
            });
          Swal.fire({
            title: "Cuenta eliminada",
            text: "No te preocupes, podrás reactivarla siempre que quieras",
            timer: "3333"
          })
        }
      });
    },

  },
  created() {
    this.getUserData();
    this.getUserProducts();
    this.getBuyProducts();
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  border-radius: 150px;  
  width: 100%;
}
.modalbox {
  background: black;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 50px;
  border: solid 2px black;
 /*  box-shadow: 0 0 1px rgb(12, 12, 12); */
}
</style>