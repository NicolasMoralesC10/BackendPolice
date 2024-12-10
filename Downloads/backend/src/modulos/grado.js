const express = require("express");

const bd = require("./bd.js");
const grado = express();

grado.get("/api/grado/listartodos", (req, res) => {
  let consulta = "SELECT * FROM grados";
  bd.query(consulta, (error, grado) => {
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
        grado: grado
      });
    }
  });
});

grado.get("/api/grado/listarporid/:id", (req, res) => {
  // Recibimos el parametro
  let id = req.params.id; // EXPRESS :: REQUEST PARAMS :: EXTRAE PARAMETROS DE LA PETICION : id

  let consulta = "SELECT * FROM grados WHERE gra_Id = ? ";
  bd.query(consulta, [id], (error, grado) => {
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
        grado: grado
      });
    }
  });
});

grado.delete("/api/grado/borrarporid/:id", (req, res) => {
  // Recibimos el parametro
  let id = req.params.id; // EXPRESS :: REQUEST PARAMS :: EXTRAE PARAMETROS DE LA PETICION : id

  let consulta = "DELETE FROM grados WHERE gra_Id = ? ";
  bd.query(consulta, [id], (error, grado) => {
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
        grado: grado
      });
    }
  });
});

grado.post("/api/grado/agregarGrado", (req, res) => {
  // Recibimos los datos enviadoes desde el formulario

  let frmDatos = {
    gra_Nivel: req.body.gra_Nivel
  };

  // HACEMOS CONSULTA

  let consulta = "INSERT INTO grados SET ?";
  bd.query(consulta, [frmDatos], (error, grado) => {
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
        grado: grado
      });
    }
  });
});

grado.put("/api/grado/editarporid/:id", (req, res) => {
  // Recibimos los datos enviado desde el formulario

  let id = req.params.id;

  let frmDatos = {
    gra_Nivel: req.body.gra_Nivel
  };

  // HACEMOS CONSULTA

  let consulta = "UPDATE grados SET ? WHERE gra_Id = ?";
  bd.query(consulta, [frmDatos, id], (error, grado) => {
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
        grado: grado
      });
    }
  });
});

module.exports = grado;
