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
-- Table `ActivosFotograficos`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ActivosFotograficos`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
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
-- Table `ActivosFotograficos`.`articulo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ActivosFotograficos`.`articulo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id` INT NOT NULL,
  `imagen` VARCHAR(50) NULL,
  `descripcion` VARCHAR(1000) NULL,
  `precio` VARCHAR(45) NULL,
  `tipo` ENUM('cesion derechos', 'alquiler') NOT NULL,
  `subtipo` ENUM('e-commerce y producto', 'bodas y eventos', 'retrato y animales', 'camaras reflex', 'drones', 'accesorios') NOT NULL,
  `fecha_inicio` DATE NOT NULL,
  `fecha_fin` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_usuario_idx` (`id` ASC),
  CONSTRAINT `id`
    FOREIGN KEY (`id`)
    REFERENCES `ActivosFotograficos`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
PACK_KEYS = DEFAULT;


-- -----------------------------------------------------
-- Table `ActivosFotograficos`.`pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ActivosFotograficos`.`pedido` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id` INT NOT NULL,
  `precio` VARCHAR(45) NULL,
  `direccion` VARCHAR(45) NULL,
  `fecha_envio` DATE NULL,
  `fecha_inicio` DATE NULL,
  `fecha_fin` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `id_articulo_idx` (`id` ASC),
  CONSTRAINT `id_articulo`
    FOREIGN KEY (`id`)
    REFERENCES `ActivosFotograficos`.`articulo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ActivosFotograficos`.`rating`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ActivosFotograficos`.`rating` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id` INT NOT NULL,
  `valoracion` INT NULL,
  `comentario` VARCHAR(1000) NULL,
  PRIMARY KEY (`id`),
  INDEX `id_articulo_idx` (`id` ASC),
  CONSTRAINT `id_articulo`
    FOREIGN KEY (`id`)
    REFERENCES `ActivosFotograficos`.`articulo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ActivosFotograficos`.`consultas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ActivosFotograficos`.`consultas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id` INT NOT NULL,
  `ip` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_articulo_idx` (`id` ASC),
  CONSTRAINT `id_articulo`
    FOREIGN KEY (`id`)
    REFERENCES `ActivosFotograficos`.`articulo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
