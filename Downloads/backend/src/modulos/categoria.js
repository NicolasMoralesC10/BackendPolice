// MODULOS PARA ADMINISTRAR LA INFO DE LOS CIUDADANOS
const express = require("express");

const bd = require("./bd.js");
const categoria = express();

categoria.get("/api/categoria/listartodos", (req, res) => {
  let consulta = "SELECT * FROM categoria";
  bd.query(consulta, (error, categoria) => {
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
        categoria: categoria
      });
    }
  });
});

categoria.get("/api/categoria/listarporid/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "SELECT * FROM categoria where cat_Id";

  bd.query(consulta, (error, categoria) => {
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
        categoria: categoria
      });
    }
  });
});

categoria.delete("/api/categoria/borrarporid/:id", (req, res) => {
  // Recibimos el parametro
  let id = req.params.id; // EXPRESS :: REQUEST PARAMS :: EXTRAE PARAMETROS DE LA PETICION : id

  let consulta = "DELETE FROM categoria WHERE cat_Id = ? ";
  bd.query(consulta, [id], (error, categoria) => {
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
        categoria: categoria
      });
    }
  });
});

categoria.post("/api/categoria/agregarCategoria", (req, res) => {
  // Recibimos los datos enviadoes desde el formulario

  let frmDatos = {
    cat_Nombre: req.body.cat_Nombre,
    cat_Desc: req.body.cat_Desc
  };

  // HACEMOS CONSULTA

  let consulta = "INSERT INTO categoria SET ?";
  bd.query(consulta, [frmDatos], (error, categoria) => {
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
        categoria: categoria
      });
    }
  });
});


categoria.put("/api/categoria/editarCategoria/:id", (req, res) => {
    // Recibimos los datos enviadoes desde el formulario

    let id = req.params.id;
  
    let frmDatos = {
      cat_Nombre: req.body.nombre,
      cat_Desc: req.body.descripcion
    };
  
    // HACEMOS CONSULTA
  
    let consulta = "UPDATE categoria SET ? WHERE cat_Id = ?";
    bd.query(consulta, [frmDatos, id], (error, categoria) => {
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
          categoria: categoria
        });
      }
    });
  });

module.exports = categoria;
