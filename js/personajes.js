document.querySelectorAll(".carta-personaje").forEach((carta) => {
  const carrusel = carta.querySelector(".carrusel-imagen img");
  const personaje = carta.dataset.personaje;
  const imagenes = [
    `images/personajes/${goku}/goku_base.png`,
    `images/personajes/${goku}/goku_ssj_2.png`
  ];

  let index = 0;
  let interval;

  carta.addEventListener("mouseenter", () => {
    interval = setInterval(() => {
      index = (index + 1) % imagenes.length;
      carrusel.src = imagenes[index];
    }, 5000);
  });

  carta.addEventListener("mouseleave", () => {
    clearInterval(interval);
    index = 0;
    carrusel.src = imagenes[index];
  });
});
