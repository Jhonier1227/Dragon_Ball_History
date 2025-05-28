console.log("✅ Historia cargada correctamente.");

document.addEventListener("DOMContentLoaded", function () {
  const frasesPro = [
"¡Mi nombre es Goku y soy un Saiyajin criado en la Tierra!",
"¡No peleo por odio, peleo para superarme a mí mismo!",
"¡Los límites están para romperse!",
"¡Nunca subestimes el poder de un Saiyajin!",
"¡El entrenamiento es la clave del verdadero poder!",
"¡Cada batalla es una oportunidad para crecer!",
"¡La fuerza no lo es todo, el corazón también importa!",
"¡Los verdaderos guerreros nunca se rinden!",
"¡Con cada caída, me vuelvo más fuerte!",
"¡No importa cuántas veces me derroten, siempre me levantaré!"
  ];

  const fraseContainer = document.getElementById('frase-dinamica-pro');
  let fraseIndex = 0;
  let charIndex = 0;

  function escribirFrase() {
    if (charIndex < frasesPro[fraseIndex].length) {
      fraseContainer.textContent += frasesPro[fraseIndex].charAt(charIndex);
      charIndex++;
      setTimeout(escribirFrase, 100);
    } else {
      setTimeout(borrarFrase, 2000);
    }
  }

  function borrarFrase() {
    if (charIndex > 0) {
      fraseContainer.textContent = frasesPro[fraseIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(borrarFrase, 50);
    } else {
      fraseIndex = (fraseIndex + 1) % frasesPro.length;
      setTimeout(escribirFrase, 600);
    }
  }

  escribirFrase();
});



// GSAP Timeline - Animaciones de entrada por tarjeta con ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animación de entrada para cada timeline-item
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.from(item, {
        opacity: 0,
        y: 100,
        duration: 0.10,
        ease: "power2.out",
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
});

// Configuración básica de Lenis (scroll suave)
const lenis = new Lenis({
    duration: 1.2,
    smooth: true
});

// Función de actualización continua para Lenis
const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
};
requestAnimationFrame(raf);


gsap.from('.intro-saga img', {
    opacity: 0,
    y: -100,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: '.intro-saga',
        start: "top 80%",
        toggleActions: "play none none none"
    }
});



document.addEventListener("DOMContentLoaded", function () {
  const cartas = document.querySelectorAll(".timeline-item .content");

  cartas.forEach((carta) => {
    carta.addEventListener("mouseenter", () => {
      gsap.to(carta, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    carta.addEventListener("mouseleave", () => {
      gsap.to(carta, {
        scale: 1,
        duration: 0.3,
        ease: "power2.in"
      });
    });
  });
});
