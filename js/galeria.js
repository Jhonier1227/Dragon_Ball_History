/* RESUMEN ARCHIVO: Logica de la pagina galeria (JSON, menu movil, filtros, descargas y visor ampliado). */
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
  const grid = document.getElementById("mosaico");
  const estadoGaleria = document.getElementById("estado-galeria");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxDownload = document.getElementById("lightbox-download");
  const closeButton = document.getElementById("lightbox-close");
  let fraseIndex = 0;
  let charIndex = 0;
  let items = [];

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

  function normalizarCategoria(categoria = "") {
    return categoria.charAt(0).toUpperCase() + categoria.slice(1);
  }

  function nombreDescarga(item) {
    const extension = item.imagen.split(".").pop() || "jpg";
    return `${item.id || "dragon-ball-history"}.${extension}`;
  }

  function crearItem(item) {
    const article = document.createElement("article");
    const layoutClass = item.layout === "wide" ? " item-wide" : item.layout === "tall" ? " item-tall" : "";
    article.className = `galeria-item${layoutClass}`;
    article.dataset.category = item.categoria;

    article.innerHTML = `
      <button class="galeria-card" type="button" data-image="${item.imagen}" data-title="${item.titulo}">
        <img src="${item.imagen}" alt="${item.alt || item.titulo}" loading="lazy">
        <span class="item-info">
          <strong>${item.titulo}</strong>
          <small>${normalizarCategoria(item.categoria)}</small>
        </span>
      </button>
      <a class="download-chip" href="${item.imagen}" download="${nombreDescarga(item)}" aria-label="Descargar ${item.titulo}">
        Descargar
      </a>
    `;

    const card = article.querySelector(".galeria-card");
    card.addEventListener("click", () => openLightbox(card, item));

    return article;
  }

  function renderGaleria(data) {
    if (!grid) return;

    const fragmento = document.createDocumentFragment();
    data.forEach((item) => fragmento.appendChild(crearItem(item)));
    grid.innerHTML = "";
    grid.appendChild(fragmento);
    items = [...grid.querySelectorAll(".galeria-item")];
    activarAnimacionGaleria();
  }

  function filtrarGaleria(filtro) {
    let visibles = 0;

    items.forEach((item) => {
      const visible = filtro === "todos" || item.dataset.category === filtro;
      item.classList.toggle("is-hidden", !visible);
      if (visible) visibles += 1;
    });

    if (estadoGaleria) {
      estadoGaleria.hidden = visibles > 0;
    }
  }

  function openLightbox(card, item) {
    if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxDownload) return;

    lightboxImage.src = card.dataset.image || "";
    lightboxImage.alt = card.querySelector("img")?.alt || "";
    lightboxTitle.textContent = card.dataset.title || "";
    lightboxDownload.href = item.imagen;
    lightboxDownload.download = nombreDescarga(item);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  async function cargarGaleria() {
    try {
      const response = await fetch("js/galeria.json");
      if (!response.ok) throw new Error("No se pudo cargar galeria.json");
      const data = await response.json();
      renderGaleria(data);
      filtrarGaleria("todos");
    } catch (error) {
      console.error("Error cargando la galeria:", error);
      if (estadoGaleria) {
        estadoGaleria.textContent = "No se pudo cargar la galeria.";
        estadoGaleria.hidden = false;
      }
    }
  }

  filtros.forEach((boton) => {
    boton.addEventListener("click", () => {
      const filtro = boton.dataset.filter;

      filtros.forEach((item) => item.classList.remove("active"));
      boton.classList.add("active");
      filtrarGaleria(filtro);
    });
  });

  btnHero?.addEventListener("click", (event) => {
    event.preventDefault();
    gsap.to(window, {
      duration: 1,
      scrollTo: "#mosaico",
      ease: "power2.out"
    });
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

  function activarAnimacionGaleria() {
    if (typeof gsap === "undefined" || !items.length) return;

    gsap.from(items, {
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

  if (fraseContainer) {
    fraseContainer.textContent = "";
    escribirFrase();
  }

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

  cargarGaleria();
});
