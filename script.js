console.log("El archivo script.js se ha cargado correctamente.");

function toggleFondo() {
  document.body.style.backgroundColor = document.body.style.backgroundColor === "gray" ? "#e3eaf5" : "gray";

  const parrafos = document.querySelectorAll('.introduccion p, .seguridad-ia p, .mi_pagina p, .area_pers p'); 
  parrafos.forEach(parrafo => {
    parrafo.style.color = parrafo.style.color === "white" ? "#2c3e50" : "white";
  });
}


function mostrarFormulario() {
  // Obtén el valor ingresado por el usuario
  const nombreUsuario = document.getElementById("nombreUsuario").value;

  // Verifica que no esté vacío
  if (nombreUsuario.trim() === "") {
    alert("Por favor, introduce tu nombre para poder continuar.");
    return;
  }
  
   // Verifica que no sea muy largo
  if (nombreUsuario.length > 22) {
    alert("No se puede introducir un nombre tan largo.");
	document.getElementById("nombreUsuario").value = ""; // Vacía el campo
    return;
  }

  // Inserta el nombre en el mensaje
  document.getElementById("nombreMostrado").textContent = nombreUsuario;

  // Autocompleta el campo "Nombre" en el formulario de contacto
  document.getElementById("nombre").value = nombreUsuario;

  // Muestra el mensaje y el formulario
  document.getElementById("mensajeNombre").style.display = "block";
  document.getElementById("contacto").style.display = "block";

  // Oculta el cuadro de ingreso del nombre
  document.getElementById("ingresoNombre").style.display = "none";
}
