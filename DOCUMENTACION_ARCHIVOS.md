# Documentacion Tecnica del Proyecto

## Objetivo
Este documento explica para que sirve cada archivo del proyecto y que hace cada funcion JavaScript, para facilitar el onboarding de nuevas personas al equipo.

## Mapa de Archivos

### Paginas HTML principales
- `index.html`: landing principal con hero, resumen de historia, personajes destacados, curiosidades y CTA final.
- `historia.html`: linea de tiempo completa de sagas Dragon Ball / Dragon Ball Z con anclas y tarjetas.
- `personajes.html`: vista de personajes con buscador, filtro por saga y grid dinamico.
- `galeria.html`: plantilla base, pendiente de contenido real.
- `curiosidades.html`: plantilla base, pendiente de contenido real.
- `contacto.html`: plantilla base, pendiente de contenido real.

### Parciales HTML
- `partials/header.html`: componente reutilizable del navbar general.
- `partials/footer.html`: componente reutilizable del footer.
- `partials/card-personaje.html`: plantilla de ejemplo para una tarjeta de personaje.
- `partials/card-timeline.html`: plantilla de ejemplo para un item de timeline.
- `partials/plantilla_estructura.html`: plantilla guia para crear nuevas paginas.

### Hojas de estilo CSS
- `css/global.css`: reset, tipografia base y estilos compartidos (incluye modo claro/oscuro general).
- `css/home.css`: estilos exclusivos de la pagina de inicio.
- `css/historia.css`: estilos de timeline, tarjetas y navbar de historia.
- `css/personajes.css`: estilos de navbar, filtros, grid y tarjetas de personajes.
- `css/fonts.css`: imports de fuentes.
- `css/galeria.css`: reservado, pendiente.
- `css/curiosidades.css`: reservado, pendiente.
- `css/contacto.css`: reservado, pendiente.

### JavaScript
- `js/global.js`: comportamiento global reutilizable.
- `js/home.js`: animaciones y eventos de la pagina de inicio.
- `js/historia.js`: animaciones y comportamiento de pagina historia.
- `js/personajes.js`: carga de JSON, render, filtros y carrusel por tarjeta.
- `js/galeria.js`: reservado, pendiente.
- `js/curiosidades.js`: reservado, pendiente.
- `js/contacto.js`: reservado, pendiente.
- `js/gsap.min.js`: placeholder local (se esta usando CDN en HTML).
- `js/lenis.min.js`: placeholder local (se esta usando CDN en HTML).

## Funciones JavaScript por Archivo

### `js/global.js`
Resumen: centraliza funciones comunes que pueden usarse en todas las paginas.

Funciones/eventos:
- `btnExplorar?.addEventListener("click", ...)`
  - Rol: scroll animado hacia `#timeline` cuando existe el boton `btn-explorar`.
  - Dependencias: GSAP + ScrollToPlugin.
- `window.addEventListener("DOMContentLoaded", ...)`
  - Rol: inicializa modo claro/oscuro y estado visual del navbar.
- `actualizarEstiloNavbar()` (funcion interna)
  - Rol: aplica `navbar-light` o `navbar-dark` segun clase `light-mode` del `body`.
- `toggleBtn.addEventListener("click", ...)`
  - Rol: alterna modo claro/oscuro, actualiza texto del boton y persiste estado en `localStorage`.

### `js/home.js`
Resumen: controla la experiencia dinamica de `index.html`.

Funciones/eventos:
- `window.addEventListener('scroll', ...)` (bloque navVisible)
  - Rol: muestra/oculta navbar con animacion GSAP segun scroll.
- `document.querySelector('.btn-descubrir').addEventListener('click', ...)`
  - Rol: hace scroll suave hacia `#intro`.
- `menuToggle.addEventListener('click', ...)`
  - Rol: abre/cierra menu movil (`.show`).
- `escribirFrase()`
  - Rol: escribe letra por letra frases del arreglo `frasesPro`.
- `borrarFrase()`
  - Rol: borra la frase actual y rota a la siguiente.
- `checkNavbarVisibility()`
  - Rol: aplica clases `visible/hidden` en navbar despues de cierto scroll.
- `raf(time)`
  - Rol: loop de animacion para Lenis (smooth scroll).
- `showSlide(index)`
  - Rol: muestra una slide del carrusel de fondo con transiciones GSAP.
- `nextSlide()`
  - Rol: avanza el indice de slide y llama `showSlide`.
