// GSAP entrada bolas flotando
gsap.utils.toArray('.bola').forEach(bola => {
    gsap.to(bola, {
        y: () => Math.random() * 100 - 50,
        x: () => Math.random() * 100 - 50,
        duration: 4 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});

// Mostrar menú al hacer scroll
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

// Animación entrada texto hero
gsap.from(".content h1", {
    opacity: 0,
    scale: 0.5,
    duration: 1.5,
    ease: "power2.out",
    delay: 0.5
});

gsap.from(".content p", {
    opacity: 0,
    y: 50,
    duration: 1.5,
    ease: "power2.out",
    delay: 1
});

// Scroll suave con Lenis
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// GSAP animación flotante independiente para cada bola
gsap.to(".bola1", {
    y: -50,
    x: 30,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

gsap.to(".bola2", {
    y: -30,
    x: -50,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

gsap.to(".bola3", {
    y: -60,
    x: 40,
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

gsap.to(".bola4", {
    y: -20,
    x: 80,
    duration: 9,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

gsap.to(".bola5", {
    y: -70,
    x: 60,
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

gsap.to(".bola6", {
    y: -90,
    x: 20,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

gsap.to(".bola7", {
    y: -40,
    x: -30,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});


document.addEventListener("DOMContentLoaded", function () {
    // Animación de las letras cuando cargue la página
    gsap.to("#titulo-animado", {
        opacity: 1,
        x: 0,  // Desliza las letras desde la izquierda
        duration: 2,
        ease: "power4.out"
    });

    // Animación de las letras del subtítulo cuando cargue la página
    gsap.to("#subtitulo-animado", {
        opacity: 1,
        x: 0,  // Desliza las letras del subtítulo desde la izquierda
        duration: 2,
        delay: 0.5,  // Retraso para el subtítulo
        ease: "power4.out"
    });
});

// Configuración de Lenis (scroll suave)
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => t,
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2,
 });

 
 function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);






