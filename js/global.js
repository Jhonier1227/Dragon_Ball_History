// Botón Explorar Línea de Tiempo
const btnExplorar = document.querySelector('.btn-explorar');
btnExplorar?.addEventListener('click', (e) => {
    e.preventDefault();
    gsap.to(window, {
        duration: 1.2,
        scrollTo: "#timeline",
        ease: "power2.out"
    });
});



 // Espera a que el DOM esté listo
window.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("modo-toggle");
  const body = document.body;
  const nav = document.querySelector(".navbar"); // Aplica a cualquier navbar

  // 1️⃣ Carga la preferencia guardada
  const modoGuardado = localStorage.getItem("modo");
  if (modoGuardado === "claro") {
    body.classList.add("light-mode");
    toggleBtn.textContent = "🌙";
  } else {
    toggleBtn.textContent = "☀️";
  }
  actualizarEstiloNavbar();

  // 2️⃣ Al hacer clic, alterna el modo y lo guarda
  toggleBtn.addEventListener("click", () => {
    const esClaro = body.classList.toggle("light-mode");
    toggleBtn.textContent = esClaro ? "🌙" : "☀️";
    localStorage.setItem("modo", esClaro ? "claro" : "oscuro");
    actualizarEstiloNavbar();
  });

  // 3️⃣ Función para actualizar la clase del navbar
  function actualizarEstiloNavbar() {
    if (!nav) return;
    if (body.classList.contains("light-mode")) {
      nav.classList.add("navbar-light");
      nav.classList.remove("navbar-dark");
    } else {
      nav.classList.add("navbar-dark");
      nav.classList.remove("navbar-light");
    }
  }
});
// Botón de modo claro/oscuro


// Cambiar cuando se haga clic en el botón de modo
toggleBtn.addEventListener('click', () => {
  setTimeout(actualizarEstiloNavbar, 100); // Pequeño retardo para esperar el cambio de clase
});

