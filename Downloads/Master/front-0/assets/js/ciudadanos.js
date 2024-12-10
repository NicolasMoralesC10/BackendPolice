let api = "https://backendpolic.onrender.com/api/ciudadano/";
let apiCategoria = "https://backendpolic.onrender.com/api/categoria/listartodos";
let contenido = document.querySelector("#contenido");
const frmCrearCiudadano = new bootstrap.Modal(document.getElementById("frmCrearCiudadano"));
let btnNuevo = document.querySelector("#btnNuevo");
let frmCiudadano = document.querySelector("#frmCiudadano");
let nombre = document.querySelector("#nombre");
let apellido = document.querySelector("#apellido");
let apodo = document.querySelector("#apodo");
let email = document.querySelector("#email");
let foto = document.querySelector("#foto");
let fechaNacimiento = document.querySelector("#fechaNacimiento");
let especie = document.querySelector("#especie");
let especieOpciones = document.querySelector(".especie");

let btnPagina1 = document.querySelector("#btnPagina1");
let btnPagina2 = document.querySelector("#btnPagina2");
let btnPagina3 = document.querySelector("#btnPagina3");
let li1 = document.querySelector("#li1");
let li2 = document.querySelector("#li2");
let li3 = document.querySelector("#li3");
let btnAnterior = document.querySelector("#btnAnterior");
let btnSiguiente = document.querySelector("#btnSiguiente");
let limite = 2;
let pagina = 1;

let accion = "";
const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

btnNuevo.addEventListener("click", () => {
  nombre.value = "";
  apellido.value = "";
  apodo.value = "";
  email.value = "";
  foto.value = "";
  fechaNacimiento.value = "";
  accion = "crear";
  frmCrearCiudadano.show();
});

btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina = pagina - 1;
  } else {
    pagina = 67;
  }
  contenido.innerHTML = "";
  listartodos();
});
btnSiguiente.addEventListener("click", () => {
  if (pagina < 67) {
    pagina = pagina + 1;
  } else {
    pagina = 1;
  }
  contenido.innerHTML = "";
  listartodos();
});
btnPagina1.addEventListener("click", () => {
  pagina = parseInt(btnPagina1.innerText);
  contenido.innerHTML = "";
  listartodos();
});
btnPagina2.addEventListener("click", () => {
  pagina = parseInt(btnPagina2.innerText);
  contenido.innerHTML = "";
  listartodos();
});
btnPagina3.addEventListener("click", () => {
  pagina = parseInt(btnPagina3.innerText);
  contenido.innerHTML = "";
  listartodos();
});

function categoria() {
  fetch(apiCategoria)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      res.categoria.map((categoria) => {
        let opciones = `<option value="${categoria.cat_Id}">${categoria.cat_Nombre}</option>`;

        especieOpciones.innerHTML += opciones;
      });
    });
}
categoria();
function listartodos() {
  fetch(api + "listartodos" + "?limite=" + limite + "&pagina=" + pagina)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      res.ciudadano.forEach((ciudadano) => {
        let fila = `<tr> 
          <td>${ciudadano.id}</td> 
          <td>${ciudadano.nombre}</td> 
          <td>${ciudadano.apellidos}</td> 
          <td>${ciudadano.apodo}</td>
          <td>${ciudadano.email}</td>
          <td>${ciudadano.foto}</td>
          <td>${ciudadano.fechanace.slice(0, 10)}</td>
          <td>${ciudadano.cat_Nombre}</td>
       
         <td><button rel="${
           ciudadano.id
         }" class="btnEditar btn btn-secondary"><i class="bi bi-pencil-square"></i></button></td>
         <td><button rel="${
           ciudadano.id
         }" class="btnBorrar btn btn-danger"><i class="bi bi-trash"></i></button></td>
        </tr>`;
        contenido.innerHTML += fila;
      });
    });

  if (pagina == 1) {
    btnPagina1.innerText = 1;
    btnPagina2.innerText = 2;
    btnPagina3.innerText = 3;
  } else if (pagina == 67) {
    btnPagina1.innerText = 65;
    btnPagina2.innerText = 66;
    btnPagina3.innerText = 67;
  } else {
    btnPagina1.innerText = pagina - 1;
    btnPagina2.innerText = pagina;
    btnPagina3.innerText = pagina + 1;
  }
  li1.setAttribute("class", "page-item");
  li2.setAttribute("class", "page-item");
  li3.setAttribute("class", "page-item");
  if (btnPagina1.innerText == pagina) {
    li1.setAttribute("class", "page-item active");
  } else if (btnPagina2.innerText == pagina) {
    li2.setAttribute("class", "page-item active");
  } else if (btnPagina3.innerText == pagina) {
    li3.setAttribute("class", "page-item active");
  }
}
listartodos();

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

frmCiudadano.addEventListener("submit", (e) => {
  if (accion == "crear") {
    // previene el evento por defecto de los formularios que hace submit automatico
    // evitamos enviar espacios vacios y controlamos el envio desde el boton enviar
    e.preventDefault();
    fetch(api + "agregarCiudadano", {
      method: "POST",
      // configuramos que la cabecera, header de peticion lleve una configuracion: contiene un archivo json
      headers: {
        "Content-Type": "application/json"
      },
      //carga o payload del request o peticion, serializar un objeto JS  a JSON
      body: JSON.stringify({
        nombre: nombre.value,
        apellido: apellido.value,
        apodo: apodo.value,
        email: email.value,
        foto: foto.value,
        fechanace: fechaNacimiento.value,
        tipo_tip_Id: especie.value
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
        nombre: nombre.value,
        apellidos: apellido.value,
        apodo: apodo.value,
        email: email.value,
        foto: foto.value,
        fechanace: fechaNacimiento.value,
        tipo_tip_Id: especie.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.status, res.respuesta);
        accion = "";
        location.reload();
      });
    frmCrearCiudadano.hide();
  }
});

//  METODO EDITAR
let idform = "";
on(document, "click", ".btnEditar", (e) => {
  /*  let fila = e.target.parentNode.parentNode.parentNode; */
  idform = e.target.closest("button").getAttribute("rel");
  fetch(api + "listarporid/" + idform)
    .then((res) => res.json())
    .then((res) => {
      let array = res.ciudadano[0];
      nombre.value = array.nombre;
      apellido.value = array.apellidos;
      apodo.value = array.apodo;
      email.value = array.email;
      foto.value = array.foto;
      fechaNacimiento.value = array.fechanace.slice(0, 10);
      especie.value = array.tipo_tip_Id;
    });
  console.log(accion);
  accion = "editar";
  frmCrearCiudadano.show();
  console.log(idform);
});
