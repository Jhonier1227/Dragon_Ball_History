// Mostrar navbar con GSAP al hacer scroll
let navVisible = false;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100 && !navVisible) {
        gsap.to('.navbar', { top: 0, duration: 0.8, ease: 'power2.out' });
        navVisible = true;
    } else if (window.scrollY <= 100 && navVisible) {
        gsap.to('.navbar', { top: -100, duration: 0.8, ease: 'power2.in' });
        navVisible = false;
    }
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        document.querySelector('.navbar').classList.add('scrolled');
    } else {
        document.querySelector('.navbar').classList.remove('scrolled');
    }
});

// Scroll suave cuando hacen clic en el botón "Descubre más"
document.querySelector('.btn-descubrir').addEventListener('click', function (e) {
    e.preventDefault();
    gsap.to(window, { duration: 0.3, scrollTo: "#intro", ease: "power2.inOut" });
});


// Animación sección introducción al hacer scroll
gsap.from(".intro-text", {
    scrollTrigger: ".intro-text",
    opacity: 0,
    x: -100,
    duration: 1.5,
    ease: "power2.out"
});

gsap.from(".intro-image img", {
    scrollTrigger: ".intro-image img",
    opacity: 0,
    x: 100,
    duration: 1.5,
    ease: "power2.out"
});





// Animación letras al cargar
gsap.from("#titulo-animado", {
    opacity: 0,
    x: -100,
    duration: 2,
    ease: "power4.out"
});

gsap.from("#subtitulo-animado", {
    opacity: 0,
    x: -100,
    duration: 2,
    delay: 0.5,
    ease: "power4.out"
});

// Scroll suave con Lenis (una sola instancia)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


// Cambiar cada 7 segundos
setInterval(cambiarFondo, 7000);




// Detecta el scroll y ejecuta la función
window.addEventListener('scroll', ajustarOpacidadBolas);

// Ejecutar también al cargar la página por si ya está en la sección
ajustarOpacidadBolas();


// Ejecutar la función al hacer scroll
window.addEventListener('scroll', ajustarOpacidadBolas);

// Ejecutar una vez al cargar la página
ajustarOpacidadBolas();



window.addEventListener('scroll', ajustarOpacidadBolas);


// Animación específica de bolas
gsap.to(".bola1", { y: -50, x: 30, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".bola2", { y: -30, x: -50, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".bola3", { y: -60, x: 40, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".bola4", { y: -20, x: 80, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".bola5", { y: -70, x: 60, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".bola6", { y: -90, x: 20, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".bola7", { y: -40, x: -30, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });


// Animación Historia Rápida al entrar en pantalla
gsap.registerPlugin(ScrollTrigger);

gsap.from(".historia-text", {
    scrollTrigger: {
        trigger: "#historia-rapida",
        start: "top 80%",
        toggleActions: "play none none none",
    },
    opacity: 0,
    x: -100,
    duration: 1.2,
    ease: "power2.out"
});

gsap.from(".historia-image img", {
    scrollTrigger: {
        trigger: "#historia-rapida",
        start: "top 80%",
        toggleActions: "play none none none",
    },
    opacity: 0,
    x: 100,
    duration: 1.2,
    ease: "power2.out"
});


// Animación Personajes Destacados
gsap.from(".card-personaje", {
    scrollTrigger: {
        trigger: "#personajes-destacados",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    opacity: 0,
    y: 100,
    duration: 1,
    stagger: 0.3,
    ease: "power2.out"
});





// Animación Curiosidades
gsap.from(".curiosidad", {
    scrollTrigger: {
        trigger: "#curiosidades",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    opacity: 0,
    y: 100,
    duration: 1,
    stagger: 0.3,
    ease: "power2.out"
});


const slides = document.querySelectorAll(".carrusel-fondo .slide");

let currentSlide = 0;

function showSlide(index) {
    // Oculta todas las slides
    slides.forEach((slide, i) => {
        gsap.set(slide, {opacity: 0, scale: 1.05, filter: "blur(5px)"});
    });

    // Muestra la slide actual con efecto moderno
    gsap.to(slides[index], {
        duration: 2,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        ease: "power2.out"
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Inicia el primer slide
showSlide(currentSlide);

// Cambia cada 7 segundos
setInterval(nextSlide, 7000);
