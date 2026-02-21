/* RESUMEN ARCHIVO: Logica global reutilizable (modo claro/oscuro y acciones comunes de navegacion). */
/* FUNCIONES CLAVE:
 - Click en .btn-explorar: hace scroll GSAP hacia #timeline si el boton existe.
 - actualizarEstiloNavbar(): sincroniza clases navbar-light/navbar-dark segun modo.
 - Click en #modo-toggle: alterna light-mode y guarda preferencia en localStorage.
*/
// Boton Explorar Linea de Tiempo
const btnExplorar = document.querySelector(".btn-explorar");
// Callback de click: evita navegación por defecto y desplaza al timeline con GSAP.
btnExplorar?.addEventListener("click", (e) => {
  e.preventDefault();
  gsap.to(window, {
    duration: 1.2,
    scrollTo: "#timeline",
    ease: "power2.out",
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("modo-toggle");
  const body = document.body;
  const nav = document.querySelector(".navbar");

  if (!toggleBtn) return;

  // Sincroniza el estilo de Bootstrap del navbar con el modo actual (claro/oscuro).
  const actualizarEstiloNavbar = () => {
    if (!nav) return;

    if (body.classList.contains("light-mode")) {
      nav.classList.add("navbar-light");
      nav.classList.remove("navbar-dark");
    } else {
      nav.classList.add("navbar-dark");
      nav.classList.remove("navbar-light");
    }
  };

  const modoGuardado = localStorage.getItem("modo");
  if (modoGuardado === "claro") {
    body.classList.add("light-mode");
    toggleBtn.textContent = "Luna";
  } else {
    toggleBtn.textContent = "Sol";
  }

  actualizarEstiloNavbar();

  // Callback de click: alterna modo, actualiza texto del boton y guarda preferencia.
  toggleBtn.addEventListener("click", () => {
    const esClaro = body.classList.toggle("light-mode");
    toggleBtn.textContent = esClaro ? "Luna" : "Sol";
    localStorage.setItem("modo", esClaro ? "claro" : "oscuro");
    actualizarEstiloNavbar();
  });
});


