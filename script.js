console.log("El archivo script.js se ha cargado correctamente.");

function toggleFondo() {
  document.body.style.backgroundColor = document.body.style.backgroundColor === "gray" ? "#e3eaf5" : "gray";

  const introduccionParrafo = document.querySelector('.introduccion p'); // Selecciona el párrafo dentro de introduccion
  introduccionParrafo.style.color = introduccionParrafo.style.color === "white" ? "#2c3e50" : "white";
  
  const finalParrafo = document.querySelector('.seguridad-ia p'); // Selecciona el párrafo dentro de introduccion
  finalParrafo.style.color = finalParrafo.style.color === "white" ? "#2c3e50" : "white";
}

