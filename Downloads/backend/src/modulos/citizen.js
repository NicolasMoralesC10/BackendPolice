// MODULOS PARA ADMINISTRAR LA INFO DE LOS CIUDADANOS
const express = require("express");

const bd = require("./bd.js");
const ciudadano = express();

ciudadano.get("/api/ciudadano/listartodos", (req, res) => {
  let limite = parseInt(req.query.limite);
  // RECIBIR LA PAGINA
  let pagina = parseInt(req.query.pagina);
  //CALCULAR EL OFFSET
  let offset = (pagina - 1) * limite;

  let consulta = "SELECT COUNT(*) AS totalCiudadanos FROM citizen";
  let consulta2 =
    "SELECT id,nombre,apellidos,apodo,email,foto,fechanace,cat_Nombre FROM citizen JOIN categoria ON citizen.tipo_tip_Id = categoria.cat_Id LIMIT ? OFFSET ?";
  bd.query(consulta, (error, Totalvehiculos) => {
    bd.query(consulta2, [limite, offset], (error, ciudadano) => {
      res.send({
        ciudadano: ciudadano
      });
    });
    if (error) {
      res.status(404).send({
        status: "error",
        mensaje: "ocurrio un error en la consulta !",
        error: error
      });
    }
  });
});

ciudadano.get("/api/ciudadano/listarporid/:id", (req, res) => {
  // recibimos el parametro

  let id = req.params.id;

  let consulta = "SELECT * FROM citizen WHERE id = ? ";
  bd.query(consulta, [id], (error, ciudadano) => {
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
        ciudadano: ciudadano
      });
    }
  });
});

ciudadano.delete("/api/ciudadano/borrarporid/:id", (req, res) => {
  // Recibimos el parametro
  let id = req.params.id; // EXPRESS :: REQUEST PARAMS :: EXTRAE PARAMETROS DE LA PETICION : id

  let consulta = "DELETE FROM citizen WHERE id = ? ";
  bd.query(consulta, [id], (error, ciudadano) => {
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
        ciudadano: ciudadano
      });
    }
  });
});

ciudadano.post("/api/ciudadano/agregarCiudadano", (req, res) => {
  // Recibimos los datos enviadoes desde el formulario

  let frmDatos = {
    nombre: req.body.nombre,
    apellidos: req.body.apellido,
    apodo: req.body.apodo,
    email: req.body.email,
    foto: req.body.foto,
    fechanace: req.body.fechanace,
    tipo_tip_Id: req.body.tipo_tip_Id
  };

  // HACEMOS CONSULTA

  let consulta = "INSERT INTO citizen SET ?";
  bd.query(consulta, [frmDatos], (error, ciudadano) => {
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
        ciudadano: ciudadano
      });
    }
  });
});

ciudadano.put("/api/ciudadano/editarporid/:id", (req, res) => {
  // Recibimos los datos enviado desde el formulario

  let id = req.params.id;

  let frmDatos = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    apodo: req.body.apodo,
    email: req.body.email,
    foto: req.body.foto,
    fechanace: req.body.fechanace,
    tipo_tip_Id: req.body.tipo_tip_Id
  };

  // HACEMOS CONSULTA

  let consulta = "UPDATE citizen SET ? WHERE id = ?";
  bd.query(consulta, [frmDatos, id], (error, ciudadano) => {
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
        ciudadano: ciudadano
      });
    }
  });
});

module.exports = ciudadano;
