/**
 * Crea una fila <tr> con los datos del producto seleccionado.
 * @param {Object} productData - Objeto con los datos del producto.
 * @param {string} productData.productName - Nombre del producto.
 * @param {string} productData.economicQualityName - Nombre de la calidad económica.
 * @param {number} productData.economicQualityPrice - Precio de la calidad económica.
 * @param {string} productData.highQualityName - Nombre de la calidad alta.
 * @param {number} productData.highQualityPrice - Precio de la calidad alta.
 * @param {number} productData.quantity - Cantidad seleccionada.
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
  trProduct.dataset.brandhigh = productData.highQualityName;
  trProduct.dataset.priceHigh = Number(productData.highQualityPrice).toFixed(2);
  trProduct.dataset.amountHigh = (productData.quantity * Number(productData.highQualityPrice)).toFixed(2);

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

  tdButtonQty.appendChild(buttonQty);

  // 4. Nombre del producto
  const tdProductName = document.createElement("td");
  tdProductName.className = "ps-2 text-start text-truncate custom-max-width custom-break-word fw-semibold";
  tdProductName.title = productData.productName;
  tdProductName.textContent = productData.productName;

  // 5. Marca económica
  const tdBrandEcon = document.createElement("td");
  tdBrandEcon.className = "text-muted";
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
  tdBrandHigh.className = "text-muted";
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
