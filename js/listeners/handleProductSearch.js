import "https://cdn.jsdelivr.net/npm/fuse.js@6.6.2/dist/fuse.min.js";
import { filterAvailableProducts } from "../helpers/filterAvailableProducts.js";

/**
 * Inicializa el listener para el input de búsqueda de productos.
 */
export function handleProductSearchListener() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  const SELECTED_CLASS = "product-card-selected";
  const SHAKE_CLASS = "product-card-shake";
  const LAST_CLASS = "product-card-last";

  searchInput.addEventListener("input", (e) => {
    filterAvailableProducts(e.target.value);
    removeSelection();
  });

  function removeSelection() {
    document.querySelectorAll(`[data-ref="product-card"].${SELECTED_CLASS}`).forEach(el => {
      el.classList.remove(SELECTED_CLASS, SHAKE_CLASS, LAST_CLASS);
    });
  }

  function selectCard(card, isLast = false, shake = false) {
    removeSelection();
    if (card) {
      card.classList.add(SELECTED_CLASS);
      if (isLast) {
        card.classList.add(LAST_CLASS);
        setTimeout(() => {
          card.classList.remove(LAST_CLASS);
        }, 400);
      }
      if (shake) {
        card.classList.add(SHAKE_CLASS);
        setTimeout(() => card.classList.remove(SHAKE_CLASS), 300);
      }
      card.scrollIntoView({ block: "center", behavior: "smooth" }); // <-- Cambiado aquí
    }
  }

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      const cards = Array.from(document.querySelectorAll('[data-ref="product-card"]:not([style*="display: none"])'));
      if (cards.length === 0) return;

      const current = document.querySelector(`[data-ref="product-card"].${SELECTED_CLASS}`);
      let idx = cards.indexOf(current);

      if (e.key === "ArrowDown") {
        if (idx === -1) {
          selectCard(cards[0]);
        } else if (idx === cards.length - 1) {
          selectCard(cards[idx], true, true); // Último, shake y outline rojo
        } else {
          selectCard(cards[idx + 1]);
        }
        e.preventDefault();
      }

      if (e.key === "ArrowUp") {
        if (idx === -1 || idx === 0) {
          selectCard(cards[0], true, true); // Primero, shake y outline rojo
        } else {
          selectCard(cards[idx - 1]);
        }
        e.preventDefault();
      }
    }
  });
}