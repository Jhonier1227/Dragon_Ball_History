/*
=====================personajes.js=====================
Este script es parte de un proyecto web que muestra tarjetas de personajes con imágenes y descripciones.

Este script se encarga de cargar dinámicamente las tarjetas de personajes en la página a partir 
de un archivo JSON (personajes.json). 
Primero hace una petición para obtener los datos, luego crea por cada personaje una tarjeta HTML con su fondo,
carrusel de imágenes, nombre y descripción, y finalmente añade interacción “hover” para que las
 imágenes roten automáticamente cada 2 segundos mientras el cursor esté sobre la carta.
También incluye manejo de errores de red.

*/

// 1. Cargar el archivo JSON con los datos de los personajes
fetch("js/personajes.json")
  .then((response) => {
    // 1.1 Verificar que la respuesta HTTP sea exitosa (status 200–299)
    if (!response.ok) {
      // Si no es exitosa, lanzar un error para que pase al .catch
      throw new Error("Network response was not ok");
    }
    // 1.2 Devolver la respuesta para procesarla en el siguiente .then
    return response;
  })
  // 2. Convertir la respuesta en formato JSON (un array de objetos)
  .then((res) => res.json())
  // 3. Usar los datos JSON para generar las tarjetas de personajes
  .then((personajes) => {
    // 3.1 Seleccionar el contenedor donde se insertarán las cartas
    const contenedor = document.querySelector(".grid-personajes");

    // 3.2 Recorrer cada objeto de personaje en el array
    personajes.forEach((p) => {
      // 3.2.1 Crear el div principal de la carta
      const carta = document.createElement("div");
      carta.classList.add("carta-personaje");
      // 3.2.2 Guardar el ID del personaje como atributo data-personaje
      carta.dataset.personaje = p.id;

      // 3.2.3 Construir el HTML interno de la carta con backticks
      carta.innerHTML = `
        <!-- Fondo de la carta -->
        <div
          class="fondo-personaje"
          style="background-image: url('images/personajes/${p.id}/background.jpg');"
        ></div>

        <!-- Contenido: carrusel y texto -->
        <div class="contenido-personaje">
          <div class="carrusel-imagen">
            <!-- Imagen inicial del carrusel -->
            <img
              src="images/personajes/${p.id}/${p.imagenes[0]}"
              alt="${p.nombre}"
              class="img-personaje"
            >
          </div>
          <div class="texto-personaje">
            <!-- Nombre y descripción -->
            <h3 class="nombre-personaje">${p.nombre}</h3>
            <p class="descripcion-personaje">${p.descripcion}</p>
          </div>
        </div>
      `;

      // 3.2.4 Añadir la carta al DOM dentro del contenedor
      contenedor.appendChild(carta);

      // 4. Preparar la lógica del carrusel en hover
      const img = carta.querySelector(".carrusel-imagen img"); // Imagen dentro del carrusel
      let index = 0;      // Índice de la imagen actual
      let interval;       // Referencia al temporizador

      // 4.1 Al colocar el cursor sobre la carta, iniciar el carrusel
      carta.addEventListener("mouseenter", () => {
        interval = setInterval(() => {
          // Incrementar el índice y usar módulo para volver al inicio
          index = (index + 1) % p.imagenes.length;
          // Cambiar la fuente de la imagen al siguiente frame
          img.src = `images/personajes/${p.id}/${p.imagenes[index]}`;
        }, 2000); // Intervalo de cambio: 2000 ms (2 segundos)
      });

      // 4.2 Al retirar el cursor, detener el carrusel y resetear
      carta.addEventListener("mouseleave", () => {
        clearInterval(interval);             // Parar el setInterval
        index = 0;                           // Volver al primer índice
        img.src = `images/personajes/${p.id}/${p.imagenes[0]}`; // Imagen inicial
      });
    });
  })
  // 5. Manejo de errores general: si la petición falla, se muestra en consola
  .catch((error) => console.error("Error cargando personajes:", error));
