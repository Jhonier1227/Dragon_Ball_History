/* RESUMEN ARCHIVO: Logica de personajes (carga JSON, render dinamico, filtro y carrusel por tarjeta). */
/* FUNCIONES CLAVE:
 - inicializarNavbar(): menu movil accesible (click, teclado, resize).
 - filtrarPersonajes(): filtra cartas por texto y saga, y muestra estado vacio.
 - crearCarta(personaje): construye estructura HTML de cada personaje desde JSON.
 - iniciarCarrusel(carta, personaje): rota imagenes en hover/touch.
 - cargarPersonajes(): trae personajes.json, renderiza y activa filtros.
*/
document.addEventListener("DOMContentLoaded", () => {
  const buscador = document.getElementById("buscador-personajes");
  const filtro = document.getElementById("filtro-saga");
  const grid = document.querySelector(".grid-personajes");
  const sinResultados = document.getElementById("sin-resultados");
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  let cartas = [];

  // Inicializa comportamiento del navbar en mobile:
  // abrir/cerrar menu, accesibilidad por teclado y cierre en resize/enlaces.
  const inicializarNavbar = () => {
    if (!menuToggle || !menu) return;

    // Alterna el estado visual del menu y actualiza aria-expanded.
    const alternarMenu = () => {
      menu.classList.toggle("show");
      const abierto = menu.classList.contains("show");
      menuToggle.setAttribute("aria-expanded", abierto ? "true" : "false");
    };

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.addEventListener("click", alternarMenu);
    menuToggle.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        alternarMenu();
      }
    });

    menu.querySelectorAll("a").forEach((enlace) => {
      enlace.addEventListener("click", () => menu.classList.remove("show"));
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 991) {
        menu.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  };

  // Filtra las cartas renderizadas por texto (nombre) y por saga seleccionada.
  // Tambien controla el estado de "sin resultados".
  const filtrarPersonajes = () => {
    const texto = buscador.value.trim().toLowerCase();
    const saga = filtro.value;
    let visibles = 0;

    cartas.forEach((carta) => {
      const nombre = carta.dataset.nombre || "";
      const sagaCarta = carta.dataset.saga || "todos";

      const coincideTexto = nombre.includes(texto);
      const coincideSaga = saga === "todos" || saga === sagaCarta;
      const mostrar = coincideTexto && coincideSaga;

      carta.classList.toggle("is-hidden", !mostrar);
      if (mostrar) visibles += 1;
    });

    sinResultados.hidden = visibles > 0;
  };

  // Construye una tarjeta de personaje a partir del objeto recibido desde JSON.
  // Devuelve el elemento <article> listo para insertarse en el grid.
  const crearCarta = (personaje) => {
    const carta = document.createElement("article");
    carta.className = "carta-personaje";
    carta.dataset.personaje = personaje.id;
    carta.dataset.saga = personaje.saga || "todos";
    carta.dataset.nombre = (personaje.nombre || "").toLowerCase();

    const primeraImagen = personaje.imagenes?.[0] || "";
    const fondo = `images/personajes/${personaje.id}/background.jpg`;

    carta.innerHTML = `
      <div class="fondo-personaje" style="background-image: url('${fondo}');"></div>
      <div class="contenido-personaje">
        <div class="carrusel-imagen">
          <img src="images/personajes/${personaje.id}/${primeraImagen}" alt="${personaje.nombre}" class="img-personaje" loading="lazy">
        </div>
        <div class="texto-personaje">
          <h3 class="nombre-personaje">${personaje.nombre}</h3>
          <p class="descripcion-personaje">${personaje.descripcion}</p>
        </div>
      </div>
    `;

    iniciarCarrusel(carta, personaje);
    return carta;
  };

  // Activa el carrusel de imagenes por tarjeta al hacer hover/touch.
  const iniciarCarrusel = (carta, personaje) => {
    const imagenes = personaje.imagenes || [];
    if (imagenes.length <= 1) return;

    const img = carta.querySelector(".img-personaje");
    let index = 0;
    let interval = null;

    // Inicia rotacion automatica de imagenes.
    const iniciar = () => {
      if (interval) return;
      interval = setInterval(() => {
        index = (index + 1) % imagenes.length;
        img.src = `images/personajes/${personaje.id}/${imagenes[index]}`;
      }, 1800);
    };

    // Detiene rotacion y restablece la imagen inicial del personaje.
    const detener = () => {
      clearInterval(interval);
      interval = null;
      index = 0;
      img.src = `images/personajes/${personaje.id}/${imagenes[0]}`;
    };

    carta.addEventListener("mouseenter", iniciar);
    carta.addEventListener("mouseleave", detener);
    carta.addEventListener("touchstart", iniciar, { passive: true });
    carta.addEventListener("touchend", detener);
  };

  // Carga personajes.json, renderiza todas las tarjetas y aplica filtro inicial.
  const cargarPersonajes = async () => {
    try {
      const response = await fetch("js/personajes.json");
      if (!response.ok) throw new Error("No se pudo cargar personajes.json");

      const personajes = await response.json();
      const fragmento = document.createDocumentFragment();

      personajes.forEach((personaje) => {
        const carta = crearCarta(personaje);
        cartas.push(carta);
        fragmento.appendChild(carta);
      });

      grid.innerHTML = "";
      grid.appendChild(fragmento);
      filtrarPersonajes();
    } catch (error) {
      console.error("Error cargando personajes:", error);
      sinResultados.textContent = "No se pudieron cargar los personajes.";
      sinResultados.hidden = false;
    }
  };

  buscador.addEventListener("input", filtrarPersonajes);
  filtro.addEventListener("change", filtrarPersonajes);

  inicializarNavbar();
  cargarPersonajes();
});

