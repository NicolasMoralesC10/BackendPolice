let api = "https://backendpolic.onrender.com/api/delito/";
let apiGrados = "https://backendpolic.onrender.com/api/grado/listartodos";
let contenido = document.querySelector("#contenido");
const frmCrearDelito = new bootstrap.Modal(document.getElementById("frmCrearDelito"));
let btnNuevo = document.querySelector("#btnNuevo");
let frmDelito = document.querySelector("#frmDelito");
let nombre = document.querySelector("#nombre");
let grado = document.querySelector("#grado");
let gradoOpciones = document.querySelector(".grado");

let accion = "";
btnNuevo.addEventListener("click", () => {
  nombre.value = "";
  accion = "crear";
  frmCrearDelito.show();
});

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

function categoria() {
  fetch(apiGrados)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      res.grado.map((grado) => {
        let opciones = `<option value="${grado.gra_Id}">${grado.gra_Nivel}</option>`;

        gradoOpciones.innerHTML += opciones;
      });
    });
}
categoria();
function listartodos() {
  fetch(api + "listartodos")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      res.delito.forEach((delito) => {
        let fila = `<tr> 
          <td>${delito.del_Id}</td> 
          <td>${delito.del_Nombre}</td> 
          <td>${delito.grado}</td> 
         <td><button rel="${delito.del_Id}" class="btnBorrar btn btn-danger"><i class="bi bi-trash"></i></button></td>
         <td><button rel="${delito.del_Id}" class="btnEditar btn btn-secondary"><i class="bi bi-pencil-square"></i></button></td>
  
        </tr>`;
        contenido.innerHTML += fila;
      });
    });
}
listartodos();

on(document, "click", ".btnBorrar", (e) => {
  //console.log("click en mi !");

  let idform = e.target.closest("button").getAttribute("rel");
  let confirmacion = window.confirm(`Desea eliminar el registro del delito con el id: ${idform}`);

  if (confirmacion) {
    fetch(api + "borrarporid/" + idform, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.reload();
      });
  }
});

frmDelito.addEventListener("submit", (e) => {
  if (accion == "crear") {
    console.log(accion);
    // previene el evento por defecto de los formularios que hace submit automatico
    // evitamos enviar espacios vacios y controlamos el envio desde el boton enviar
    e.preventDefault();
    fetch(api + "agregardelito", {
      method: "POST",
      // configuramos que la cabecera, header de peticion lleve una configuracion: contiene un archivo json
      headers: {
        "Content-Type": "application/json"
      },
      //carga o payload del request o peticion, serializar un objeto JS  a JSON
      body: JSON.stringify({
        del_Nombre: nombre.value,
        grados_gra_Id: grado.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.status, res.respuesta);
        accion = "";
        location.reload();
      });
  } else if (accion == "editar") {
    // previene el evento por defecto de los formularios que hace submit automatico
    // evitamos enviar espacios vacios y controlamos el envio desde el boton enviar
    e.preventDefault();
    fetch(api + "editarporid/" + idform, {
      method: "PUT",
      // configuramos que la cabecera, header de peticion lleve una configuracion: contiene un archivo json
      headers: {
        "Content-Type": "application/json"
      },
      //carga o payload del request o peticion, serializar un objeto JS  a JSON
      body: JSON.stringify({
        del_Nombre: nombre.value,
        grados_gra_Id: grado.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        accion = "";
        location.reload();
      });
    frmCrearDelito.hide();
  }
});

//  METODO EDITAR
let idform = "";
on(document, "click", ".btnEditar", (e) => {
  /*  let fila = e.target.parentNode.parentNode.parentNode;
  let id = fila.firstElementChild.innerText; */
  idform = e.target.closest("button").getAttribute("rel");
  fetch(api + "listarporid/" + idform)
    .then((res) => res.json())
    .then((res) => {
      let array = res.delito[0];
      nombre.value = array.del_Nombre;
      grado.value = array.grados_gra_Id;
    });
  console.log(accion);
  accion = "editar";
  frmCrearDelito.show();
  console.log(idform);
});
