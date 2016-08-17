CREATE TABLE `oqvcv`.`descricoes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(90) CHARACTER SET utf8 NULL,
  `email` VARCHAR(45) CHARACTER SET utf8 NULL,
  `descricao` VARCHAR(350) CHARACTER SET utf8 NOT NULL,
  `moderado` TINYINT(1) NOT NULL DEFAULT 0,
  `aprovado` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`));



