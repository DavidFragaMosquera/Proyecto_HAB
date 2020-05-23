require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT;

// usuarios
const { userIsAuthenticated } = require('./middlewares/auth');
const { newUser } = require('./controllers/user/new_user');
const { validateUser } = require('./controllers/user/validation');
const { loginUser } = require('./controllers/user/login');
const { getAllUsers } = require('./controllers/user/get_all_users');
const { getUser } = require('./controllers/user/get_data_user');
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
const { buyProduct } = require('./controllers/products/buy_product');
const { ratingProduct } = require('./controllers/products/rating_product'); 

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());
app.use(express.static(path.join(__dirname, 'static')));

// RUTAS USUARIO
app.post('/user', newUser);
app.get('/user/validate', validateUser);
app.post('/user/logIn', loginUser);
app.get('/users', getAllUsers);
app.get('/user/:id', getUser);
app.put('/user/:id', userIsAuthenticated, editUser);
app.put('/user/password/:id', userIsAuthenticated, editPassword);
app.put('/user/disable/:id', userIsAuthenticated, disableUser);
app.put('/user/reactivate/:id', reactivateUser);
app.put('/user/recovery/:id', recoveryPassword)
app.delete('/user/:id', userIsAuthenticated, deleteUser); 

// RUTAS PRODUCTOS
app.post('/products', userIsAuthenticated, newProduct); 
app.put('/products/:id', userIsAuthenticated, editProduct); 
app.delete('/products/:id', userIsAuthenticated, deleteProduct);
app.get('/products', getAllProducts);
app.get('/products/:id', getProduct);
app.get('/products/category/:tipo', getCategoryProducts); 
app.get('/products/category/:tipo/:subtipo', getSubcategoryProducts); 
app.post('/products/pedido/:id', userIsAuthenticated, buyProduct);
app.post('/products/pedido/rating/:id', userIsAuthenticated, ratingProduct);


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
  
  