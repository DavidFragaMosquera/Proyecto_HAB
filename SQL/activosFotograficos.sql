CREATE DATABASE activos_fotograficos;
USE activos_fotograficos

CREATE TABLE usuarios (
  id_usuarios INT PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
  login VARCHAR(33) NOT NULL,
  password VARCHAR(33) NOT NULL,
  nombre VARCHAR(33) NOT NULL,
  apellidos VARCHAR(33),
  fecha_nacimiento DATE NOT NULL,
  dni VARCHAR(9) NOT NULL,
  direccion VARCHAR(133) NOT NULL,
  mail VARCHAR(100) NOT NULL,
  telefono VARCHAR(8)  ,
  imagenes VARCHAR  (255),
  descripcion VARCHAR (1000),
  primer_acceso DATETIME NOT NULL,
  ultimo_acceso DATETIME NOT NULL,
  ip_ultimo_acceso INT NOT NULL,
);

CREATE TABLE articulos (
  id_articulos INT PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
  id_usuarios INT UNIQUE NOT NULL,
  imagenes VARCHAR (255),
  tipo enum ('cesion de imagenes', 'alquiler de equipos'),
  subtipo enum ('e-commerce y producto','bodas y eventos', 'retrato y animales', 'camaras reflex', 'drones', 'accesorios'),
  CONSTRAINT FK_usuarios foreign key(id_usuarios) references usuarios (id_usuarios)
);

CREATE TABLE productos (
  id_productos INT PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
  id_articulos_id INT UNIQUE NOT NULL,
  id_usuarios INT UNIQUE NOT NULL,
  precio VARCHAR(100),
  descripcion VARCHAR(1000),
  fecha_inicio DATE,
  fecha _fin DATE,
  Fecha_ultimo_acceso DATETIME,
  CONSTRAINT FK_usuarios foreign key(id_usuarios) references usuarios (id_usuarios),
  CONSTRAINT FK_articulos foreign key(id_articulos) references articulos (id_articulos)  
);

CREATE TABLE pedidos (
  id_pedidos INT PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
  id_productos VARCHAR UNIQUE NOT NULL,
  id_usuarios INT  UNIQUE NOT NULL,
  Dirección VARCHAR (150) NOT NULL,
  fecha_envio DATE,
  fecha_inicio DATETIME,
  fecha_fin DATETIME,
  precio VARCHAR(100),
  CONSTRAINT FK_usuarios foreign key(id_usuarios) references usuarios (id_usuarios),
  CONSTRAINT FK_productos foreign key(id_productos) references productos (id_productos)
);

CREATE TABLE rating (
  id_rating INT PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
  producto_ID INT UNIQUE,
  rate INT CHECK (rate between 1 and 5)
  comentario VARCHAR(1000),
  CONSTRAINT FK_productos foreign key(id_productos) references productos (id_productos)
);



CREATE TABLE consultas (
  id_consultas INT PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
  id_articulos INT UNIQUE NOT NULL,
  id_productos INT UNIQUE NOT NULL,
  ip INT,
  CONSTRAINT FK_articulos foreign key(id_articulos) references articulos (id_articulos),
  CONSTRAINT FK_productos foreign key(id_productos) references productos (id_productos)
);


