import "https://cdn.jsdelivr.net/npm/fuse.js@6.6.2/dist/fuse.min.js";
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