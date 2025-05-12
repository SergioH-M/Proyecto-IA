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
  const nombreUsuarioIntroducido = d.getElementById("nombreUsuario").value;

  // Verifica que no esté vacío
  if (nombreUsuarioIntroducido.trim() === "") {
    alert("Por favor, introduce tu nombre para poder continuar.");
    return;
  }
  
   // Verifica que no sea muy largo
  if (nombreUsuarioIntroducido.length > 22) {
    alert("No se puede introducir un nombre tan largo.");
	d.getElementById("nombreUsuarioIntroducido").value = ""; // Vacía el campo
    return;
  }

  // Inserta el nombre en el mensaje
  d.getElementById("nombreMostrado").textContent = nombreUsuarioIntroducido;

  // Autocompleta el campo "Nombre" en el formulario de contacto
  d.getElementById("nombre").value = nombreUsuarioIntroducido;

  // Muestra el mensaje y el formulario
  d.getElementById("mensajeNombre").style.display = "block";
  d.getElementById("contacto").style.display = "block";

  // Oculta el cuadro de ingreso del nombre
  d.getElementById("ingresoNombre").style.display = "none";
}


///Gestión usuarios

const url = "https://script.google.com/macros/s/AKfycbwd6cBNtosSuIzf6M3lVOyEw5XUb6G2064qLLJx3hYSI21_SFcasbrQC5NECi2i7FAI/exec";


// REGISTRO

function mostrarRegistro() {
  console.log("mostrarRegistro() ejecutada");  // Depuración
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registroForm").style.display = "block";
}

function registrarUsuario() {
  if (!validarRegistro()) return;  // Si la validación falla, no se registra el usuario

  var datos = new URLSearchParams({
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    nombre: document.getElementById("nombre").value,
    apellidos: document.getElementById("apellidos").value,
    edad: document.getElementById("edad").value,
	telefono: document.getElementById("telefono").value,
    ambito: document.getElementById("ambito").value,
    consentimiento: document.getElementById("consentimiento_emails").checked ? "Sí" : "No",  // Capturando el checkbox
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
	  console.log("Teléfono enviado:", document.getElementById("telefono").value);
      mostrarLogin();  // Volver al login después del registro exitoso
    }
  });
}

function validarContrasena(contrasena, registro) {
  var mensajeError = [];

  // Verificar que tenga entre 8 y 25 caracteres
  if (contrasena.length < 8 || contrasena.length > 25) {
    mensajeError.push("La contraseña debe tener entre 8 y 25 caracteres.");
  }

  // Verificar que contenga al menos un número
  if (!/\d/.test(contrasena)) {
    mensajeError.push("La contraseña debe incluir al menos un número.");
  }

  // Verificar que contenga al menos un carácter especial ($%&€#?¿¡!)
  if (!/[$%&€#?¿¡!]/.test(contrasena)) {
    mensajeError.push("La contraseña debe contener al menos un carácter especial ($%&€#?¿¡!).");
  }
  
  // Verificar que las dos contraseñas sean iguales SOLO SI VENIMOS DEL REGISTRO
  if (registro) {
	var pw1 = document.getElementById("password").value;
	var pw2 = document.getElementById("password2").value;
	
	  if (pw1 !== pw2) {
		mensajeError.push("Las dos constraseñas introducidas no son iguales.");
	  }
  } else {
	var pw1 = document.getElementById("nuevaContrasena").value;
	var pw2 = document.getElementById("nuevaContrasena2").value;
	
	  if (pw1 !== pw2) {
		mensajeError.push("Las dos constraseñas introducidas no son iguales.");
	  }
  }

  // Si hay errores, devolverlos en una sola cadena
  if (mensajeError.length > 0) {
    return mensajeError.join(" ");
  } else {
    return true; // La contraseña cumple todos los requisitos
  }
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
  var resultadoValidacion = validarContrasena(password, true);		//Con el true indicamos a la función validarContrasena que SÍ venimos del registro
  if (resultadoValidacion !== true) {
    mensajeInfo.textContent = "Error: " + resultadoValidacion; // Muestra los errores de la contraseña
    return false;
  }

  // Validar que los apellidos tengan al menos un espacio
  if (!apellidos.includes(" ")) {
    mensajeInfo.textContent = "Debes ingresar dos apellidos.";
    return false;
  }

  return true;  // Si todas las validaciones pasan, se permite el registro
}



// LOGIN (y referido al área privada)

function mostrarLogin() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registroForm").style.display = "none";
}

