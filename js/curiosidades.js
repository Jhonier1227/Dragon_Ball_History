/* RESUMEN ARCHIVO: Logica de la pagina curiosidades (menu movil, frase dinamica y animaciones suaves). */
document.addEventListener("DOMContentLoaded", () => {
  const frases = [
    "Descubre detalles que hacen unico al universo Dragon Ball",
    "Cada tarjeta conserva la identidad visual del proyecto",
    "Curiosidades organizadas con una lectura mas clara"
  ];

  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  const fraseContainer = document.getElementById("frase-dinamica-pro");
  const btnHero = document.querySelector(".btn-hero");
  const orbs = document.querySelectorAll(".orb");
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
      scrollTo: "#datos-curiosos",
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

    gsap.from(".resumen-card", {
      scrollTrigger: {
        trigger: ".panel-resumen",
        start: "top 82%"
      },
      opacity: 0,
      y: 50,
      duration: 0.9,
      stagger: 0.16,
      ease: "power2.out"
    });

    gsap.from(".curiosidad-card", {
      scrollTrigger: {
        trigger: ".curiosidades-grid",
        start: "top 82%"
      },
      opacity: 0,
      y: 70,
      duration: 0.9,
      stagger: 0.15,
      ease: "power2.out"
    });

    gsap.from(".micro-card", {
      scrollTrigger: {
        trigger: ".micro-datos",
        start: "top 88%"
      },
      opacity: 0,
      y: 45,
      duration: 0.8,
      stagger: 0.12,
      ease: "power2.out"
    });

    orbs.forEach((orb, index) => {
      gsap.to(orb, {
        y: index % 2 === 0 ? -18 : 18,
        x: index === 1 ? 14 : -12,
        duration: 4 + index,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
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
