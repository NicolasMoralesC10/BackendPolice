// MODULOS PARA ADMINISTRAR LA INFO DE LOS CIUDADANOS
const express = require("express");

const bd = require("./bd.js");
const usuarios = express();
const bcrypt = require("bcryptjs");

usuarios.get("/api/usuarios/listartodos", (req, res) => {
  let consulta =
    "SELECT user_Id, user_Nombre, user_Apellido, rol.rol_Tipo AS tipo FROM usuario JOIN rol on usuario.rol_rol_id = rol.rol_id;";
  bd.query(consulta, (error, usuarios) => {
    if (error) {
      res.status(404).send({
        status: "error",
        mensaje: "ocurrio un error en la consulta !",
        error: error
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "Consulta exitosa !",
        usuarios: usuarios
      });
    }
  });
});

usuarios.get("/api/usuarios/listarporid/:id", (req, res) => {
  // recibimos el parametro
  let id = req.params.id;
  let consulta = "SELECT * FROM usuario WHERE user_Id = ? ";
  bd.query(consulta, [id], (error, usuarios) => {
    if (error) {
      res.status(404).send({
        status: "error",
        mensaje: "ocurrio un error en la consulta !",
        error: error
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "Consulta exitosa !",
        usuarios: usuarios
      });
    }
  });
});

usuarios.delete("/api/usuarios/borrarporid/:id", (req, res) => {
  // Recibimos el parametro
  let id = req.params.id; // EXPRESS :: REQUEST PARAMS :: EXTRAE PARAMETROS DE LA PETICION : id

  let consulta = "DELETE FROM usuario WHERE user_Id = ? ";
  bd.query(consulta, [id], (error, usuarios) => {
    if (error) {
      res.status(404).send({
        status: "error",
        mensaje: "ocurrio un error en la consulta !",
        error: error
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "Consulta exitosa !",
        usuarios: usuarios
      });
    }
  });
});

usuarios.post("/api/usuarios/agregarusuarios", (req, res) => {
  // Recibimos los datos enviadoes desde el formulario

  let frmDatos = {
    user_Nombre: req.body.user_Nombre,
    user_Apellido: req.body.user_Apellido,
    user_Pass: bcrypt.hashSync(req.body.user_Pass, 10),
    rol_rol_id: req.body.rol_rol_id
  };

  // HACEMOS CONSULTA

  let consulta = "INSERT INTO usuario SET ?";
  bd.query(consulta, [frmDatos], (error, usuarios) => {
    if (error) {
      res.status(404).send({
        status: "error",
        mensaje: "ocurrio un error en la consulta !",
        error: error
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "Consulta exitosa !",
        usuarios: usuarios
      });
    }
  });
});

usuarios.put("/api/usuarios/editarporid/:id", (req, res) => {
  // Recibimos los datos enviado desde el formulario

  let id = req.params.id;

  let frmDatos = {
    user_Nombre: req.body.user_Nombre,
    user_Apellido: req.body.user_Apellido,
    user_Pass: req.body.user_Pass,
    rol_rol_id: req.body.rol_rol_id
  };

  // HACEMOS CONSULTA
  let consulta = "UPDATE usuario SET ? WHERE user_Id = ?";
  bd.query(consulta, [frmDatos, id], (error, usuarios) => {
    if (error) {
      res.send({
        status: "error",
        mensaje: "ocurrio un error en la consulta !",
        error: error
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "Actualizacion exitosa !",
        usuarios: usuarios
      });
    }
  });
});

module.exports = usuarios;
