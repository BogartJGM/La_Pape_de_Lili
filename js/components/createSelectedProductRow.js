import { subtractFromTotals } from "../helpers/updateTotals.js";
import { updateTotalsOnQuantityChange } from "../helpers/updateTotals.js";

/**
 * Crea una fila <tr> con los datos del producto seleccionado.
 * @param {Object} productData - Objeto con los datos del producto.
 * @param {number} productData.quantity - Cantidad seleccionada.
 * @param {string} productData.productName - Nombre del producto.
 * @param {string} productData.economicQualityName - Nombre de la calidad económica.
 * @param {number} productData.economicQualityPrice - Precio de la calidad económica.
 * @param {string} productData.highQualityName - Nombre de la calidad alta.
 * @param {number} productData.highQualityPrice - Precio de la calidad alta.
 * @param {boolean} productData.econCheckboxChecked - Si la calidad económica está seleccionada.
 * @param {boolean} productData.highCheckboxChecked - Si la calidad alta está seleccionada.
 * @returns {HTMLTableRowElement} Fila <tr> con los datos del producto.
 */
export function createSelectedProductRow(productData) {
  const trProduct = document.createElement("tr");
  trProduct.className = "small";
  trProduct.dataset.ref = "selected-product-row";
  trProduct.dataset.quantity = productData.quantity || 1;
  trProduct.dataset.productName = productData.productName;
  trProduct.dataset.brandEcon = productData.economicQualityName;
  trProduct.dataset.priceEcon = productData.economicQualityPrice.toFixed(2);
  trProduct.dataset.amountEcon = (productData.quantity * Number(productData.economicQualityPrice)).toFixed(2);
  trProduct.dataset.econCheckboxChecked = productData.econCheckboxChecked ? "true" : "false";
  trProduct.dataset.brandhigh = productData.highQualityName;
  trProduct.dataset.priceHigh = Number(productData.highQualityPrice).toFixed(2);
  trProduct.dataset.amountHigh = (productData.quantity * Number(productData.highQualityPrice)).toFixed(2);
  trProduct.dataset.highCheckboxChecked = productData.highCheckboxChecked ? "true" : "false";

  // 1. Manejador de arrastre
  const tdDrag = document.createElement("td");
  tdDrag.className = "align-middle p-0";
  const spanDrag = document.createElement("span");
  spanDrag.className = "d-inline-block text-muted cursor-grab fs-5";
  spanDrag.title = "Arrastrar";
  spanDrag.innerHTML = "&#x2630;";
  tdDrag.appendChild(spanDrag);

  // 2. Botón de eliminar
  const tdRemove = document.createElement("td");
  tdRemove.className = "align-middle p-0";
  const btnRemove = document.createElement("button");
  btnRemove.className = "btn btn-link btn-sm text-danger fs-5";
  btnRemove.title = "Quitar producto";
  btnRemove.type = "button";
  btnRemove.addEventListener("click", function () {
    // Obtener los importes a restar desde los datasets de la fila
    const amountEcon = Number(trProduct.dataset.amountEcon) || 0;
    const amountHigh = Number(trProduct.dataset.amountHigh) || 0;

    // Actualizar los totales
    subtractFromTotals(amountEcon, amountHigh);

    // Eliminar la fila
    trProduct.remove();
  });
  const iconRemove = document.createElement("i");
  iconRemove.className = "bi bi-x-lg";
  btnRemove.appendChild(iconRemove);
  tdRemove.appendChild(btnRemove);

  // 3. Botón de cantidad
  const tdButtonQty = document.createElement("td");
  tdButtonQty.className = "text-muted";
  const buttonQty = document.createElement("button");
  buttonQty.className = "form-control form-control-sm text-center";
  buttonQty.type = "button";
  buttonQty.textContent = productData.quantity || 1;
  buttonQty.dataset.bsToggle = "modal";
  buttonQty.dataset.bsTarget = "#changeQntyModal";
  document.getElementById("changeQntyModal").addEventListener("show.bs.modal", () => {
    // Al abrir el modal, establecer el valor del input con la cantidad actual
    const modalInput = document.getElementById("change-qnty-input");
    modalInput.value = Number(buttonQty.textContent);
  });
  // Usar una función para manejar el evento solo para este buttonQty
  const handleHideModal = () => {
    const modalInput = document.getElementById("change-qnty-input");
    const newQuantity = Number(modalInput.value);
    if (newQuantity > 0) {
      const prevEconAmount = Number(trProduct.dataset.amountEcon) || 0;
      const prevHighAmount = Number(trProduct.dataset.amountHigh) || 0;
      const newEconAmount = newQuantity * Number(productData.economicQualityPrice);
      const newHighAmount = newQuantity * Number(productData.highQualityPrice);

      // Actualizar datasets y celdas
      trProduct.dataset.quantity = newQuantity;
      trProduct.dataset.amountEcon = newEconAmount.toFixed(2);
      trProduct.dataset.amountHigh = newHighAmount.toFixed(2);
      buttonQty.textContent = newQuantity;
      tdAmountEcon.textContent = `$${newEconAmount.toFixed(2)}`;
      tdAmountHigh.textContent = `$${newHighAmount.toFixed(2)}`;

      // Actualizar totales
      updateTotalsOnQuantityChange(prevEconAmount, newEconAmount, prevHighAmount, newHighAmount);
    }
    document.getElementById("changeQntyModal").removeEventListener("hide.bs.modal", handleHideModal);
  };

  buttonQty.addEventListener("click", () => {
    // Al abrir el modal, establecer el valor del input con la cantidad actual
    const modalInput = document.getElementById("change-qnty-input");
    modalInput.value = Number(buttonQty.textContent);

    // Agregar el listener solo cuando se abre el modal para este botón
    document.getElementById("changeQntyModal").addEventListener("hide.bs.modal", handleHideModal);
  });
  document.getElementById("change-qnty-form").addEventListener("submit", function (event) {
    event.preventDefault();
  });

  tdButtonQty.appendChild(buttonQty);

  // 4. Nombre del producto
  const tdProductName = document.createElement("td");
  tdProductName.className = "ps-2 text-start text-truncate custom-max-width custom-break-word fw-semibold";
  tdProductName.title = productData.productName;
  tdProductName.textContent = productData.productName;

  // 5. Marca económica
  const tdBrandEcon = document.createElement("td");
  tdBrandEcon.className = "text-muted text-truncate";
  tdBrandEcon.title = productData.economicQualityName;
  tdBrandEcon.textContent = productData.economicQualityName;

  // 6. Precio económico
  const tdPriceEcon = document.createElement("td");
  tdPriceEcon.className = "text-muted";
  tdPriceEcon.textContent = `$${Number(productData.economicQualityPrice).toFixed(2)}`;

  // 7. Importe económico (importe: cantidad * precio económico, solo si está seleccionada la calidad económica)
  const tdAmountEcon = document.createElement("td");
  tdAmountEcon.className = "fw-semibold text-dark";
  tdAmountEcon.textContent = `$${(productData.quantity * Number(productData.economicQualityPrice)).toFixed(2)}`;

  // 8. Marca alta
  const tdBrandHigh = document.createElement("td");
  tdBrandHigh.className = "text-muted text-truncate";
  tdBrandHigh.title = productData.highQualityName;
  tdBrandHigh.textContent = productData.highQualityName;

  // 9. Precio alto
  const tdPriceHigh = document.createElement("td");
  tdPriceHigh.className = "text-muted";
  tdPriceHigh.textContent = `$${Number(productData.highQualityPrice).toFixed(2)}`;

  // 10. Importe alto (importe: cantidad * precio alta, solo si está seleccionada la calidad alta)
  const tdAmountHigh = document.createElement("td");
  tdAmountHigh.className = "fw-semibold text-dark";
  tdAmountHigh.textContent = `$${(productData.quantity * Number(productData.highQualityPrice)).toFixed(2)}`;

  // Añadir todas las celdas a la fila
  trProduct.append(tdDrag, tdRemove, tdButtonQty, tdProductName, tdBrandEcon, tdPriceEcon, tdAmountEcon, tdBrandHigh, tdPriceHigh, tdAmountHigh);

  return trProduct;
}
