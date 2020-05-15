require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

const { newUser } = require('./controllers/user/new_user');
const { validateUser } = require('./controllers/user/validation');
const { loginUser } = require('./controllers/user/login')

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

// RUTAS USUARIO
app.post('/user', newUser);
app.get('/user/validate', validateUser);
app.post('/user/logIn', loginUser);


/* 
app.put('/user/:id/password', userIsAuthenticated, updatePasswordUser);
app.get('user/:id', userIsAuthenticated, getUser);
app.put('user/:id', userIsAuthenticated,editUser);
app.delete('user/:id', userIsAuthenticated, deleteUser); */

// RUTAS PRODUCTOS (categoria)
/* 
app.get('/productos', listProducts); 
app.get('/productos/:id', getProducts);
app.post('/productos/:id', userIsAutheticated, newProduct);
app.put('productos/:id', userIsAuthenticated, editProduct);
app.delete('productos/:id', userIsAuthenticated, deleteProduct);
*/

// RUTAS SUBPRODUCTO (subcategoria)

// RUTAS DISPONIBILIDAD

// RUTAS VALORACIONES (rating)

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
    status: 'error',
    message: 'Not found'
  });
});

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port} 🚀`);
});
  
  