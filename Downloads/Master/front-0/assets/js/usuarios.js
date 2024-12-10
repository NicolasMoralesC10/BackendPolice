let api = "https://backendpolic.onrender.com/api/usuarios/";
let apiRoles = "https://backendpolic.onrender.com/api/roles/listartodos";
let contenido = document.querySelector("#contenido");
const frmCrearUsuario = new bootstrap.Modal(document.getElementById("frmCrearUsuario"));
let btnNuevo = document.querySelector("#btnNuevo");
let frmUsuario = document.querySelector("#frmUsuario");
let nombre = document.querySelector("#nombre");
let apellido = document.querySelector("#apellido");
let password = document.querySelector("#password");
let roles = document.querySelector("#roles");
let rolesOpciones = document.querySelector(".roles");

let accion = "";
const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

btnNuevo.addEventListener("click", () => {
  frmCrearUsuario.show();
  accion = "crear";
});

function categoria() {
  fetch(apiRoles)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      res.roles.map((roles) => {
        let opciones = `<option value="${roles.rol_id}">${roles.rol_Tipo}</option>`;

        rolesOpciones.innerHTML += opciones;
      });
    });
}
categoria();
function listartodos() {
  fetch(api + "listartodos")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      res.usuarios.forEach((usuarios) => {
        let fila = `<tr> 
          <td>${usuarios.user_Id}</td> 
          <td>${usuarios.user_Nombre}</td> 
          <td>${usuarios.user_Apellido}</td> 
          <td>${usuarios.tipo}</td>
         <td><button rel="${usuarios.user_Id}" class="btnBorrar btn btn-danger"><i class="bi bi-trash"></i></button></td>
         <td><button rel="${usuarios.user_Id}" class="btnEditar btn btn-secondary"><i class="bi bi-pencil-square"></i></button></td>
  
        </tr>`;
        contenido.innerHTML += fila;
      });
    });
}
listartodos();

on(document, "click", ".btnBorrar", (e) => {
  //console.log("click en mi !");

  let idform = e.target.closest("button").getAttribute("rel");
  let confirmacion = window.confirm(`Desea eliminar el registro del usuarios con el id: ${idform}`);

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

frmUsuario.addEventListener("submit", (e) => {
  if (accion == "crear") {
    // previene el evento por defecto de los formularios que hace submit automatico
    // evitamos enviar espacios vacios y controlamos el envio desde el boton enviar
    e.preventDefault();
    fetch(api + "agregarusuarios", {
      method: "POST",
      // configuramos que la cabecera, header de peticion lleve una configuracion: contiene un archivo json
      headers: {
        "Content-Type": "application/json"
      },
      //carga o payload del request o peticion, serializar un objeto JS  a JSON
      body: JSON.stringify({
        user_Nombre: nombre.value,
        user_Apellido: apellido.value,
        user_Pass: password.value,
        rol_rol_id: roles.value
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
        user_Nombre: nombre.value,
        user_Apellido: apellido.value,
        user_Pass: password.value,
        rol_rol_id: roles.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.status, res.respuesta);
        accion = "";
        location.reload();
      });
    frmCrearUsuario.hide();
  }
});

let idform = "";
on(document, "click", ".btnEditar", (e) => {
  /*  let fila = e.target.parentNode.parentNode.parentNode; */
  idform = e.target.closest("button").getAttribute("rel");
  fetch(api + "listarporid/" + idform)
    .then((res) => res.json())
    .then((res) => {
      let array = res.usuarios[0];
      nombre.value = array.user_Nombre;
      apellido.value = array.user_Apellido;
      roles.value = array.rol_rol_id;
    });

  accion = "editar";
  frmCrearUsuario.show();
  console.log(idform);
});
