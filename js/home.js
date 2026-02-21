/* RESUMEN ARCHIVO: Logica de la pagina inicio (animaciones, navbar, carrusel, scroll y botones de accion). */
/* FUNCIONES CLAVE:
 - escribirFrase()/borrarFrase(): controlan la frase dinamica tipo maquina de escribir.
 - checkNavbarVisibility(): aplica visible/hidden al navbar segun scroll.
 - raf(time): mantiene Lenis actualizado en cada frame.
 - showSlide(index)/nextSlide(): controlan carrusel de fondo.
 - checkBtnSubir(): muestra u oculta el boton para volver arriba.
*/

// Mostrar navbar con GSAP al hacer scroll
let navVisible = false;

// Callback de scroll: anima la entrada/salida del navbar segun la posicion vertical.
window.addEventListener("scroll", () => {
  if (window.scrollY > 100 && !navVisible) {
    gsap.to(".navbar", { top: 0, duration: 0.8, ease: "power2.out" });
    navVisible = true;
  } else if (window.scrollY <= 100 && navVisible) {
    gsap.to(".navbar", { top: -100, duration: 0.8, ease: "power2.in" });
    navVisible = false;
  }
});

// Callback de click: mueve la vista hacia la seccion de introduccion.
document.querySelector(".btn-descubrir")?.addEventListener("click", (e) => {
  e.preventDefault();
  gsap.to(window, { duration: 0.3, scrollTo: "#intro", ease: "power2.inOut" });
});

// Animaciones de entrada en la seccion de introduccion.
gsap.from(".intro-text", {
  scrollTrigger: ".intro-text",
  opacity: 0,
  x: -100,
  duration: 1.5,
  ease: "power2.out",
});

gsap.from(".intro-image img", {
  scrollTrigger: ".intro-image img",
  opacity: 0,
  x: 100,
  duration: 1.5,
  ease: "power2.out",
});

const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

// Callback de click: abre o cierra el menu hamburguesa.
menuToggle?.addEventListener("click", () => {
  menu?.classList.toggle("show");
});

const frasesPro = [
  "El poder esta en ti!",
  "Nunca te rindas, sigue entrenando.",
  "El limite solo esta en tu mente.",
  "Despierta el Super Saiyajin dentro de ti!",
  "Cada caida te hace mas fuerte.",
];

const fraseContainer = document.getElementById("frase-dinamica-pro");
let fraseIndex = 0;
let charIndex = 0;

// Escribe la frase actual letra por letra y luego programa el borrado.
function escribirFrase() {
  if (!fraseContainer) return;
  if (charIndex < frasesPro[fraseIndex].length) {
    fraseContainer.textContent += frasesPro[fraseIndex].charAt(charIndex);
    charIndex++;
    setTimeout(escribirFrase, 100);
  } else {
    setTimeout(borrarFrase, 3000);
  }
}

// Borra la frase en pantalla y avanza al siguiente texto del arreglo.
function borrarFrase() {
  if (!fraseContainer) return;
  if (charIndex > 0) {
    fraseContainer.textContent = frasesPro[fraseIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(borrarFrase, 50);
  } else {
    fraseIndex = (fraseIndex + 1) % frasesPro.length;
    setTimeout(escribirFrase, 500);
  }
}

if (fraseContainer) {
  escribirFrase();
}

// Verifica el estado de visibilidad del navbar segun el scroll actual.
function checkNavbarVisibility() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  if (window.scrollY > 500) {
    navbar.classList.add("visible");
    navbar.classList.remove("hidden");
  } else {
    navbar.classList.add("hidden");
    navbar.classList.remove("visible");
  }
}

window.addEventListener("load", checkNavbarVisibility);
window.addEventListener("scroll", checkNavbarVisibility);

// Animacion letras al cargar
gsap.from("#titulo-animado", {
  opacity: 0,
  x: -100,
  duration: 2,
  ease: "power4.out",
});

gsap.from("#subtitulo-animado", {
  opacity: 0,
  x: -100,
  duration: 2,
  delay: 0.5,
  ease: "power4.out",
});

// Scroll suave con Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
  touchMultiplier: 2,
});

// Loop de animacion para actualizar Lenis en cada frame.
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Animacion especifica de bolas
gsap.to(".bola1", { y: -50, x: 30, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".bola2", { y: -30, x: -50, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".bola3", { y: -60, x: 40, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".bola4", { y: -20, x: 80, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".bola5", { y: -70, x: 60, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".bola6", { y: -90, x: 20, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".bola7", { y: -40, x: -30, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });

// Animaciones de secciones en scroll
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
  ease: "power2.out",
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
  ease: "power2.out",
});

gsap.from(".card-personaje", {
  scrollTrigger: {
    trigger: "#personajes-destacados",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  opacity: 0,
  y: 100,
  duration: 1,
  stagger: 0.3,
  ease: "power2.out",
});

gsap.from(".curiosidad", {
  scrollTrigger: {
    trigger: "#curiosidades",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  opacity: 0,
  y: 100,
  duration: 1,
  stagger: 0.3,
  ease: "power2.out",
});

const slides = document.querySelectorAll(".carrusel-fondo .slide");
let currentSlide = 0;

// Muestra una slide concreta y oculta las demas con transicion.
function showSlide(index) {
  slides.forEach((slide) => {
    gsap.set(slide, { opacity: 0, scale: 1.05, filter: "blur(5px)" });
  });

  gsap.to(slides[index], {
    duration: 2,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    ease: "power2.out",
  });
}

// Avanza al siguiente indice de slide y actualiza el carrusel.
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

if (slides.length > 0) {
  showSlide(currentSlide);
  setInterval(nextSlide, 7000);
}

const btnSubir = document.getElementById("btnSubir");

// Controla la aparicion del boton para volver al inicio de la pagina.
function checkBtnSubir() {
  if (!btnSubir) return;
  if (window.scrollY > 500) {
    btnSubir.classList.add("visible");
  } else {
    btnSubir.classList.remove("visible");
  }
}

window.addEventListener("scroll", checkBtnSubir);
window.addEventListener("load", checkBtnSubir);

btnSubir?.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
