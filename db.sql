CREATE TABLE `oqvcv`.`descricoes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(90) NULL,
  `email` VARCHAR(45) NULL,
  `descricao` VARCHAR(310) NOT NULL,
  `moderado` TINYINT(1) NOT NULL DEFAULT 0,
  `aprovado` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`));



