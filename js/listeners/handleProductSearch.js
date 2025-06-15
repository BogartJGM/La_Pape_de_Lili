import "https://cdn.jsdelivr.net/npm/fuse.js@6.6.2/dist/fuse.min.js";
import { filterAvailableProducts } from "../helpers/filterAvailableProducts.js";

/**
 * Inicializa el listener para el input de búsqueda de productos.
 */
export function handleProductSearchListener() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  // Clases usadas para selección y animaciones
  const SELECTED_CLASS = "product-card-selected";
  const SHAKE_CLASS = "product-card-shake";
  const LAST_CLASS = "product-card-last";

  // --- Funciones auxiliares ---

  // Elimina selección y animaciones de todas las tarjetas
  function removeSelection() {
    document.querySelectorAll(`[data-ref="product-card"].${SELECTED_CLASS}`).forEach(el => {
      el.classList.remove(SELECTED_CLASS, SHAKE_CLASS, LAST_CLASS);
    });
  }

  // Selecciona una tarjeta, opcionalmente con animaciones
  function selectCard(card, isLast = false, shake = false) {
    removeSelection();
    if (card) {
      card.classList.add(SELECTED_CLASS);
      if (isLast) {
        card.classList.add(LAST_CLASS);
        setTimeout(() => card.classList.remove(LAST_CLASS), 400);
      }
      if (shake) {
        card.classList.add(SHAKE_CLASS);
        setTimeout(() => card.classList.remove(SHAKE_CLASS), 300);
      }
      card.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }

  // Maneja la navegación con flechas y enter
  function handleNavigationKeys(e) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      const cards = Array.from(document.querySelectorAll('[data-ref="product-card"]:not([style*="display: none"])'));
      if (cards.length === 0) return;

      const current = document.querySelector(`[data-ref="product-card"].${SELECTED_CLASS}`);
      let idx = cards.indexOf(current);

      if (e.key === "ArrowDown") {
        if (idx === -1) {
          selectCard(cards[0]);
        } else if (idx === cards.length - 1) {
          selectCard(cards[idx], true, true);
        } else {
          selectCard(cards[idx + 1]);
        }
        e.preventDefault();
      }

      if (e.key === "ArrowUp") {
        if (idx === -1 || idx === 0) {
          selectCard(cards[0], true, true);
        } else {
          selectCard(cards[idx - 1]);
        }
        e.preventDefault();
      }
    }

    if (e.key === "Enter") {
      const selectedCard = document.querySelector(`.${SELECTED_CLASS}`);
      if (selectedCard) {
        const addBtn = selectedCard.querySelector('.add-product-btn');
        if (addBtn) {
          addBtn.click();
          setTimeout(() => {
            const rows = document.querySelectorAll('tr[data-ref="selected-product-row"]');
            if (rows.length > 0) {
              const lastRow = rows[rows.length - 1];
              lastRow.scrollIntoView({ block: "center", behavior: "smooth" });
            }
          }, 100);
        }
      }
      e.preventDefault();
    }
  }

  // Maneja Alt+número y Alt+Backspace para el input de cantidad
  function handleAltQuantityKeys(e) {
    if (!e.altKey) return;

    const selectedCard = document.querySelector(`.${SELECTED_CLASS}`);
    const isNumber = /^[0-9]$/.test(e.key);
    const isBackspace = e.key === "Backspace";

    if (selectedCard) {
      const quantityInput = selectedCard.querySelector('.quantity-input');
      if (quantityInput) {
        if (isNumber) {
          e.preventDefault();
          // Si el valor es vacío o "1", reemplaza; si no, reemplaza por el nuevo número
          if (quantityInput.value === "" || quantityInput.value === "1") {
            quantityInput.value = e.key === "0" ? "1" : e.key;
          } else {
            quantityInput.value = e.key;
          }
          quantityInput.setSelectionRange(quantityInput.value.length, quantityInput.value.length);
        }
        if (isBackspace) {
          e.preventDefault();
          let current = quantityInput.value || "";
          if (current.length > 0) {
            quantityInput.value = current.slice(0, -1);
          }
        }
      } else if (isNumber || isBackspace) {
        e.preventDefault();
      }
    } else if (isNumber || isBackspace) {
      e.preventDefault();
    }
  }

  function handleEscapeKey(e) {
    if (e.key === "Escape") {
      removeSelection();
      searchInput.value = "";
      filterAvailableProducts("");
    }
  }

  //Función para no permitir el compartamiento de la tecla alt sola
  function preventAltKeyBehavior(e) {
    if (e.key === "Alt") {
      e.preventDefault();
    }
  }
  
  // --- Listeners principales ---

  // Filtrado de productos al escribir
  searchInput.addEventListener("input", (e) => {
    filterAvailableProducts(e.target.value);
    removeSelection();
  });

  // Navegación y cantidad con teclado
  searchInput.addEventListener("keydown", (e) => {
    handleEscapeKey(e);
    handleNavigationKeys(e);
    handleAltQuantityKeys(e);
    preventAltKeyBehavior(e);
  });
}