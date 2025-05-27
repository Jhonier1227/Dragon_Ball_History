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



