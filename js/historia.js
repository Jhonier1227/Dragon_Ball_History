console.log("✅ Historia cargada correctamente.");

// Frases dinámicas
const frases = [
    "¿Sabías que Goku entrenó con 100 veces la gravedad de la Tierra?",
    "La saga de Freezer introdujo el Super Saiyan legendario.",
    "Cell fue creado a partir de las células de los mejores guerreros.",
    "Majin Buu es uno de los villanos más antiguos del universo.",
    "Dragon Ball Super explora multiversos y dioses de la destrucción."
];

let fraseActual = 0;
const fraseElemento = document.getElementById('frase-dinamica-pro');

// Mostrar frase con efecto
const mostrarFrase = () => {
    if (!fraseElemento) return;
    gsap.to(fraseElemento, { opacity: 0, duration: 0.5, onComplete: () => {
        fraseElemento.textContent = frases[fraseActual];
        gsap.to(fraseElemento, { opacity: 1, duration: 0.5 });
        fraseActual = (fraseActual + 1) % frases.length;
    }});
};

// Iniciar frase al cargar
mostrarFrase();
setInterval(mostrarFrase, 6000);

// GSAP Timeline - Animaciones de entrada por tarjeta con ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animación de entrada para cada timeline-item
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.from(item, {
        opacity: 0,
        y: 100,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
});

// Configuración básica de Lenis (scroll suave)
const lenis = new Lenis({
    duration: 1.2,
    smooth: true
});

// Función de actualización continua para Lenis
const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
};
requestAnimationFrame(raf);


gsap.from('.intro-saga img', {
    opacity: 0,
    y: -100,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: '.intro-saga',
        start: "top 80%",
        toggleActions: "play none none none"
    }
});
