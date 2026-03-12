/* RESUMEN ARCHIVO: Script central del chatbot (UI + logica de envio). Se inyecta en todas las paginas. */
/* USO:
 - Inserta un widget flotante de chat en el DOM.
 - Envia preguntas a un endpoint backend configurable.
 - No expone claves API en el navegador.
*/

(() => {
  const config = {
    endpoint: "/backend/chat.php",
    titulo: "Asistente Dragon Ball",
    subtitulo: "Preguntame sobre personajes, sagas, transformaciones y curiosidades.",
    sugerencias: [
      "Quien es Gohan y cuales son sus transformaciones?",
      "En que saga aparece Freezer?",
      "Curiosidad de las Esferas del Dragon",
      "Historia de Vegeta"
    ]
  };

  const injectStyles = () => {
    if (document.getElementById("agente-estilos")) return;
    const style = document.createElement("style");
    style.id = "agente-estilos";
    style.textContent = `
      .agente-chatbot {
        position: fixed;
        right: 24px;
        bottom: 24px;
        z-index: 9999;
        font-family: 'Poppins', sans-serif;
        color: #fff;
      }
      .agente-toggle {
        background: #ffa500;
        color: #000;
        border: none;
        border-radius: 999px;
        padding: 12px 18px;
        font-weight: 700;
        box-shadow: 0 8px 20px rgba(255, 165, 0, 0.35);
        cursor: pointer;
      }
      .agente-panel {
        width: 340px;
        max-height: 520px;
        background: rgba(0, 0, 0, 0.92);
        border: 1px solid rgba(255, 165, 0, 0.45);
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45);
        overflow: hidden;
        display: none;
        margin-bottom: 12px;
      }
      .agente-panel.abierto { display: block; }
      .agente-header {
        padding: 14px 16px;
        background: linear-gradient(135deg, rgba(255, 165, 0, 0.2), rgba(0, 0, 0, 0.9));
        border-bottom: 1px solid rgba(255, 165, 0, 0.4);
      }
      .agente-header h4 { margin: 0; font-size: 1rem; color: #ffa500; }
      .agente-header p { margin: 4px 0 0; font-size: 0.85rem; color: #ddd; }
      .agente-body {
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: 320px;
        overflow-y: auto;
      }
      .agente-msg {
        padding: 10px 12px;
        border-radius: 12px;
        font-size: 0.9rem;
        line-height: 1.4;
      }
      .agente-msg.user { background: rgba(255, 165, 0, 0.18); align-self: flex-end; }
      .agente-msg.bot { background: rgba(255, 255, 255, 0.08); align-self: flex-start; }
      .agente-sugerencias { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 14px 10px; }
      .agente-sugerencias button {
        background: rgba(255, 165, 0, 0.2);
        border: 1px solid rgba(255, 165, 0, 0.4);
        color: #ffa500;
        border-radius: 999px;
        padding: 6px 10px;
        font-size: 0.75rem;
        cursor: pointer;
      }
      .agente-input {
        display: flex;
        gap: 8px;
        padding: 12px 14px 14px;
        border-top: 1px solid rgba(255, 165, 0, 0.4);
        background: rgba(0, 0, 0, 0.85);
      }
      .agente-input input {
        flex: 1;
        border-radius: 10px;
        border: 1px solid rgba(255, 165, 0, 0.5);
        padding: 8px 10px;
        background: #0c0c0c;
        color: #fff;
      }
      .agente-input button {
        background: #ffa500;
        color: #000;
        border: none;
        border-radius: 10px;
        padding: 8px 12px;
        font-weight: 700;
        cursor: pointer;
      }
      @media (max-width: 480px) {
        .agente-panel { width: 92vw; }
        .agente-chatbot { right: 16px; bottom: 16px; }
      }
    `;
    document.head.appendChild(style);
  };

  const createWidget = () => {
    const wrapper = document.createElement("div");
    wrapper.className = "agente-chatbot";

    wrapper.innerHTML = `
      <div class="agente-panel" id="agente-panel">
        <div class="agente-header">
          <h4>${config.titulo}</h4>
          <p>${config.subtitulo}</p>
        </div>
        <div class="agente-body" id="agente-body">
          <div class="agente-msg bot">Hola! Soy tu asistente. Preguntame lo que quieras sobre Dragon Ball.</div>
        </div>
        <div class="agente-sugerencias" id="agente-sugerencias"></div>
        <form class="agente-input" id="agente-form">
          <input id="agente-texto" type="text" placeholder="Escribe tu pregunta..." autocomplete="off" />
          <button type="submit">Enviar</button>
        </form>
      </div>
      <button class="agente-toggle" id="agente-toggle">Chat DB</button>
    `;

    document.body.appendChild(wrapper);

    const panel = document.getElementById("agente-panel");
    const toggle = document.getElementById("agente-toggle");
    const body = document.getElementById("agente-body");
    const form = document.getElementById("agente-form");
    const input = document.getElementById("agente-texto");
    const sugerencias = document.getElementById("agente-sugerencias");

    config.sugerencias.forEach((texto) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = texto;
      btn.addEventListener("click", () => {
        input.value = texto;
        input.focus();
      });
      sugerencias.appendChild(btn);
    });

    toggle.addEventListener("click", () => {
      panel.classList.toggle("abierto");
    });

    const pushMessage = (text, role) => {
      const msg = document.createElement("div");
      msg.className = `agente-msg ${role}`;
      msg.textContent = text;
      body.appendChild(msg);
      body.scrollTop = body.scrollHeight;
    };

    const sendMessage = async (texto) => {
      pushMessage(texto, "user");
      input.value = "";

      try {
        const response = await fetch(config.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mensaje: texto,
            pagina: window.location.pathname,
          }),
        });

        if (!response.ok) {
          throw new Error("No se pudo contactar el servidor.");
        }

        const data = await response.json();
        const reply = data.respuesta || "No tengo respuesta por ahora.";
        pushMessage(reply, "bot");
      } catch (err) {
        pushMessage(
          "No pude conectarme al asistente. Verifica que el backend este activo.",
          "bot"
        );
      }
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const texto = input.value.trim();
      if (!texto) return;
      sendMessage(texto);
    });
  };

  const boot = () => {
    injectStyles();
    createWidget();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
