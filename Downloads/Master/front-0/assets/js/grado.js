let api = "https://backendpolic.onrender.com/api/grado/";
let contenido = document.querySelector("#contenido");
const frmCrearGrado = new bootstrap.Modal(document.getElementById("frmCrearGrado"));
let btnNuevo = document.querySelector("#btnNuevo");
let frmGrado = document.querySelector("#frmGrado");
let nivel = document.querySelector("#nivel");

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

let accion = "";
function listartodos() {
  fetch(api + "listartodos")
    .then((res) => res.json())
    .then((res) => {
      res.grado.forEach((grado) => {
        let fila = `<tr> 
            <td>${grado.gra_Id}</td> 
            <td>${grado.gra_Nivel}</td> 
           <td><button rel="${grado.gra_Id}" class="btnBorrar btn btn-danger"><i class="bi bi-trash"></i></button></td>
           <td><button rel="${grado.gra_Id}" class="btnEditar btn btn-secondary"><i class="bi bi-pencil-square"></i></button></td>
    
          </tr>`;
        contenido.innerHTML += fila;
      });
    });
}
listartodos();

btnNuevo.addEventListener("click", () => {
  nivel.value = "";
  accion = "crear";
  frmCrearGrado.show();
});

on(document, "click", ".btnBorrar", (e) => {
  //console.log("click en mi !");
  
  let idform = e.target.closest("button").getAttribute("rel");
  let confirmacion = window.confirm(`Desea eliminar el registro del grado con el id: ${idform}`);

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

frmGrado.addEventListener("submit", (e) => {
  if (accion == "crear") {
    // previene el evento por defecto de los formularios que hace submit automatico
    // evitamos enviar espacios vacios y controlamos el envio desde el boton enviar
    e.preventDefault();
    fetch(api + "agregarGrado", {
      method: "POST",
      // configuramos que la cabecera, header de peticion lleve una configuracion: contiene un archivo json
      headers: {
        "Content-Type": "application/json"
      },
      //carga o payload del request o peticion, serializar un objeto JS  a JSON
      body: JSON.stringify({
        gra_Nivel: nivel.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.status, res.respuesta);
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
        gra_Nivel: nivel.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        accion = "";
        location.reload();
      });
    frmCrearGrado.hide();
  }
});

//  METODO EDITAR
let idform = "";
on(document, "click", ".btnEditar", (e) => {
  /*  let fila = e.target.parentNode.parentNode.parentNode; */
  /*  let id = fila.firstElementChild.innerText; */
  idform = e.target.closest("button").getAttribute("rel");
  fetch(api + "listarporid/" + idform)
    .then((res) => res.json())
    .then((res) => {
      let array = res.grado[0];
      nivel.value = array.gra_Nivel;
    });

  console.log(accion);
  accion = "editar";
  frmCrearGrado.show();
  console.log(idform);
});
