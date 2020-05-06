-- CREATE DATABASE IF NOT EXISTS picsfy;
USE picsfy;

SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS usuarios (
    	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(100),
    contrasena VARCHAR(1000),
    nombre VARCHAR(50),
    apellidos VARCHAR(50),
    fecha_nacimiento DATE,
    dni VARCHAR(50),
    direccion VARCHAR(50),
    telefono VARCHAR(15),
    mail VARCHAR(50),
    imagen VARCHAR(50),
    descripcion VARCHAR(1000),
    primer_acceso DATETIME,
    ultimo_acceso DATETIME
);

CREATE TABLE IF NOT EXISTS articulos (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    imagen VARCHAR(50),
    descripcion VARCHAR(1000),
    precio FLOAT,
    tipo ENUM('cesion derechos', 'alquiler'),
    subtipo ENUM('e-commerce y producto', 'bodas y eventos', 'retrato y animales', 'camaras reflex', 'drones', 'accesorios'),
    fecha_inicio DATE,
    fecha_fin DATE,
    id_usuario INT UNSIGNED,
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
);
    
CREATE TABLE IF NOT EXISTS pedidos (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    precio FLOAT,
    direccion VARCHAR(50),
    fecha_envio DATE,
    fecha_inicio DATE,
    fecha_fin DATE,
    id_usuario INT UNSIGNED,
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
);

CREATE TABLE IF NOT EXISTS ratings (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    valoracion INT,
    comentario VARCHAR(1000),
    id_articulo INT UNSIGNED,
    FOREIGN KEY (id_articulo) REFERENCES articulos (id),
    id_usuario INT UNSIGNED,
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
);

CREATE TABLE IF NOT EXISTS consultas (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ip VARCHAR(100),
    id_articulo INT UNSIGNED,
    FOREIGN KEY (id_articulo) REFERENCES articulos (id)
);

CREATE TABLE IF NOT EXISTS articulos_pedidos (
	id_articulo INT UNSIGNED,
    FOREIGN KEY (id_articulo) REFERENCES articulos (id),
    id_pedido INT UNSIGNED,
    FOREIGN KEY (id_pedido) REFERENCES pedidos (id),
    PRIMARY KEY (id_articulo, id_pedido)
);

SET FOREIGN_KEY_CHECKS = 1;