- `checkBtnSubir()`
  - Rol: muestra/oculta boton "subir" segun posicion de scroll.
- `btnSubir.addEventListener('click', ...)`
  - Rol: vuelve al tope con scroll suave.

Puntos importantes:
- Se referencia `cambiarFondo` y `ajustarOpacidadBolas`, pero no se observan definiciones en este archivo. Conviene consolidarlas aqui o eliminar llamadas si no se usan.
- Hay listeners de scroll repetidos para `ajustarOpacidadBolas`; se puede simplificar en una sola suscripcion.

### `js/historia.js`
Resumen: anima la pagina de historia y mejora interaccion de timeline.

Funciones/eventos:
- `document.addEventListener("DOMContentLoaded", ...)` (frases)
  - Rol: inicializa la frase dinamica del navbar.
- `escribirFrase()`
  - Rol: efecto maquina de escribir para frases de Goku.
- `borrarFrase()`
  - Rol: borra frase actual y avanza a la siguiente.
- `gsap.utils.toArray('.timeline-item').forEach(...)`
  - Rol: animacion de entrada por cada item del timeline con ScrollTrigger.
- `const raf = (time) => ...`
  - Rol: actualiza Lenis en cada frame.
- `document.addEventListener("DOMContentLoaded", ...)` (hover cartas timeline)
  - Rol: escala tarjetas `.timeline-item .content` al hover.
- `document.addEventListener("DOMContentLoaded", ...)` (hover tarjetas + sombra)
  - Rol: refuerza escala/sombra al hover de tarjetas timeline.
- `document.addEventListener("DOMContentLoaded", ...)` (hover logos)
  - Rol: anima logos de saga al hover.

Nota:
- Hay dos bloques muy parecidos para hover de tarjetas timeline; se recomienda unificarlos para evitar duplicidad de eventos.

### `js/personajes.js`
Resumen: archivo principal de logica de personajes (datos + UI).

Funciones/eventos:
- `document.addEventListener("DOMContentLoaded", ...)`
  - Rol: punto de entrada. Declara referencias de DOM, registra eventos y dispara carga de datos.
- `inicializarNavbar()`
  - Rol: configura menu movil (click, teclado, cierre por enlace y reset en resize).
- `alternarMenu()` (funcion interna de `inicializarNavbar`)
  - Rol: alterna clase `show` y atributo `aria-expanded`.
- `filtrarPersonajes()`
  - Rol: filtra tarjetas por texto (`buscador`) y saga (`select`), mostrando mensaje de "sin resultados" cuando aplica.
- `crearCarta(personaje)`
  - Rol: construye el `article` de personaje a partir de un objeto JSON y prepara carrusel.
- `iniciarCarrusel(carta, personaje)`
  - Rol: controla rotacion de imagenes por hover/touch.
- `iniciar()` (interna de `iniciarCarrusel`)
  - Rol: inicia `setInterval` para avanzar imagenes.
- `detener()` (interna de `iniciarCarrusel`)
  - Rol: detiene intervalo y restablece imagen inicial.
- `cargarPersonajes()`
  - Rol: obtiene `js/personajes.json`, renderiza todas las cartas y aplica filtro inicial.

Flujo general:
1. Se inicializa navbar.
2. Se cargan personajes desde JSON.
3. Se renderiza grid.
4. Se habilitan filtro/buscador y estado vacio.

### `js/galeria.js`
- Estado: archivo vacio.
- Sugerencia: implementar aqui filtro por categoria, lightbox y paginacion de galeria.

### `js/curiosidades.js`
- Estado: archivo vacio.
- Sugerencia: implementar aqui acordeon, categorias y "curiosidad aleatoria".

### `js/contacto.js`
- Estado: archivo vacio.
- Sugerencia: validacion de formulario, envio (fetch) y feedback visual de estado.

## Convencion de Encabezados Aplicada
En cada archivo fuente se agrego un encabezado `RESUMEN ARCHIVO` para que cualquier persona nueva identifique su objetivo antes de leer el detalle.

## Recomendaciones de Mantenimiento
- Mantener una sola responsabilidad por archivo JS de pagina.
- Evitar listeners duplicados sobre el mismo evento/selector.
- Documentar toda nueva funcion con este formato minimo:
  - Que hace
  - Que entrada recibe
  - Que salida/efecto produce
  - Que dependencias externas usa
- Si una pagina usa libreria por CDN, evitar placeholders vacios locales para no generar confusion.