function iniciarSesion() {
  document.getElementById("mensajeInfoLogin").textContent = "Iniciando sesión en su cuenta...";
	
  let emailUsuario = document.getElementById("loginEmail").value;
  let passwordUsuario = document.getElementById("loginPassword").value;

  let datosLogin = new URLSearchParams({
    email: emailUsuario,
    password: passwordUsuario,
    accion: "login"
  });

  fetch(url, {
    method: "POST",
    body: datosLogin
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === "success") {
      console.log("Sesión iniciada, obteniendo datos...");

      fetch(url, {
        method: "POST",
        body: new URLSearchParams({
          email: emailUsuario,
          accion: "obtener_datos"
        })
      })
      .then(response => response.json())
      .then(userData => {
        if (userData.status === "success") {
          
		  // Guardamos los datos del usuario en localStorage
          localStorage.setItem("nombreUsuario", userData.nombre);
          localStorage.setItem("apellidosUsuario", userData.apellidos);
          localStorage.setItem("emailUsuario", userData.email);
		  localStorage.setItem("telefonoUsuario", userData.telefono);
		  localStorage.setItem("ambitoUsuario", userData.ambito);
		  localStorage.setItem("consentimientoUsuario", userData.consentimiento);
		  
          console.log("Datos guardados en localStorage");
		  

          actualizarInterfaz();
        }
      });
    } else {
      document.getElementById("mensajeInfoLogin").textContent = "Correo o contraseña incorrectos.";
    }
  });
}

//Función para verificar si hay una sesión iniciada (y modificar la UX en consonancia)
function actualizarInterfaz() {
  let nombreGuardado = localStorage.getItem("nombreUsuario");
  let apellidosGuardados = localStorage.getItem("apellidosUsuario");
  let botonOpciones = document.getElementById("botonOpciones");

  //Si hay un nombre guardado es que hay una sesión activa
  if (nombreGuardado) {
    document.getElementById("mensajeBienvenida").style.display = "block";
    document.getElementById("mensajeBienvenida").innerHTML = `¡Hola, <span style='font-weight: italic;'>${nombreGuardado} ${apellidosGuardados}</span>!`;
	
	//Mostramos el div con los elementos del área privada si existe
	if (document.getElementById("area_privada")) {
	  document.getElementById("area_privada").style.display = "block";
	  cargarNoticias();
	}
	
    if (botonOpciones) {
      botonOpciones.style.display = "block";
    }

    let formulario_area_privada = document.getElementById("formulario_area_privada");
    let registroForm = document.getElementById("registroForm");

	//Si existe el formulario, lo ocultamos
    if (formulario_area_privada) {
      formulario_area_privada.style.display = "none";
    }


  } else {
	//Si no hay sesión activa, mostramos el formulario de login/registro y ocultamos el área privada (solo si hay esos elementos en la página)
    if (document.getElementById("area_privada") && document.getElementById(formulario_area_privada)) {
	  document.getElementById("area_privada").style.display = "none";
      document.getElementById(formulario_area_privada).style.display = "block";  
	}
  }
}

// Ejecutar la función al cargar la página
window.onload = actualizarInterfaz;


//Función para mostrar la hora actual
function actualizarFechaHora() {
  let ahora = new Date();
  let opciones = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"};
  let formatoFechaHora = ahora.toLocaleDateString("es-ES", opciones);
  
  if (document.getElementById("fechaHora")) {
	document.getElementById("fechaHora").textContent = `📅 ${formatoFechaHora}`;
  }
}

// Ejecutar la función cada minuto para mantener la hora actualizada
actualizarFechaHora();	//Esto lo hacemos para que se actualice la primera vez
setInterval(actualizarFechaHora, 60 * 1000);


