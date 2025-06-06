
fetch("js/personajes.json") // Realiza una solicitud para obtener el archivo JSON de personajes
  .then((response) => {
    if (!response.ok) { // Verifica si la respuesta es exitosa
      throw new Error("Network response was not ok");
    }
    return response; // Devuelve la respuesta si es exitosa
  })
  .then((res) => res.json()) // Realiza una solicitud para obtener el archivo JSON de personajes
  .then((personajes) => {
    const contenedor = document.querySelector(".grid-personajes"); // Selecciona el contenedor donde se mostrarán las cartas de personajes

    personajes.forEach((p) => {
      const carta = document.createElement("div"); // Crea un nuevo elemento div para la carta del personaje
      carta.classList.add("carta-personaje"); // Crea un nuevo elemento div para la carta del personaje
      carta.dataset.personaje = p.id;   // Asigna el ID del personaje como atributo de datos

      carta.innerHTML = `
        <div class="fondo-personaje" style="background-image: url('images/personajes/${p.id}/background.jpg');"></div>
        <div class="contenido-personaje">
          <div class="carrusel-imagen">
            <img src="images/personajes/${p.id}/${p.imagenes[0]}" alt="${p.nombre}" class="img-personaje">
          </div>
          <div class="texto-personaje">
            <h3 class="nombre-personaje">${p.nombre}</h3>
            <p class="descripcion-personaje">${p.descripcion}</p>
          </div>
        </div> 
      `; // Estructura de la carta
      // Añade la carta al contenedor

      contenedor.appendChild(carta);

      // Carrusel en hover
      const img = carta.querySelector("img");
      let index = 0;
      let interval;

      carta.addEventListener("mouseenter", () => {
        interval = setInterval(() => { // 
          index = (index + 1) % p.imagenes.length;
          img.src = `images/personajes/${p.id}/${p.imagenes[index]}`;
        }, 2000); // Cambia cada 2 segundos
      });

      carta.addEventListener("mouseleave", () => { // Detiene el carrusel al salir
        clearInterval(interval);
        index = 0;
        img.src = `images/personajes/${p.id}/${p.imagenes[0]}`; // Resetea a la primera imagen
      });
    });
  })
  .catch((error) => console.error("Error cargando personajes:", error)); // Manejo de errores
