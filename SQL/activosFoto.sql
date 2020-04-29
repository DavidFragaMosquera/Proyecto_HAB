-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema ActivosFotograficos
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ActivosFotograficos
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ActivosFotograficos` DEFAULT CHARACTER SET utf8 ;
USE `ActivosFotograficos` ;

-- -----------------------------------------------------
-- Table `ActivosFotograficos`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ActivosFotograficos`.`usuarios` (
  `id` INT NULL AUTO_INCREMENT,
  `login` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(20) NOT NULL,
  `apellidos` VARCHAR(50) NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `dni` VARCHAR(45) NOT NULL,
  `direccion` VARCHAR(100) NOT NULL,
  `telefono` VARCHAR(15) NULL,
  `mail` VARCHAR(45) NOT NULL,
  `imagen` VARCHAR(45) NULL,
  `descripcion` VARCHAR(1000) NULL,
  `primer_acceso` DATETIME NOT NULL,
  `ultimo_acceso` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ActivosFotograficos`.`articulos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ActivosFotograficos`.`articulos` (
  `id` INT NULL AUTO_INCREMENT,
  `id_usuario` INT NULL,
  `imagen` VARCHAR(50) NULL,
  `descripcion` VARCHAR(1000) NULL,
  `precio` FLOAT NULL,
  `tipo` ENUM('cesion derechos', 'alquiler') NOT NULL,
  `subtipo` ENUM('e-commerce y producto', 'bodas y eventos', 'retrato y animales', 'camaras reflex', 'drones', 'accesorios') NOT NULL,
  `fecha_inicio` DATE NOT NULL,
  `fecha_fin` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_usuario_idx` (`id_usuario` ASC),
  CONSTRAINT `id`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `ActivosFotograficos`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
PACK_KEYS = DEFAULT;


-- -----------------------------------------------------
-- Table `ActivosFotograficos`.`pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ActivosFotograficos`.`pedidos` (
  `id` INT NULL AUTO_INCREMENT,
  `id_articulo` INT NULL,
  `id_usuario` INT NULL,
  `precio` FLOAT NULL,
  `direccion` VARCHAR(45) NULL,
  `fecha_envio` DATE NULL,
  `fecha_inicio` DATE NULL,
  `fecha_fin` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `id_usuario_idx` (`id_usuario` ASC),
  CONSTRAINT `id_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `ActivosFotograficos`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ActivosFotograficos`.`ratings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ActivosFotograficos`.`ratings` (
  `id` INT NULL AUTO_INCREMENT,
  `id_articulo` INT NULL,
  `id_usuario` INT NULL,
  `valoracion` INT NULL,
  `comentario` VARCHAR(1000) NULL,
  PRIMARY KEY (`id`),
  INDEX `id_usuario_idx` (`id_usuario` ASC),
  INDEX `id_pedido_idx` (`id_articulo` ASC),
  CONSTRAINT `id_pedido`
    FOREIGN KEY (`id_articulo`)
    REFERENCES `ActivosFotograficos`.`pedidos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `ActivosFotograficos`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ActivosFotograficos`.`consultas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ActivosFotograficos`.`consultas` (
  `id` INT NULL AUTO_INCREMENT,
  `id_articulo` INT NULL,
  `ip` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_articulo_idx` (`id_articulo` ASC),
  CONSTRAINT `id_articulo`
    FOREIGN KEY (`id_articulo`)
    REFERENCES `ActivosFotograficos`.`articulos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ActivosFotograficos`.`articulos_pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ActivosFotograficos`.`articulos_pedidos` (
  `id_articulo` INT NULL,
  `id_pedido` INT NULL,
  INDEX `id_articulo_idx` (`id_articulo` ASC),
  INDEX `id_pedido_idx` (`id_pedido` ASC),
  CONSTRAINT `id_articulo`
    FOREIGN KEY (`id_articulo`)
    REFERENCES `ActivosFotograficos`.`articulos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_pedido`
    FOREIGN KEY (`id_pedido`)
    REFERENCES `ActivosFotograficos`.`pedidos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
