console.log("El archivo script.js se ha cargado correctamente.");

d = document;


function toggleFondo() {
  d.body.style.backgroundColor = d.body.style.backgroundColor === "gray" ? "#e3eaf5" : "gray";

  const parrafos = d.querySelectorAll('.introduccion p, .seguridad-ia p, .mi_pagina p, .area_pers p'); 
  parrafos.forEach(parrafo => {
    parrafo.style.color = parrafo.style.color === "white" ? "#2c3e50" : "white";
  });
}


function mostrarFormulario() {
  // Obtén el valor ingresado por el usuario
  const nombreUsuario = d.getElementById("nombreUsuario").value;

  // Verifica que no esté vacío
  if (nombreUsuario.trim() === "") {
    alert("Por favor, introduce tu nombre para poder continuar.");
    return;
  }
  
   // Verifica que no sea muy largo
  if (nombreUsuario.length > 22) {
    alert("No se puede introducir un nombre tan largo.");
	d.getElementById("nombreUsuario").value = ""; // Vacía el campo
    return;
  }

  // Inserta el nombre en el mensaje
  d.getElementById("nombreMostrado").textContent = nombreUsuario;

  // Autocompleta el campo "Nombre" en el formulario de contacto
  d.getElementById("nombre").value = nombreUsuario;

  // Muestra el mensaje y el formulario
  d.getElementById("mensajeNombre").style.display = "block";
  d.getElementById("contacto").style.display = "block";

  // Oculta el cuadro de ingreso del nombre
  d.getElementById("ingresoNombre").style.display = "none";
}


///Gestion usuarios

const url = "https://script.google.com/macros/s/AKfycbwd6cBNtosSuIzf6M3lVOyEw5XUb6G2064qLLJx3hYSI21_SFcasbrQC5NECi2i7FAI/exec";

function mostrarRegistro() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registroForm").style.display = "block";
}

function mostrarLogin() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registroForm").style.display = "none";
}

// Función para verificar si hay una sesión creada
window.onload = function() {
  var paginaActual = window.location.pathname;
  var nombreUsuario = localStorage.getItem("nombreUsuario");
  var apellidosUsuario = localStorage.getItem("apellidosUsuario");
  var emailUsuario = localStorage.getItem("emailUsuario");

  if (paginaActual.includes("gestion_usuarios.html")) {
    // Si hay sesión guardada, ocultamos los formularios y mostramos el mensaje
    if (nombreUsuario && apellidosUsuario) {
      document.getElementById("mensajeBienvenida").textContent = "¡Hola, " + nombreUsuario + " " + apellidosUsuario + "!";
      document.getElementById("mensajeBienvenida").style.display = "block";

      document.getElementById("loginForm").style.display = "none";
      document.getElementById("registroForm").style.display = "none";
      document.getElementById("botonOpciones").style.display = "block";
    } else {
      // Si no hay sesión, mostramos los formularios como siempre
      document.getElementById("mensajeBienvenida").style.display = "none";
      document.getElementById("loginForm").style.display = "block";
      document.getElementById("registroForm").style.display = "none"; // Se muestra cuando el usuario lo activa
      document.getElementById("botonOpciones").style.display = "none";
    }
  } else if (paginaActual.includes("opciones_usuario.html")) {
    // En opciones de usuario solo mostramos el nombre
    if (nombreUsuario) {
      document.getElementById("mensajeBienvenida").textContent = "Hola, " + nombreUsuario;
      document.getElementById("mensajeBienvenida").style.display = "block";
    }
  }
};



