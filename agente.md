# agente.md

## Descripción del proyecto

**Dragon Ball History** es un sitio web estático enfocado en presentar contenido del universo de Dragon Ball de forma visual, organizada y escalable.

El proyecto contiene páginas principales como inicio, historia, personajes, galería y curiosidades.  
Actualmente, el módulo de **Historia** se está estructurando por temporadas y sagas, con páginas independientes por saga, estilos compartidos y un archivo JSON central para gestionar imágenes.

El proyecto está en evolución constante, por lo que cada cambio debe respetar la estructura existente y facilitar futuras expansiones.

---

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- JSON
- Bootstrap
- GSAP
- Lenis

---

## Estructura general esperada

### Sección Historia

La sección `Historia` debe mantenerse organizada por temporadas y sagas.

Ejemplo:

- `Historia/`
- `Historia/Dragon-Ball/`
- `Historia/Dragon-Ball-Z/`

Cada saga debe tener:

- un archivo HTML propio
- contenido estructurado con el mismo patrón visual
- integración con el archivo `js/historia-imagenes.json`
- uso de estilos compartidos desde `css/historia/`

### Imágenes

Las imágenes de historia deben almacenarse por saga.

Ejemplo:

- `images/historia/sagas/dragon-ball/emperador-pilaf/`
- `images/historia/sagas/dragon-ball/torneo-21/`

---

## Reglas de desarrollo

### Reglas generales

- No romper funcionalidades existentes.
- No eliminar contenido útil sin una razón clara.
- Mantener consistencia visual y estructural entre páginas similares.
- Reutilizar estilos compartidos antes de crear estilos nuevos innecesarios.
- Reutilizar estructura existente cuando una saga siga el mismo patrón que otra.
- Mantener nombres de carpetas y archivos claros, predecibles y consistentes.
- Evitar duplicar lógica, rutas o estilos si ya existe una forma reutilizable de hacerlo.

### Reglas para la sección Historia

- Cada saga debe seguir una estructura homogénea.
- Cada página de saga debe incluir, cuando aplique:
  - encabezado
  - resumen ampliado
  - bloque de historia completa
  - imágenes asociadas a cada bloque narrativo
  - bloque de video
  - footer consistente con la página principal
- Cada bloque narrativo debe tener una imagen coherente con la escena descrita.
- No repetir imágenes dentro de una misma saga.
- Priorizar imágenes del anime, manga, capturas oficiales o recursos claramente no generados con IA.
- Evitar imágenes con apariencia artificial o generadas por IA.
- Si una imagen no representa bien la escena, debe reemplazarse.
- Las rutas visuales deben quedar registradas en `js/historia-imagenes.json`.

### Regla para videos

- No agregar el video automáticamente al cerrar una saga.
- Antes de finalizar cualquier saga, siempre se debe pedir al usuario el video que desea usar.
- El bloque de video debe usar miniatura y enlace externo a YouTube.
- Evitar `iframe` si genera bloqueos, validaciones o errores visuales.

### Regla para JSON

- `js/historia-imagenes.json` es la fuente central para registrar imágenes por saga.
- Si una saga tiene más contenido visual, se puede extender con bloques como `historiaCompleta`, manteniendo consistencia.
- No dejar rutas vacías si ya existe recurso real asignado.
- Si se reemplaza una imagen, actualizar el JSON si corresponde.

---

## Comportamiento esperado del agente

- Entender el proyecto antes de modificarlo.
- Trabajar con enfoque incremental y ordenado.
- Respetar la estructura existente del proyecto.
- Hacer cambios concretos, verificables y consistentes.
- Priorizar claridad y mantenimiento futuro.
- Asumir que este proyecto seguirá creciendo y que la estructura debe soportar nuevas temporadas y sagas.
- Si detecta una mejora estructural razonable, puede sugerirla.
- No debe aplicar reglas nuevas al archivo `agente.md` sin autorización explícita del usuario.

---

## Manejo de nuevas reglas

Si durante el trabajo aparece una nueva regla, mejora o convención:

- **No debe agregarse automáticamente a `agente.md`**
- Primero debe proponerse al usuario
- Solo debe incorporarse cuando el usuario lo indique explícitamente con frases como:
  - `actualiza el agente.md`
  - `guardar reglas`

---

## Manejo de múltiples agentes

Este proyecto trabaja con **3 agentes diferentes**.

Por lo tanto:

- Las reglas deben ser neutrales y reutilizables.
- Ninguna instrucción debe depender de un agente específico.
- Todo agente debe poder entender rápidamente:
  - la estructura del proyecto
  - el estilo esperado
  - las restricciones de contenido
  - la forma correcta de extender el trabajo ya hecho

---

## Restricciones

- No reorganizar carpetas ya establecidas sin necesidad clara.
- No sobrescribir contenido correcto solo por preferencia de estilo.
- No introducir dependencias innecesarias.
- No usar imágenes repetidas dentro de una misma saga.
- No usar imágenes con apariencia de IA.
- No cerrar una saga con video sin solicitar primero el enlace al usuario.
- No modificar `agente.md` automáticamente por nuevas reglas detectadas.
- No romper enlaces existentes entre `historia.html`, las páginas de saga y el JSON.

---

## Buenas prácticas

- Mantener HTML legible y reutilizable.
- Mantener CSS agrupado por propósito y evitar estilos duplicados.
- Usar nombres de archivos descriptivos.
- Verificar rutas relativas antes de cerrar cambios.
- Mantener coherencia entre HTML, carpetas de imágenes y JSON.
- Favorecer soluciones simples, mantenibles y compatibles con el resto del proyecto.
- Antes de cerrar una tarea, comprobar:
  - que la ruta de imágenes existe
  - que el HTML apunta correctamente al recurso
  - que el JSON está sincronizado si aplica
  - que no se repitieron imágenes dentro del mismo apartado

---

## Prioridad del agente al trabajar

1. Entender el contexto actual
2. Respetar la estructura existente
3. Hacer cambios sin romper lo anterior
4. Mantener consistencia visual y organizativa
5. Escalar el proyecto de forma limpia y sostenible
