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



  document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("modo-toggle");
    const body = document.body;

    // Cargar preferencia guardada
    const modoGuardado = localStorage.getItem("modo");
    if (modoGuardado === "claro") {
      body.classList.add("light-mode");
      toggleBtn.textContent = "🌙";
    }

    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("light-mode");
      const esClaro = body.classList.contains("light-mode");
      toggleBtn.textContent = esClaro ? "🌙" : "☀️";
      localStorage.setItem("modo", esClaro ? "claro" : "oscuro");
    });
  });


const nav = document.querySelector('.custom-navbar');
const toggleBtn = document.getElementById('modo-toggle');

function actualizarEstiloNavbar() {
  if (document.body.classList.contains('light-mode')) {
    nav.classList.remove('navbar-dark');
    nav.classList.add('navbar-light');
  } else {
    nav.classList.remove('navbar-light');
    nav.classList.add('navbar-dark');
  }
}

// Ejecutar al iniciar
actualizarEstiloNavbar();

// Cambiar cuando se haga clic en el botón de modo
toggleBtn.addEventListener('click', () => {
  setTimeout(actualizarEstiloNavbar, 100); // Pequeño retardo para esperar el cambio de clase
});

