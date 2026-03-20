/* RESUMEN ARCHIVO: Logica de la pagina galeria (menu movil, frase dinamica, filtros y visor ampliado). */
document.addEventListener("DOMContentLoaded", () => {
  const frases = [
    "Una galeria visual para recorrer el proyecto con orden",
    "Filtra por personajes, historia o fondos",
    "Mantuvimos la estetica naranja y negra del sitio"
  ];

  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  const fraseContainer = document.getElementById("frase-dinamica-pro");
  const btnHero = document.querySelector(".btn-hero");
  const filtros = document.querySelectorAll(".filtro-btn");
  const items = document.querySelectorAll(".galeria-item");
  const cards = document.querySelectorAll(".galeria-card");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxTitle = document.getElementById("lightbox-title");
  const closeButton = document.getElementById("lightbox-close");
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
      scrollTo: "#mosaico",
      ease: "power2.out"
    });
  });

  filtros.forEach((boton) => {
    boton.addEventListener("click", () => {
      const filtro = boton.dataset.filter;

      filtros.forEach((item) => item.classList.remove("active"));
      boton.classList.add("active");

      items.forEach((item) => {
        const visible = filtro === "todos" || item.dataset.category === filtro;
        item.classList.toggle("is-hidden", !visible);
      });
    });
  });

  function openLightbox(card) {
    if (!lightbox || !lightboxImage || !lightboxTitle) return;

    lightboxImage.src = card.dataset.image || "";
    lightboxImage.alt = card.querySelector("img")?.alt || "";
    lightboxTitle.textContent = card.dataset.title || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => openLightbox(card));
  });

  closeButton?.addEventListener("click", closeLightbox);

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
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

    gsap.from(".panel-control > *", {
      scrollTrigger: {
        trigger: ".panel-control",
        start: "top 84%"
      },
      opacity: 0,
      y: 35,
      duration: 0.75,
      stagger: 0.12,
      ease: "power2.out"
    });

    gsap.from(".galeria-item", {
      scrollTrigger: {
        trigger: ".mosaico-section",
        start: "top 84%"
      },
      opacity: 0,
      y: 70,
      duration: 0.9,
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
