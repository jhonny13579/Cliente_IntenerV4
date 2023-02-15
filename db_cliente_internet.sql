-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20220519.4c1c1fcc18
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-01-2023 a las 05:44:26
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_cliente_internet`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `codigo` varchar(45) DEFAULT NULL,
  `nombres` varchar(45) DEFAULT NULL,
  `apellidos` varchar(45) DEFAULT NULL,
  `num_doc` varchar(45) DEFAULT NULL,
  `celular` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `direccion_referencia` varchar(100) NOT NULL,
  `id_tipo_doc` int(11) NOT NULL,
  `nom_sector` varchar(100) NOT NULL,
  `id_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `codigo`, `nombres`, `apellidos`, `num_doc`, `celular`, `direccion`, `direccion_referencia`, `id_tipo_doc`, `nom_sector`, `id_estado`) VALUES
(37, NULL, 'Cliente1', 'Apellido1', '75115915', '98744545', 'damdmsandsandsjd', '', 1, 'E-4', 1),
(38, NULL, 'Cliente23', 'Cliente23', '48787878', '888484848', 'cssdsadsad', '', 2, 'E-4', 1),
(39, NULL, 'User1010', 'usero1010', '79484848', '626616', 'aaaaaaaaa', '', 1, '1dsa', 4),
(42, NULL, 'Cliente123', 'Apellido123', '4123213213', '981552508', 'dasdsdasdasdsdas', '', 1, 'E-14', 1),
(43, NULL, 'Cliente5050', 'Apellido5050', '75115915', '754848', 'nsaodnondaskondskadlsnda', '', 1, 'dasdas', 4),
(44, NULL, '', '', '', '', '', '', 1, '', 4),
(45, NULL, 'client123', 'cliente123', '748484848', '751159', 'dsdasdsadsadas', '', 2, 'L-15', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contrato`
--

CREATE TABLE `contrato` (
  `id_contrato` int(11) NOT NULL,
  `fec_inicio` date DEFAULT NULL,
  `fec_fin` date DEFAULT NULL,
  `dia_pago` int(11) DEFAULT NULL,
  `ip` varchar(45) DEFAULT NULL,
  `costo_servicio` double DEFAULT NULL,
  `observaciones` varchar(120) DEFAULT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_servicio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contrato`
--

INSERT INTO `contrato` (`id_contrato`, `fec_inicio`, `fec_fin`, `dia_pago`, `ip`, `costo_servicio`, `observaciones`, `id_cliente`, `id_servicio`) VALUES
(6, '2023-01-28', '2023-06-02', 28, NULL, 150, 'Se le brindara internet', 37, 1),
(7, '2023-01-28', '2023-06-07', 28, NULL, 111, 'sdasdasda', 38, 1),
(8, '2023-01-28', '2023-04-27', 28, NULL, 150, 'esdsadsada', 39, 1),
(11, '2023-01-31', '2023-10-31', 31, '180.147.1.287', 50, 'Se le brindara Servicio de Internet', 42, 1),
(12, '2023-01-29', '2023-07-29', 29, '448484818181', 250, 'SADSASDASDSADSADA', 43, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `id_estado` int(11) NOT NULL,
  `codigo` varchar(45) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`id_estado`, `codigo`, `nombre`) VALUES
(1, NULL, 'PAGO PENDIENTE'),
(2, NULL, 'PAGO PUNTUAL'),
(3, NULL, 'PAGO ATRASADO'),
(4, NULL, 'FUERA DE SERVICIO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `id_pago` int(11) NOT NULL,
  `fec_abono` date DEFAULT NULL,
  `dias_atraso` int(11) DEFAULT NULL,
  `prorroga` varchar(45) DEFAULT NULL,
  `dias_gracia` int(11) DEFAULT NULL,
  `observaciones` varchar(60) DEFAULT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_contrato` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE `perfil` (
  `id_perfil` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `perfil`
--

INSERT INTO `perfil` (`id_perfil`, `nombre`) VALUES
(1, 'Admin'),
(2, 'Empleado'),
(3, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE `servicio` (
  `id_servicio` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `servicio`
--

INSERT INTO `servicio` (`id_servicio`, `nombre`, `descripcion`) VALUES
(1, 'Internet', 'Brinda el servicio de Internet a los clientes'),
(2, 'Teléfono', 'Servicio de telefono a los clientes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_documento`
--

CREATE TABLE `tipo_documento` (
  `id_tipo_doc` int(11) NOT NULL,
  `codigo` varchar(15) DEFAULT NULL,
  `descripcion` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipo_documento`
--

INSERT INTO `tipo_documento` (`id_tipo_doc`, `codigo`, `descripcion`) VALUES
(1, NULL, 'DNI'),
(2, NULL, 'PASAPORTE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombres` varchar(45) DEFAULT NULL,
  `apellidos` varchar(45) DEFAULT NULL,
  `num_doc` varchar(45) DEFAULT NULL,
  `contraseña` varchar(45) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `id_perfil` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombres`, `apellidos`, `num_doc`, `contraseña`, `estado`, `id_perfil`) VALUES
(1, 'Admin', 'Admin', '12345', '123456', 1, 1),
(2, 'Jhonny', 'Manrique', '75115915', '1234', 1, 2),
(4, 'JOHAN123', '123455', '74588879', '123456', 1, 2),
(11, 'Admin1', 'Admin1', '74125896', '$2a$08$a4NFKB2NQIEMpvc.jCcpg.cV07R.n.F54uJ955', 1, 2),
(15, 'Usuario100', 'usu100', '741225863', '$2a$08$koeMVDYBn2Jjwyou8D2K.O8kv7KJLh3QsGTuBp', 1, 3),
(16, '', '', '', '$2a$08$bEt7iU18mcfx4NjIiVqLfup7xZfxZJEufP6WGU', 2, 1),
(17, '', '', '', '$2a$08$wVeHkMmXIb0PtSSawLqgnO82NfZRyQD9eR2tem', 2, 1),
(18, 'user10', 'user10', '744949494', '$2a$08$jwthT70Kiev4xCkDr4Qd1O1L0URSCu0Gayb5s4', 1, 3),
(19, '', '', '', '$2a$08$O1j4TVF.ThelbVevjogaeuTTpHCkOztgfVTuO5', 2, 1),
(20, '', '', '', '$2a$08$9X1jQCTPvccOZbWizNNQPOx/k8kcZrb2Cbvgi5', 2, 1),
(21, '', '', '', '$2a$08$QNtlMknkExOPDTaNUAvXtuE7QhuE22HnsCoxXm', 2, 1),
(22, '', '', '', '$2a$08$IoQFYHVd7UtG8xtlj9Ez7engW3DtUiBrrsKn.i', 2, 1),
(23, 'UsuarioFinal', 'PruebaFinal', '123232131223', '$2a$08$pXkLfU0B41hO6ERdncZVV.gGXV6DmMl4dkgWHw', 1, 2),
(24, 'Usuariofff', 'ffffusuario', '4777788', '$2a$08$39tZxEFNZAQ0vy0BGwMpxu4ujJ91DllaBqE96I', 1, 2),
(25, 'NombreReal', 'ApellidoReal', '7979797979', '1234567890', 1, 3),
(26, '', '', '', '$2a$08$Eh7WsQ8dCYk6Oz3hfaglPuqHxWJg0bmR4dmTCg', 2, 1),
(27, 'User12312', 'apellido', '13231231', '$2a$08$2mK/4DW2oLfzCwTLxoIiYu.l.j1ivYEPDhqBUL', 2, 1),
(28, '', '', '', '$2a$08$CGj0JCI2a98YjCxYnkRfoOb0LKji.PFtGVuuCD', 2, 1),
(29, 'aaaaaaaaa', 'aaaaaaa', 'aaaaaaaaa', '$2a$08$ng9K1yxCRum8btvFX3X3HO0teJeCHQPeCOQ2hn', 2, 1),
(30, '', '', '', '$2a$08$qjmjHCKAJgNV2MTD8wSz7.6HMRuU0DSBjbmvBR', 2, 1),
(31, 'dsdasdas', 'dsadasda', '2313123', '$2a$08$fW/22uNlk2CxlP5KjkzkvuLh9eHrXEkzRoT02h', 2, 1),
(32, 'Realista', 'Realista', '75115915', '$2a$08$A9WkVINWuORznzqlJLXd3e8ekHyCdSl6d1XhrF', 2, 2),
(33, 'NombreBonito', 'ApellidoBonito', '99999999', '123456', 2, 3),
(34, 'asdsadas', 'dasdsad', '1231232', '$2a$08$MSYL1br7LW1dh4xC2jmk..T6xtOKcUrggjoFnZ', 2, 1),
(35, 'Empleado1', 'Apellido2', '75115915', '123456', 1, 1),
(36, 'dsada', 'dsadasd', 'sdadad', '$2a$08$hiYab6i7M/0ZccZuZbE7aOORkryxvZhuwK2.GX', 2, 1),
(37, '', '', '', '$2a$08$VfH4Ga1uSxTbS9g4yYtqFOgGzflRfwyYwnsLVG', 2, 1),
(38, '', '', '', '$2a$08$c1Gi6EIUQomTvQ/T6aff5Ocg1EGUX8uwtFJoCJ', 2, 1),
(39, 'vvvvvvvvv', 'sssdvvvvvv', '111111', '$2a$08$0yqm4sRSks/u1Db0Px/3c.T0thcRIm.jGhb9/o', 2, 1),
(40, 'usuario1000', 'apellido1000', '1000', '$2a$08$sZalRRFG3fV1fUcjdg0NVeT0SUy2WhUfuWC0/y', 2, 1),
(41, 'usuario111', 'apellido111', '64664515', '$2a$08$SppFJMAHPhYr6mAXXavPWesxGg2EBOz0st0Tsr', 2, 1),
(42, 'adsdasd', 'adsadsd', '123211', '$2a$08$EhllcgEvHlj4ZqENSW3JaOlYPjit8Jl1DBseK0', 2, 1),
(43, '', '', '', '$2a$08$1WySyN1Bekpeb49H3gvhtuj80bYUzzCviUrdX5', 2, 1),
(44, 'jhonny', 'jhonny', '75115915', '$2a$08$NSWJQzeamtug4HZSlaULM.3P04GYqAQb6vuSmC', 2, 3),
(45, 'Pedrito', 'Juan', '75115915', '$2a$08$vA8vSpkseIIgwMsbMhX3NOFPSupsaC2DJJckpl', 2, 1),
(46, 'Luis Pedro', 'Garcia Marquez', '75115915', '$2a$08$eZhNqVSxpT0GzqjP6Yvbne8NL.ZY/2CSbJrSS5', 1, 2),
(47, 'Cliente999', 'Apellido999', '7511519', '$2a$08$bbm29uZlDASjpkAn6CCt9epVuxJwG2IrRnvtDO', 1, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`),
  ADD KEY `fk_Cliente_Tipo_Documento1_idx` (`id_tipo_doc`),
  ADD KEY `fk_Cliente_Estado1_idx` (`id_estado`);

--
-- Indices de la tabla `contrato`
--
ALTER TABLE `contrato`
  ADD PRIMARY KEY (`id_contrato`),
  ADD KEY `fk_Contrato_Cliente1_idx` (`id_cliente`),
  ADD KEY `fk_Contrato_Servicio1_idx` (`id_servicio`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`id_pago`),
  ADD KEY `fk_Pago_Cliente1_idx` (`id_cliente`),
  ADD KEY `fk_Pago_Contrato1_idx` (`id_contrato`);

--
-- Indices de la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`id_perfil`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`id_servicio`);

--
-- Indices de la tabla `tipo_documento`
--
ALTER TABLE `tipo_documento`
  ADD PRIMARY KEY (`id_tipo_doc`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `fk_Usuario_perfil_id` (`id_perfil`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `contrato`
--
ALTER TABLE `contrato`
  MODIFY `id_contrato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `id_estado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `id_pago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `perfil`
--
ALTER TABLE `perfil`
  MODIFY `id_perfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `id_servicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipo_documento`
--
ALTER TABLE `tipo_documento`
  MODIFY `id_tipo_doc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `fk_Cliente_Estado1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id_estado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Cliente_Tipo_Documento1` FOREIGN KEY (`id_tipo_doc`) REFERENCES `tipo_documento` (`id_tipo_doc`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `contrato`
--
ALTER TABLE `contrato`
  ADD CONSTRAINT `fk_Contrato_Cliente1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Contrato_Servicio1` FOREIGN KEY (`id_servicio`) REFERENCES `servicio` (`id_servicio`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `fk_Pago_Cliente1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Pago_Contrato1` FOREIGN KEY (`id_contrato`) REFERENCES `contrato` (`id_contrato`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_Usuario_perfil` FOREIGN KEY (`id_perfil`) REFERENCES `perfil` (`id_perfil`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



