
* CREAR TABLA RECETAS: 

CREATE TABLE `recetas_db`.`recetas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(300) NOT NULL,
  `ingredientes` VARCHAR(5000) NOT NULL,
  `instrucciones` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`));