let api = "https://backendpolic.onrender.com/api/roles/";
let contenido = document.querySelector("#contenido");
const frmCrearRol = new bootstrap.Modal(document.getElementById("frmCrearRol"));
let btnNuevo = document.querySelector("#btnNuevo");
let frmRol = document.querySelector("#frmRol");
let nombre = document.querySelector("#nombre");
let descripcion = document.querySelector("#descripcion");
let accion = "";

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

function listartodos() {
  fetch(api + "listartodos")
    .then((res) => res.json())
    .then((res) => {
      res.roles.forEach((roles) => {
        let fila = `<tr> 
            <td>${roles.rol_id}</td> 
            <td>${roles.rol_Tipo}</td> 
            <td>${roles.rol_Desc}</td>
           <td><button rel="${roles.rol_id}" class="btnEditar btn btn-secondary"><i class="bi bi-pencil-square"></i></button></td>
          <td><button rel="${roles.rol_id}" class="btnBorrar btn btn-danger"><i class="bi bi-trash"></i></button></td>
          </tr>`;
        contenido.innerHTML += fila;
      });
    });
}
listartodos();

btnNuevo.addEventListener("click", () => {
  frmCrearRol.show();
  accion = "crear";
});

on(document, "click", ".btnBorrar", (e) => {


  let idform = e.target.closest("button").getAttribute("rel");
  let confirmacion = window.confirm(
    `Desea eliminar el registro del ciudadano con el id: ${idform}`
  );

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

frmRol.addEventListener("submit", (e) => {
  if (accion == "crear") {
    // previene el evento por defecto de los formularios que hace submit automatico
    // evitamos enviar espacios vacios y controlamos el envio desde el boton enviar
    e.preventDefault();
    fetch(api + "agregarRol", {
      method: "POST",
      // configuramos que la cabecera, header de peticion lleve una configuracion: contiene un archivo json
      headers: {
        "Content-Type": "application/json"
      },
      //carga o payload del request o peticion, serializar un objeto JS  a JSON
      body: JSON.stringify({
        rol_Tipo: nombre.value,
        rol_Desc: descripcion.value
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
        rol_Tipo: nombre.value,
        rol_Desc: descripcion.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.status, res.respuesta);
        location.reload();
      });
    frmCrearRol.hide();
  }
});

let idform = "";
on(document, "click", ".btnEditar", (e) => {
  /*  let fila = e.target.parentNode.parentNode.parentNode; */
  idform = e.target.closest("button").getAttribute("rel");
  fetch(api + "listarporid/" + idform)
    .then((res) => res.json())
    .then((res) => {
      let array = res.roles[0];
      nombre.value = array.rol_Tipo;
      descripcion.value = array.rol_Desc;
    });

  accion = "editar";
  frmCrearRol.show();
  console.log(idform);
});