function iniciarSesion() {
  var emailUsuario = document.getElementById("loginEmail").value; // Definir emailUsuario correctamente
  var contrasenaUsuario = document.getElementById("loginPassword").value; // Definir contrasenaUsuario correctamente
  var datos = new URLSearchParams({
    email: emailUsuario, // Usar emailUsuario aquí
    password: document.getElementById("loginPassword").value,
    accion: "login"
  });

  fetch(url, {
    method: "POST",
    body: datos
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById("mensajeInfoLogin").textContent = "Info: " + data.mensaje;

    if (data.status === "success") {
      var nombreUsuario = data.nombre;
      var apellidosUsuario = data.apellidos;

      console.log("Usuario autenticado: " + nombreUsuario + " " + apellidosUsuario);

      document.getElementById("loginEmail").value = "";
      document.getElementById("loginPassword").value = "";
      document.getElementById("loginForm").style.display = "none";
      
      // Mostrar mensaje de bienvenida con el nombre completo
      document.getElementById("mensajeBienvenida").style.display = "block";
      document.getElementById("mensajeBienvenida").textContent = "¡Hola, " + nombreUsuario + " " + apellidosUsuario + "!";

      // Almacenar los datos en localStorage
      localStorage.setItem("nombreUsuario", nombreUsuario);
      localStorage.setItem("apellidosUsuario", apellidosUsuario);
      localStorage.setItem("emailUsuario", emailUsuario);
	  localStorage.setItem("contrasenaUsuario", contrasenaUsuario);


      // Ocultar el mensaje de info después de 3 segundos
      setTimeout(() => {
        document.getElementById("mensajeInfoLogin").textContent = "";
      }, 3000);
      
      // Mostrar el botón de opciones
      document.getElementById("botonOpciones").style.display = "block";

      // Aplicar verificación de sesión manualmente después del login
      window.onload();
    }
  });
}


function validarRegistro() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var apellidos = document.getElementById("apellidos").value;
  var edad = document.getElementById("edad").value;
  var mensajeInfo = document.getElementById("mensajeInfoLogin");

  // Validar que el email contenga '@' y termine en '.com' o '.es'
  if (!email.includes("@") || (!email.endsWith(".com") && !email.endsWith(".es"))) {
    mensajeInfo.textContent = "Introduce un correo válido.";
    return false;
  }
  
  // Validar que la edad no supere los 100 años
  if (edad > 100 || edad < 0) {
    mensajeInfo.textContent = "Introduce una edad válida.";
    return false;
  }

  // Validar la contraseña con la función `validarContrasena()`
  var resultadoValidacion = validarContrasena(password);
  if (resultadoValidacion !== true) {
    mensajeInfo.textContent = "Error: " + resultadoValidacion; // Muestra los errores de la contraseña
    return false;
  }

  // Validar que los apellidos tengan al menos un espacio
  if (!apellidos.includes(" ")) {
    mensajeInfo.textContent = "Debes ingresar al menos dos apellidos.";
    return false;
  }

  return true;  // ✅ Si todas las validaciones pasan, se permite el registro
}


function registrarUsuario() {
  if (!validarRegistro()) return;  // Si la validación falla, no se registra el usuario

  var datos = new URLSearchParams({
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    nombre: document.getElementById("nombre").value,
    apellidos: document.getElementById("apellidos").value,
    edad: document.getElementById("edad").value,
    accion: "registro"
  });

  fetch(url, {
    method: "POST",
    body: datos
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById("mensajeInfoLogin").textContent = data.mensaje;

    if (data.status === "success") {
      mostrarLogin();  // Volver al login después del registro exitoso
    }
  });
}



function mostrarDatosUsuario() {
  var datosDiv = document.getElementById("datosUsuario");
  datosDiv.style.display = (datosDiv.style.display === "none") ? "block" : "none";

  var nombreUsuario = localStorage.getItem("nombreUsuario");
  var apellidosUsuario = localStorage.getItem("apellidosUsuario");
  var emailUsuario = localStorage.getItem("emailUsuario");

  document.getElementById("usuarioNombre").textContent = nombreUsuario;
  document.getElementById("usuarioApellidos").textContent = apellidosUsuario;
  document.getElementById("usuarioEmail").textContent = emailUsuario;
}


// Función para mostrar u ocultar el formulario de cambio de contraseña
function mostrarFormularioContrasena() {
  var formularioDiv = document.getElementById("formularioContrasena");
  formularioDiv.style.display = (formularioDiv.style.display === "none") ? "block" : "none";
}


