/* RESUMEN ARCHIVO: Logica de la pagina historia (frase dinamica, animaciones de timeline y scroll suave). */
/* FUNCIONES CLAVE:
 - escribirFrase()/borrarFrase(): gestionan frase dinamica del navbar.
 - raf(time): loop de animacion para Lenis (scroll suave).
 - Bloques DOMContentLoaded: agregan hovers animados a tarjetas y logos de la timeline.
 - ScrollTrigger: anima la entrada de cada timeline-item al entrar en viewport.
*/

document.addEventListener("DOMContentLoaded", () => {
  const frasesPro = [
    "Mi nombre es Goku y soy un Saiyajin criado en la Tierra!",
    "No peleo por odio, peleo para superarme a mi mismo!",
    "Los limites estan para romperse!",
    "Nunca subestimes el poder de un Saiyajin!",
    "El entrenamiento es la clave del verdadero poder!",
    "Cada batalla es una oportunidad para crecer!",
    "La fuerza no lo es todo, el corazon tambien importa!",
    "Los verdaderos guerreros nunca se rinden!",
    "Con cada caida, me vuelvo mas fuerte!",
    "No importa cuantas veces me derroten, siempre me levantare!"
  ];

  const fraseContainer = document.getElementById("frase-dinamica-pro");
  let fraseIndex = 0;
  let charIndex = 0;

  // Escribe la frase actual letra por letra y luego llama a borrarFrase().
  function escribirFrase() {
    if (!fraseContainer) return;
    if (charIndex < frasesPro[fraseIndex].length) {
      fraseContainer.textContent += frasesPro[fraseIndex].charAt(charIndex);
      charIndex++;
      setTimeout(escribirFrase, 100);
    } else {
      setTimeout(borrarFrase, 2000);
    }
  }

  // Borra la frase actual letra por letra, rota al siguiente mensaje y reinicia escritura.
  function borrarFrase() {
    if (!fraseContainer) return;
    if (charIndex > 0) {
      fraseContainer.textContent = frasesPro[fraseIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(borrarFrase, 50);
    } else {
      fraseIndex = (fraseIndex + 1) % frasesPro.length;
      setTimeout(escribirFrase, 600);
    }
  }

  if (fraseContainer) {
    escribirFrase();
  }

  const tarjetasTimeline = document.querySelectorAll(".timeline-item .content");
  tarjetasTimeline.forEach((tarjeta) => {
    tarjeta.addEventListener("mouseenter", () => {
      gsap.to(tarjeta, {
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(255, 145, 0, 0.4)",
        duration: 0.3,
        ease: "power2.out"
      });
    });

    tarjeta.addEventListener("mouseleave", () => {
      gsap.to(tarjeta, {
        scale: 1,
        boxShadow: "0 5px 20px rgba(0, 0, 0, 0.4)",
        duration: 0.3,
        ease: "power2.in"
      });
    });
  });

  const logos = document.querySelectorAll(".logo-saga");
  logos.forEach((logo) => {
    logo.addEventListener("mouseenter", () => {
      gsap.to(logo, {
        scale: 1.1,
        boxShadow: "0 0 20px rgba(255, 145, 0, 0.5)",
        duration: 0.3,
        ease: "power2.out"
      });
    });

    logo.addEventListener("mouseleave", () => {
      gsap.to(logo, {
        scale: 1,
        boxShadow: "0 0 10px rgba(253, 158, 5, 0.3)",
        duration: 0.3,
        ease: "power2.in"
      });
    });
  });
});

// GSAP Timeline - Animaciones de entrada por tarjeta con ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animacion de entrada para cada timeline-item
gsap.utils.toArray(".timeline-item").forEach((item) => {
  gsap.from(item, {
    opacity: 0,
    y: 100,
    duration: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: item,
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });
});

const lenis = new Lenis({
  duration: 1.2,
  smooth: true
});

// Funcion de actualizacion continua para Lenis.
const raf = (time) => {
  lenis.raf(time);
  requestAnimationFrame(raf);
};
requestAnimationFrame(raf);

gsap.from(".intro-saga img", {
  opacity: 0,
  y: -100,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".intro-saga",
    start: "top 80%",
    toggleActions: "play none none none"
  }
});
