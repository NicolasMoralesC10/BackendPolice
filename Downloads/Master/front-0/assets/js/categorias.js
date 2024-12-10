let api = "https://backendpolic.onrender.com/api/categoria/";
let contenido = document.querySelector("#contenidoCategoria");
const frmCrearCategoria = new bootstrap.Modal(document.getElementById("frmCrearCategoria"));
let btnNuevo = document.querySelector("#btnNuevo");
let frmCategoria = document.querySelector("#frmCategoria");
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
      res.categoria.forEach((categoria) => {
        let fila = `<tr> 
              <td>${categoria.cat_Id}</td> 
              <td>${categoria.cat_Nombre}</td> 
              <td>${categoria.cat_Desc}</td> 
            
             <td><button rel="${categoria.cat_Id}" class="btnEditar btn btn-secondary"><i class="bi bi-pencil-square"></i></button></td>
              <td><button rel="${categoria.cat_Id}" class="btnBorrar btn btn-danger"><i class="bi bi-trash"></i></button></td>
      
            </tr>`;
        contenido.innerHTML += fila;
      });
    });
}
listartodos();

btnNuevo.addEventListener("click", () => {
  nombre.value = "";
  descripcion.value = "";
  accion = "crear";
  frmCrearCategoria.show();
});

on(document, "click", ".btnBorrar", (e) => {
  //console.log("click en mi !");

  let idform = e.target.closest("button").getAttribute("rel");
  let confirmacion = window.confirm(
    `Desea eliminar el registro de la categoria con el id: ${idform}`
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

frmCategoria.addEventListener("submit", (e) => {
  if (accion == "crear") {
    // previene el evento por defecto de los formularios que hace submit automatico
    // evitamos enviar espacios vacios y controlamos el envio desde el boton enviar
    e.preventDefault();
    fetch(api + "agregarCategoria", {
      method: "POST",
      // configuramos que la cabecera, header de peticion lleve una configuracion: contiene un archivo json
      headers: {
        "Content-Type": "application/json"
      },
      //carga o payload del request o peticion, serializar un objeto JS  a JSON
      body: JSON.stringify({
        cat_Nombre: nombre.value,
        cat_Desc: descripcion.value
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
    fetch(api + "editarCategoria/" + idform, {
      method: "PUT",
      // configuramos que la cabecera, header de peticion lleve una configuracion: contiene un archivo json
      headers: {
        "Content-Type": "application/json"
      },
      //carga o payload del request o peticion, serializar un objeto JS  a JSON
      body: JSON.stringify({
        nombre: nombre.value,
        descripcion: descripcion.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        accion = "";
        location.reload();
      });
    frmCrearCategoria.hide();
  }
});

//  METODO EDITAR
let idform = "";
on(document, "click", ".btnEditar", (e) => {
 /*  let fila = e.target.parentNode.parentNode.parentNode; */
  idform= e.target.closest('button').getAttribute('rel');
  fetch(api + "listarporid/"+idform)
.then((res) => res.json()) 
.then((res =>{
  let array_data = res.categoria[0]
  nombre.value = array_data.cat_Nombre
  descripcion.value = array_data.cat_Desc
}))
  
  accion = "editar";
  frmCrearCategoria.show();
  console.log(idform);
});
