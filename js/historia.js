console.log("Historia cargada correctamente.");

const frases = [
    "¿Sabías que Goku entrenó con 100 veces la gravedad de la Tierra?",
    "La saga de Freezer introdujo el Super Saiyan legendario.",
    "Cell fue creado a partir de las células de los mejores guerreros.",
    "Majin Buu es uno de los villanos más antiguos del universo.",
    "Dragon Ball Super explora multiversos y dioses de la destrucción."
];

let fraseActual = 0;
const fraseElemento = document.getElementById('frase-dinamica-pro');

function mostrarFrase() {
    // Elimina la animación antes de cambiar el texto
    fraseElemento.style.opacity = 0;

    // Espera un poco para que la animación de salida se vea
    setTimeout(() => {
        fraseElemento.textContent = frases[fraseActual];
        fraseElemento.style.opacity = 1;
        fraseActual = (fraseActual + 1) % frases.length;
    }, 500); // Tiempo de fade-out antes de cambiar
}

// Primera frase al iniciar
mostrarFrase();

// Cambiar frase cada 10 segundos
setInterval(mostrarFrase, 6000);



