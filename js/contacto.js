/* RESUMEN ARCHIVO: Logica de la pagina contacto (menu movil, frase dinamica y animaciones). */
document.addEventListener("DOMContentLoaded", () => {
  const frases = [
    "Conoce mi trabajo y mis plataformas",
    "Backend, inteligencia artificial y automatizacion",
    "Un proyecto que tambien refleja mi camino profesional"
  ];

  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  const fraseContainer = document.getElementById("frase-dinamica-pro");
  const btnHero = document.querySelector(".btn-hero");
  let fraseIndex = 0;
  let charIndex = 0;

  menuToggle?.addEventListener("click", () => {
    menu?.classList.toggle("show");
  });

  menuToggle?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      menu?.classList.toggle("show");
    }
  });

  function escribirFrase() {
    if (!fraseContainer) return;

    if (charIndex < frases[fraseIndex].length) {
      fraseContainer.textContent += frases[fraseIndex].charAt(charIndex);
      charIndex += 1;
      setTimeout(escribirFrase, 55);
    } else {
      setTimeout(borrarFrase, 2200);
    }
  }

  function borrarFrase() {
    if (!fraseContainer) return;

    if (charIndex > 0) {
      fraseContainer.textContent = frases[fraseIndex].substring(0, charIndex - 1);
      charIndex -= 1;
      setTimeout(borrarFrase, 28);
    } else {
      fraseIndex = (fraseIndex + 1) % frases.length;
      setTimeout(escribirFrase, 350);
    }
  }

  if (fraseContainer) {
    fraseContainer.textContent = "";
    escribirFrase();
  }

  btnHero?.addEventListener("click", (event) => {
    event.preventDefault();
    gsap.to(window, {
      duration: 1,
      scrollTo: "#perfil",
      ease: "power2.out"
    });
  });

  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".hero-content > *", {
      opacity: 0,
      y: 35,
      duration: 0.9,
      stagger: 0.12,
      ease: "power2.out"
    });

    gsap.from(".perfil-card", {
      scrollTrigger: {
        trigger: ".perfil-section",
        start: "top 82%"
      },
      opacity: 0,
      y: 50,
      duration: 0.85,
      stagger: 0.14,
      ease: "power2.out"
    });

    gsap.from(".contacto-card", {
      scrollTrigger: {
        trigger: ".contacto-grid",
        start: "top 84%"
      },
      opacity: 0,
      y: 60,
      duration: 0.85,
      stagger: 0.08,
      ease: "power2.out"
    });
  }

  if (typeof Lenis !== "undefined") {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }
});
