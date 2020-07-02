require('dotenv').config();

const { format } = require('date-fns');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs-extra');
const uuid = require('uuid');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const imageUploadPath = path.join(__dirname, process.env.UPLOADS_DIR);
const CronJob = require('cron').CronJob;

//FORMATEO DE FECHA
function formatDateToDB(date) {
  return format(date, 'yyyy-MM-dd');
}
//ERROR
function generateError(message, code) {
  const error = new Error(message);
  if (code) error.httpCode = code;
  return error;
}
// ENCRIPTACION
function randomString(size = 20) {
  return crypto.randomBytes(size).toString('hex').slice(0, size);
}
// MAIL VALIDACIÓN DE USUARIO
async function sendEmail({ email, title, content }) {
  sgMail.setApiKey(process.env.SENDGRID_KEY);

  const msg = {
    to: email,
    from: 'davidrosales1990@gmail.com',
    subject: title,
    text: content,
    html: `<div>
      <h1>Validación de correo</h1>
      <p>${content}</p>  
    </div>`
  };

  await sgMail.send(msg);
}
// MAIL RECUPERACIÓN DE CONTRASEÑA
async function sendRecoveryPassword({ email, title, content }) {
  sgMail.setApiKey(process.env.SENDGRID_KEY);

  const msg = {
    to: email,
    from: 'davidrosales1990@gmail.com',
    subject: title,
    text: content,
    html: `<div>
      <h1>Recuperacion de contraseña</h1>
      <p>${content}</p>  
    </div>`
  };

  await sgMail.send(msg);
}
// MAIL CONFIRMACIÓN DE COMPRA
async function purchaseConfirmation({ email, title, content }) {
  sgMail.setApiKey(process.env.SENDGRID_KEY);

  const msg = {
    to: email,
    from: 'davidrosales1990@gmail.com',
    subject: title,
    text: content,
    html: `<div>
      <h1>Confirmacion de compra</h1>
      <p>${content}</p>  
    </div>`
  };

  await sgMail.send(msg);
} 
// PROCESAR Y GUARDAR FOTO
async function processAndSavePhoto(uploadedImage) {
  
  const savedFileName = `${uuid.v1()}.jpg`;

  await fs.ensureDir(imageUploadPath);

  const finalImage = sharp(uploadedImage.data);

  const imageInfo = await finalImage.metadata();

  if (imageInfo.width > 400) {
    finalImage.resize(450);
  }

  await finalImage.toFile(path.join(imageUploadPath, savedFileName));

  return savedFileName;
}
//BORRAR FOTO
async function deletePhoto(imagePath) {
  await fs.unlink(path.join(imageUploadPath, imagePath));
}
// BUSCADOR
function searchProducts(queryParams) {
  let query = `SELECT nombre_articulo, fecha_inicio, fecha_fin, disponibilidad, tipo, subtipo, precio, imagen
    FROM articulos`;

  const params = [];
  const {
    nombre_articulo,
    fecha_inicio,
    fecha_fin,
    disponibilidad,
    tipo,
    subtipo,
    precio,
    imagen
  } = queryParams;

  if (nombre_articulo || fecha_inicio || fecha_fin || disponibilidad || tipo || subtipo || precio || imagen) {
    query = `${query} WHERE`;
    const conditions = [];

    if (nombre_articulo) {
      conditions.push('nombre_articulo LIKE ?');
      params.push(`%${nombre_articulo}%`);
    }

    if (fecha_inicio) {
      conditions.push('fecha_inicio >= ?');
      params.push(fecha_inicio);
    }

    if (fecha_fin) {
      conditions.push('fecha_fin >= ?');
      params.push(fecha_fin);
    }
    if (disponibilidad) {
      conditions.push('disponibilidad = ?');
      params.push(disponibilidad);
    }
    if (tipo) {
      conditions.push('tipo = ?');
      params.push(tipo);
    }

    if (subtipo) {
      conditions.push('subtipo = ?');
      params.push(subtipo);
    }

    if (precio) {
      conditions.push('precio <= ?');
      params.push(precio);
    }
    if (imagen) {
      conditions.push('imagen LIKE ?');
      params.push(`%${imagen}%`);
    }

    query = `${query} ${conditions.join(' AND ')} `;
  }
  query = `${query} 
    ORDER BY fecha_fin`;
  return {
    query,
    params
  };
}

// EXPORTAR TODAS LAS FUNCIONES
module.exports = { formatDateToDB,
                   sendEmail,
                   generateError, 
                   randomString, 
                   sendRecoveryPassword,
                   processAndSavePhoto,
                   purchaseConfirmation, 
                   deletePhoto,
                   searchProducts
                   };
