// MODULOS PARA ADMINISTRAR LA INFO DE LOS CIUDADANOS
const express = require("express");

const bd = require("./bd.js");
const delito = express();

delito.get("/api/delito/listartodos", (req, res) => {
  let consulta =
    "SELECT del_Id,del_Nombre,grados.gra_Nivel AS grado FROM delito JOIN grados on delito.grados_gra_Id = grados.gra_Id;";
  bd.query(consulta, (error, delito) => {
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
        delito: delito
      });
    }
  });
});

delito.get("/api/delito/listarporid/:id", (req, res) => {
  // recibimos el parametro

  let id = req.params.id;

  let consulta = "SELECT * FROM delito WHERE del_Id = ? ";
  bd.query(consulta, [id], (error, delito) => {
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
        delito: delito
      });
    }
  });
});

delito.delete("/api/delito/borrarporid/:id", (req, res) => {
  // Recibimos el parametro
  let id = req.params.id; // EXPRESS :: REQUEST PARAMS :: EXTRAE PARAMETROS DE LA PETICION : id

  let consulta = "DELETE FROM delito WHERE del_Id = ? ";
  bd.query(consulta, [id], (error, delito) => {
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
        delito: delito
      });
    }
  });
});

delito.post("/api/delito/agregardelito", (req, res) => {
  // Recibimos los datos enviadoes desde el formulario

  let frmDatos = {
    del_Nombre: req.body.del_Nombre,
    grados_gra_Id: req.body.grados_gra_Id
  };

  // HACEMOS CONSULTA

  let consulta = "INSERT INTO delito SET ?";
  bd.query(consulta, [frmDatos], (error, delito) => {
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
        delito: delito
      });
    }
  });
});

delito.put("/api/delito/editarporid/:id", (req, res) => {
  // Recibimos los datos enviado desde el formulario

  let id = req.params.id;

  let frmDatos = {
    del_Nombre: req.body.del_Nombre,
    grados_gra_Id: req.body.grados_gra_Id
  };

  // HACEMOS CONSULTA

  let consulta = "UPDATE delito SET ? WHERE del_Id = ?";
  bd.query(consulta, [frmDatos, id], (error, delito) => {
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
        delito: delito
      });
    }
  });
});

module.exports = delito;