// OPCIONES USUARIO


function mostrarDatosUsuario() {
  var datosDiv = document.getElementById("datosUsuario");
  datosDiv.style.display = (datosDiv.style.display === "none") ? "block" : "none";

  // Obtener los datos almacenados en localStorage
  var nombreUsuario = localStorage.getItem("nombreUsuario") || "No disponible";
  var apellidosUsuario = localStorage.getItem("apellidosUsuario") || "No disponible";
  var emailUsuario = localStorage.getItem("emailUsuario") || "No disponible";
  var telefonoUsuario = localStorage.getItem("telefonoUsuario");	//La alternativa especificada en el if de abajo
  var edadUsuario = localStorage.getItem("edadUsuario") || "No especificado";
  var ambitoUsuario = localStorage.getItem("ambitoUsuario") || "No especificado";
  var consentimientoUsuario = localStorage.getItem("consentimientoUsuario") || "No";

  // Mostrar los datos en la interfaz
  document.getElementById("usuarioNombre").textContent = nombreUsuario;
  document.getElementById("usuarioApellidos").textContent = apellidosUsuario;
  document.getElementById("usuarioEmail").textContent = emailUsuario;
  if (telefonoUsuario === "-") {
	document.getElementById("usuarioTelefono").textContent = "No proporcionado";
  } else {
	document.getElementById("usuarioTelefono").textContent = telefonoUsuario; 
  }
  document.getElementById("usuarioAmbito").textContent = ambitoUsuario;
  document.getElementById("usuarioConsentimiento").textContent = consentimientoUsuario;
}

// Función para mostrar u ocultar el formulario de cambio de contraseña
function mostrarFormularioContrasena() {
  var formularioDiv = document.getElementById("formularioContrasena");
  formularioDiv.style.display = (formularioDiv.style.display === "none") ? "block" : "none";
}


