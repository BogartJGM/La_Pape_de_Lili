/**
 * Inserta un elemento en un contenedor del DOM.
 *
 * @param {HTMLElement} element - El elemento a insertar.
 * @param {HTMLElement} container - El contenedor donde se insertará el elemento.
 */
export function insertElementIntoContainer(element, container) {
  if (element && container) {
    container.appendChild(element);
  } else {
    console.error("Se deben proporcionar tanto el elemento como el contenedor.");
  }
}
