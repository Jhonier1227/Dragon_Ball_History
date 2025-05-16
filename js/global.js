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