function guardarNuevaContrasena() {
  var contrasenaActual = document.getElementById("actualContrasena").value;
  var nuevaContrasena = document.getElementById("nuevaContrasena").value;
  var contrasenaGuardada = localStorage.getItem("contrasenaUsuario"); // Obtener la contraseña guardada
  var mensajeCambio = document.getElementById("mensajeCambioContrasena"); 

  // ✅ Validar la nueva contraseña antes de continuar
  var resultadoValidacion = validarContrasena(nuevaContrasena);
  if (resultadoValidacion !== true) {
    mensajeCambio.textContent = "Error: " + resultadoValidacion; // Muestra los errores de la contraseña
    mensajeCambio.style.color = "red";
    mensajeCambio.style.display = "block";
    return;
  }

  if (!contrasenaActual || !nuevaContrasena) {
    mensajeCambio.textContent = "Por favor, llena todos los campos.";
    mensajeCambio.style.display = "block";
    return;
  }

  if (contrasenaActual !== contrasenaGuardada) {
    mensajeCambio.textContent = "La contraseña actual es incorrecta.";
    mensajeCambio.style.display = "block";
    return;
  }

  // Enviar la nueva contraseña al servidor
  var datos = new URLSearchParams({
    email: localStorage.getItem("emailUsuario"), // Enviar el email del usuario
    password_actual: contrasenaActual,
    password_nueva: nuevaContrasena,
    accion: "actualizar_contrasena"
  });

  fetch(url, { 
    method: "POST", 
    body: datos 
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === "success") {
      localStorage.setItem("contrasenaUsuario", nuevaContrasena); // Actualizar en localStorage
      mensajeCambio.textContent = "Contraseña cambiada correctamente.";
      mensajeCambio.style.color = "green";
      mensajeCambio.style.display = "block"; 

      // Eliminar el mensaje después de 3 segundos
      setTimeout(() => {
        mensajeCambio.textContent = "";
        mensajeCambio.style.display = "none";
      }, 4500);
      
      // Ocultar el formulario tras realizar la acción
      setTimeout(() => {
        document.getElementById("formularioContrasena").style.display = "none";
      }, 4500);

      // Limpiar los campos después de cambiar la contraseña
      document.getElementById("actualContrasena").value = "";
      document.getElementById("nuevaContrasena").value = "";
    } else {
      mensajeCambio.textContent = "Error al cambiar la contraseña: " + data.mensaje;
      mensajeCambio.style.color = "red";
      mensajeCambio.style.display = "block"; 
    }
  })
  .catch(error => {
    mensajeCambio.textContent = "Error en la conexión con el servidor.";
    mensajeCambio.style.color = "red";
    mensajeCambio.style.display = "block";
  });
}

function confirmarEliminacion() {
  var confirmacion = confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.");
  if (confirmacion) {
    eliminarCuenta();
  }
}

function eliminarCuenta() {
  var emailUsuario = localStorage.getItem("emailUsuario"); // Obtener email del usuario
  var datos = new URLSearchParams({
    email: emailUsuario,
    accion: "eliminar_cuenta"
  });

  fetch(url, { 
    method: "POST", 
    body: datos 
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === "success") {
      alert("Tu cuenta ha sido eliminada correctamente.");
      localStorage.clear(); // Borra los datos locales
      window.location.href = "index.html"; // Redirige al usuario a la página principal
    } else {
      alert("Error al eliminar la cuenta: " + data.mensaje);
    }
  })
  .catch(error => {
    alert("Error en la conexión con el servidor.");
  });
}



// Función para cerrar sesión
function cerrarSesion() {
  localStorage.clear(); // Borrar todos los datos de sesión
  window.location.href = "gestion_usuarios.html"; // Redirigir al inicio de sesión
}


function validarContrasena(contrasena) {
  var mensajeError = [];

  // ✅ Verificar que tenga entre 8 y 25 caracteres
  if (contrasena.length < 8 || contrasena.length > 25) {
    mensajeError.push("La contraseña debe tener entre 8 y 25 caracteres.");
  }

  // ✅ Verificar que contenga al menos un número
  if (!/\d/.test(contrasena)) {
    mensajeError.push("La contraseña debe incluir al menos un número.");
  }

  // ✅ Verificar que contenga al menos un carácter especial ($%&€#?¿¡!)
  if (!/[$%&€#?¿¡!]/.test(contrasena)) {
    mensajeError.push("La contraseña debe contener al menos un carácter especial ($%&€#?¿¡!).");
  }

  // ✅ Si hay errores, devolverlos en una sola cadena
  if (mensajeError.length > 0) {
    return mensajeError.join(" ");
  } else {
    return true; // La contraseña cumple todos los requisitos
  }
}
