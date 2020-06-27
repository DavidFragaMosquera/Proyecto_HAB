require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
/* const CronJob = require('cron'); */

const app = express();
const port = process.env.PORT;

// usuarios
const { userIsAuthenticated } = require('./middlewares/auth');
const { newUser } = require('./controllers/user/new_user');
const { validateUser } = require('./controllers/user/validation');
const { loginUser } = require('./controllers/user/login');
const { getAllUsers } = require('./controllers/user/get_all_users');
const { getUser } = require('./controllers/user/get_data_user');
const { getUserProducts} = require('./controllers/user/get_user_products');
const { getAcquiredProducts } = require('./controllers/user/get_acquired_products')
const { editUser } = require('./controllers/user/edit_user');
const { editPassword} = require ('./controllers/user/edit_password');
const { disableUser } = require ('./controllers/user/disable_user');
const { reactivateUser } = require ('./controllers/user/reactivate_user');
const { recoveryPassword } = require('./controllers/user/recovery_password') 
const { deleteUser } = require ('./controllers/user/delete_user');

// productos
const { newProduct } = require('./controllers/products/new_product');
const { editProduct} = require ('./controllers/products/edit_product'); 
const { deleteProduct } = require('./controllers/products/delete_product');
const { getProduct } = require('./controllers/products/get_products');
const { getAllProducts } = require('./controllers/products/get_all_products');
const { getCategoryProducts} = require('./controllers/products/get_category_products'); 
const { getSubcategoryProducts } = require('./controllers/products/get_subcategory_products');
const { getRatingProducts } = require('./controllers/products/get_rating_products');
const { buyProduct } = require('./controllers/products/buy_product');
const { ratingProduct } = require('./controllers/products/rating_product'); 
const { availabilityProduct } = require('./controllers/products/availability_product');
const { search } = require('./controllers/products/searching');
const { searchProduct } = require('./controllers/products/search_product');
const { searchPrice } = require('./controllers/products/search_price');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());
app.use(express.static(path.join(__dirname, 'static')));
/* app.use(CronJob()); */

// RUTAS USUARIO
app.post('/new-user', newUser); // NUevo usuario
app.get('/user/validate', validateUser); //Validar usuario
app.post('/user/logIn', loginUser); //Login usuario
app.get('/users', getAllUsers); // Listar todos los usuarios (publico)
app.get('/user/:id', getUser); // Listar usuario individual (publico)
app.get('/user/products/:id', getUserProducts); // Listar productos de un usuario (publico)
app.get('/user/products/acquired/:id', userIsAuthenticated, getAcquiredProducts) // Listar productos adquiridos por un usuario (privado)
app.put('/user/recovery', recoveryPassword) // Recuperar contraseña
app.put('/user/reactivate', reactivateUser);  // Reactivar usuario 
app.put('/user/disable/:id', userIsAuthenticated, disableUser); // Deshabilitar usuario (Solo registrados)
app.put('/user/:id', userIsAuthenticated, editUser); // Editar usuario (Solo registrados)
app.put('/user/password/:id', userIsAuthenticated, editPassword); // Editar contraseña (Solo registrados)
app.delete('/user/:id', userIsAuthenticated, deleteUser); // Borrar usuario (Solo registrados)

// RUTAS PRODUCTOS
app.post('/products', userIsAuthenticated, newProduct); //Crear producto (Solo registrados)
app.put('/products/:id', userIsAuthenticated, editProduct); // Editar producto (Solo registrados)
app.delete('/products/:id', userIsAuthenticated, deleteProduct); // Borrar producto (Solo registrados)
app.get('/products', getAllProducts); // Listar todos los productos (publico)
app.get('/product/:id', getProduct); // Listar productos individualmente (publico)
app.get('/products/category/:tipo', getCategoryProducts); // Listar productos por categoria (publico)
app.get('/products/category/:tipo/:subtipo', getSubcategoryProducts); // Listar productos por subcategoria (publico)
app.get('/products/rating', getRatingProducts); // Listar producto valorado (publico)
app.post('/products/pedido/:id', userIsAuthenticated, buyProduct); // Comprar producto (Solo registrados)
app.post('/pedidos/rating/:id', userIsAuthenticated, ratingProduct); // Valoracion de producto adquirido (Solo registrados)
app.get('/search/availability', availabilityProduct); // Buscar disponibilidad de producto, ordenado por fecha de la misma (publico)
app.get('/search', searchProduct); // Busqueda general por palabras
app.get('/search/price', searchPrice); // Busqueda por precio
app.get('/searching', search) // Buscador top


// Error middleware
app.use((error, req, res, next) => {
  res.status(error.httpCode || 500).send({
    status: 'error',
    message: error.message
  });
});

// Middleware no encontrado
app.use((req, res) => {
  res.status(404).send({
    status: 'error 404',
    message: ' 😥 No encontrado 😥'
  });
});

app.listen(port, () => {
  console.log(` 👍 Servidor funcionando en http://localhost:${port} 🚀`);
});
  
  