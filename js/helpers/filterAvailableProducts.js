/**
 * Filtra las tarjetas de producto en el contenedor #available-products usando Fuse.js. 
 * Fuse debería estar importado previamente. En este caso, se asume que Fuse está disponible globalmente.
 * @param {string} searchTerm - El término de búsqueda.
 */
export function filterAvailableProducts(searchTerm, containerId, productRef) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const cards = Array.from(container.querySelectorAll(`[data-ref="${productRef}"]`));
  if (!searchTerm.trim()) {
    // Si no hay búsqueda, mostrar todos
    cards.forEach((card) => (card.style.display = ""));
    return;
  }

  // Construir lista de objetos para Fuse
  const items = cards.map((card) => ({
    el: card,
    fullName: card.dataset.productFullName || "",
  }));

  // Configuración básica de Fuse
  const fuse = new Fuse(items, {
    keys: ["fullName"],
    threshold: 0.3,
    ignoreLocation: true,
    useExtendedSearch: true,
  });

  const results = fuse.search(searchTerm);

  // Ocultar todos
  cards.forEach((card) => (card.style.display = "none"));
  // Mostrar solo los encontrados
  results.forEach((result) => {
    result.item.el.style.display = "";
  });
}
