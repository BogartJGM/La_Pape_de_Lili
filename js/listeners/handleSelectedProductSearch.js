import { filterAvailableProducts } from "../helpers/filterAvailableProducts.js";

export function handleSelectedProductSearch() {
  const selectProductSearchInput = document.getElementById("selected-products-search-input");
  if (!selectProductSearchInput) return;

  selectProductSearchInput.addEventListener("input", (e) => {
    filterAvailableProducts(e.target.value, "products-body", "selected-product-row");
    removeSelection();
    selectFirstVisibleCardIfSearchNotEmpty();
  });

  selectProductSearchInput.addEventListener("keydown", (e) => {
    handleEscapeKey(e);
    handleNavigationKeys(e);
  });

  // Clases usadas para selección y animaciones
  const SELECTED_CLASS = "product-card-selected";
  const SHAKE_CLASS = "product-card-shake";
  const LAST_CLASS = "product-card-last";

  function selectFirstVisibleCardIfSearchNotEmpty() {
    if (selectProductSearchInput.value.trim().length > 0) {
      const firstVisible = document.querySelector('[data-ref="selected-product-row"]:not([style*="display: none"])');
      if (firstVisible) {
        selectSelectedProductTr(firstVisible);
      }
    }
  }

  function selectSelectedProductTr(selectedProductTr, isLast = false, shake = false) {
    removeSelection();
    if (!selectedProductTr) return;

    selectedProductTr.classList.add(SELECTED_CLASS);
    if (isLast) {
      selectedProductTr.classList.add(LAST_CLASS);
      setTimeout(() => selectedProductTr.classList.remove(LAST_CLASS), 400);
    }
    if (shake) {
      selectedProductTr.classList.add(SHAKE_CLASS);
      setTimeout(() => selectedProductTr.classList.remove(SHAKE_CLASS), 300);
    }

    // evitar scroll de contenedores externos
    selectedProductTr.scrollIntoView({
      behavior: "smooth",
      block: "end",   // <-- “nearest” para no forzar scroll de ancestors
      inline: "nearest"
    });
  }

  function removeSelection() {
    document.querySelectorAll(`[data-ref="selected-product-row"].${SELECTED_CLASS}`).forEach((el) => {
      el.classList.remove(SELECTED_CLASS, SHAKE_CLASS, LAST_CLASS);
    });
  }

  function handleEscapeKey(e) {
    if (e.key === "Escape") {
      removeSelection();
      searchInput.value = "";
      filterAvailableProducts("");
    }
  }

  function handleNavigationKeys(e) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      const cards = Array.from(document.querySelectorAll('[data-ref="selected-product-row"]:not([style*="display: none"])'));
      if (cards.length === 0) return;

      const current = document.querySelector(`[data-ref="selected-product-row"].${SELECTED_CLASS}`);
      let idx = cards.indexOf(current);

      if (e.key === "ArrowDown") {
        if (idx === -1) {
          selectSelectedProductTr(cards[0]);
        } else if (idx === cards.length - 1) {
          selectSelectedProductTr(cards[idx], true, true);
        } else {
          selectSelectedProductTr(cards[idx + 1]);
        }
        e.preventDefault();
      }

      if (e.key === "ArrowUp") {
        if (idx === -1 || idx === 0) {
          selectSelectedProductTr(cards[0], true, true);
        } else {
          selectSelectedProductTr(cards[idx - 1]);
        }
        e.preventDefault();
      }
    }
  }
}