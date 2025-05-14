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
    gsap.to(window, { duration: 1, scrollTo: "#intro", ease: "power2.inOut" });
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

// Animación específica de bolas
gsap.to(".bola1", { y: -50, x: 30, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".bola2", { y: -30, x: -50, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".bola3", { y: -60, x: 40, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".bola4", { y: -20, x: 80, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".bola5", { y: -70, x: 60, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".bola6", { y: -90, x: 20, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".bola7", { y: -40, x: -30, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
