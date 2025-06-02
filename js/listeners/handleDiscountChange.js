import { updateTotals } from "../helpers/updateTotals.js";

/**
 * Inicializa el listener para el cambio de descuento desde el modal.
 * Actualiza el botón visualmente y recalcula los totales.
 */
export function handleDiscountChangeListener() {
  const discountForm = document.getElementById("discount-form");
  const discountInput = document.getElementById("discount-input");
  const discountButton = document.getElementById("discount-button");
  const discountModal = document.getElementById("discountModal");

  if (!discountForm || !discountInput || !discountButton || !discountModal) return;

  // Al abrir el modal, coloca el valor actual del descuento en el input
  discountModal.addEventListener("show.bs.modal", () => {
    const currentDiscount = Number(discountButton.dataset.discount) || 0;
    discountInput.value = currentDiscount;
  });

  discountForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Obtener el nuevo valor de descuento
    const newDiscount = Number(discountInput.value) || 0;

    // Actualizar el dataset y el texto del botón
    discountButton.dataset.discount = newDiscount;
    discountButton.textContent = `${newDiscount}%`;

    // Recalcular los totales con el nuevo descuento
    updateTotals(0, 0);
  });
}