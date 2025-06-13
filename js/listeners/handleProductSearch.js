import { filterAvailableProducts } from "../helpers/filterAvailableProducts.js";

/**
 * Inicializa el listener para el input de búsqueda de productos.
 */
export function handleProductSearchListener() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    filterAvailableProducts(e.target.value);
  });
}