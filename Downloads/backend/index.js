const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 4102;
app.use(require("./src/modulos/citizen.js"));
app.use(require("./src/modulos/categoria.js"));
app.use(require("./src/modulos/grado.js"));
app.use(require("./src/modulos/roles.js"));
app.use(require("./src/modulos/usuarios.js"));
app.use(require("./src/modulos/delito.js"));
app.listen(port, () => {
  console.log(`server runnig in : ${port}`);
});
