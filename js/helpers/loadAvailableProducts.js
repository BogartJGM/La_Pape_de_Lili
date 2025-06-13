import { createProductCardElement } from "../components/createProductCard.js";

/**
 * Añade una tarjeta de producto al DOM sin volver a guardar en localStorage.
 * @param {Object} productData
 */
function addProductCardToDOM(productData) {
  const productNode = createProductCardElement(productData);
  const container = document.getElementById("available-products");
  if (container && productNode) {
    container.appendChild(productNode);
  }
}

/**
 * Recupera los productos guardados en localStorage y los renderiza en el DOM.
 */
export function loadAvailableProductsFromStorage() {
  const key = "availableProducts";
  const products = JSON.parse(localStorage.getItem(key)) || [];
  products.forEach(productData => {
    addProductCardToDOM(productData);
  });
}