const express = require("express");

const bd = require("./bd.js");
const roles = express();

roles.get("/api/roles/listartodos", (req, res) => {
  let consulta = "SELECT * FROM rol";
  bd.query(consulta, (error, roles) => {
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
        roles: roles
      });
    }
  });
});

roles.get("/api/roles/listarporid/:id", (req, res) => {
  // recibimos el parametro
  let id = req.params.id;
  let consulta = "SELECT * FROM rol WHERE rol_id = ? ";
  bd.query(consulta, [id], (error, roles) => {
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
        roles: roles
      });
    }
  });
});

roles.delete("/api/roles/borrarporid/:id", (req, res) => {
  // Recibimos el parametro
  let id = req.params.id; // EXPRESS :: REQUEST PARAMS :: EXTRAE PARAMETROS DE LA PETICION : id

  let consulta = "DELETE FROM rol WHERE rol_id = ? ";
  bd.query(consulta, [id], (error, roles) => {
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
        roles: roles
      });
    }
  });
});

roles.post("/api/roles/agregarRol", (req, res) => {
  // Recibimos los datos enviadoes desde el formulario

  let frmDatos = {
    rol_Tipo: req.body.rol_Tipo,
    rol_Desc: req.body.rol_Desc
  };

  // HACEMOS CONSULTA

  let consulta = "INSERT INTO rol SET ?";
  bd.query(consulta, [frmDatos], (error, roles) => {
    if (error) {
      res.status(404).send({
        status: "error",
        mensaje: "ocurrio un error en la consulta !",
        error: error
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "Consulta exitosa!",
        roles: roles
      });
    }
  });
});

roles.put("/api/roles/editarporid/:id", (req, res) => {
  // Recibimos los datos enviado desde el formulario

  let id = req.params.id;

  let frmDatos = {
    rol_Tipo: req.body.rol_Tipo,
    rol_Desc: req.body.rol_Desc
  };

  // HACEMOS CONSULTA

  let consulta = "UPDATE rol SET ? WHERE rol_id = ?";
  bd.query(consulta, [frmDatos, id], (error, roles) => {
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
        roles: roles
      });
    }
  });
});

module.exports = roles;