function guardarNuevaContrasena() {
  var contrasenaActual = document.getElementById("actualContrasena").value;
  var nuevaContrasena = document.getElementById("nuevaContrasena").value;
  var contrasenaGuardada = localStorage.getItem("passwordUsuario"); // Obtener la contraseña guardada
  console.log(contrasenaGuardada);
  var mensajeCambio = document.getElementById("mensajeCambioContrasena"); 

  // ✅ Validar la nueva contraseña antes de continuar
  var resultadoValidacion = validarContrasena(nuevaContrasena, false);		//Con el false indicamos a la función validarContrasena que NO venimos del registro
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
      localStorage.setItem("passwordUsuario", nuevaContrasena); // Actualizar en localStorage
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
	  document.getElementById("nuevaContrasena2").value = "";
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

function cerrarSesion() {
  localStorage.clear();
  window.location.href = "area_privada.html"; // Redirigir al inicio de sesión
}

//API de noticias

function buscarNoticias() {
  const apiKey = "pub_845918ea1efe12520fd91f9b8abf4074084b5";
  let ambitoUsuario = localStorage.getItem("ambitoUsuario") || "General";
  let filtroTecnologia = "inteligencia artificial OR machine learning OR big data OR IoT OR automatización OR tecnología OR innovación";

  let filtroEspecifico = {
    "Educativo": "educación OR aprendizaje OR ciencia OR universidades OR formación",
    "Profesional": "negocios OR emprendimiento OR liderazgo OR economía OR empresas",
    "Personal": "salud OR entretenimiento OR bienestar OR estilo de vida OR deportes"
  };

  let filtroBusqueda = `${filtroTecnologia} OR ${filtroEspecifico[ambitoUsuario] || ""}`;
  const urlNoticias = `https://newsdata.io/api/1/latest?apikey=${apiKey}&category=technology,science,business,health,world&language=es&q=${encodeURIComponent(filtroBusqueda)}`;

  return fetch(urlNoticias)
    .then(response => response.json())
    .then(data => {
      // Si no hay noticias relevantes, mostramos un mensaje alternativo
      if (!data.results || data.results.length === 0) {
        console.error("No se encontraron noticias relevantes:", data);
        return "<p>No se encontraron noticias. Intenta más tarde.</p>";
      }

      let noticiasHTML = "";
      const MAX_CARACTERES = 200; // Definimos el límite de caracteres

      data.results.forEach(noticia => {
        // Limitar la descripción a 200 caracteres o mostrar un mensaje si está vacía
        let descripcion = noticia.description 
          ? noticia.description.substring(0, MAX_CARACTERES) + "..." : "No hay detalles disponibles. Hza clic en 'Leer más' para acceder a la noticia."; 

        noticiasHTML += `
          <div class="noticia">
            <h4>${noticia.title}</h4>
            <p>${descripcion}</p> <!-- Usamos la descripción limitada o el mensaje alternativo -->
            <a href="${noticia.link}" target="_blank">Leer más</a>
          </div>
        `;
      });

      return noticiasHTML; // Devuelve las noticias en HTML con descripciones limitadas
    })
    .catch(error => {
      console.error("Error obteniendo noticias:", error);
      return "<p>Error al cargar noticias. Intenta más tarde.</p>";
    });
}


function cargarNoticias() {
  let noticiasGuardadas = localStorage.getItem("noticiasHTML");

  if (noticiasGuardadas) {
    // Si ya hay noticias guardadas, las mostramos sin llamar a la API
    document.getElementById("contenedorNoticias").innerHTML = noticiasGuardadas;
    document.getElementById("noticiasUsuario").style.display = "block"; // Mostrar el bloque de noticias
    console.log("Noticias cargadas desde localStorage");
  } else {
    // Si no hay noticias guardadas, hacemos la petición a la API
    buscarNoticias().then(noticiasHTML => {
      localStorage.setItem("noticiasHTML", noticiasHTML);
      document.getElementById("contenedorNoticias").innerHTML = noticiasHTML;
      document.getElementById("noticiasUsuario").style.display = "block"; // Asegurar que el bloque se muestra
      console.log("Noticias obtenidas de la API y guardadas en localStorage");
    });
  }
}


function actualizarNoticias() {
  localStorage.removeItem("noticiasHTML"); // Borrar noticias antiguas antes de actualizar

  buscarNoticias().then(noticiasHTML => {
    localStorage.setItem("noticiasHTML", noticiasHTML);
    document.getElementById("contenedorNoticias").innerHTML = noticiasHTML;
    document.getElementById("noticiasUsuario").style.display = "block"; // Mostrar las noticias actualizadas
    console.log("Noticias actualizadas desde la API");
  });
}


function toggleNoticias() {
  const botonNoticias = document.getElementById("toggle_mostrarNoticias");
  const noticiasUsuario = document.getElementById("noticiasUsuario");
  const botonVolverArriba = document.getElementById("botonVolverArribaNoticias");  

  if (noticiasUsuario.style.display === "none" || noticiasUsuario.style.display === "") {
    noticiasUsuario.style.display = "block";
	botonVolverArriba.style.display = "block";
    botonNoticias.textContent = "Ocultar noticias"; // Cambio del texto del botón
  } else {
    noticiasUsuario.style.display = "none";
	botonVolverArriba.style.display = "none";
    botonNoticias.textContent = "Mostrar noticias"; // Cambio del texto del botón
  }
}



function toggleFormulario() {
  const botonFormulario = document.getElementById("toggle_mostrarFormulario");
  const formularioAreaPrivada = document.getElementById("contacto_area_privada");
  let nombreUsuario = localStorage.getItem("nombreUsuario");
  let apellidosUsuario = localStorage.getItem("apellidosUsuario");
  let emailUsuario = localStorage.getItem("emailUsuario");
  

  if (formularioAreaPrivada.style.display === "none" || formularioAreaPrivada.style.display === "") {
    formularioAreaPrivada.style.display = "block";
    botonFormulario.textContent = "Ocultar formulario"; // Cambio del texto del botón
	d.getElementById("nombreForm2").value = nombreUsuario + " " + apellidosUsuario;
	d.getElementById("emailForm2").value = emailUsuario;
	
	
  } else {
    formularioAreaPrivada.style.display = "none";
    botonFormulario.textContent = "Mostrar formulario"; // Cambio del texto del botón
  }
}
