import { createSelectedProductRow } from "./createSelectedProductRow.js";
import { insertElementIntoContainer } from "../helpers/insertElementIntoContainer.js";
import { updateTotals } from "../helpers/updateTotals.js";

/**
 * Crea y devuelve un elemento HTML <div> que representa una tarjeta visual de producto,
 * mostrando el nombre, las dos calidades (económica y alta), sus precios y controles de interacción.
 *
 * La tarjeta incluye:
 *  - Nombre del producto.
 *  - Sección para calidad económica (nombre, precio y checkbox).
 *  - Sección para calidad alta (nombre, precio y checkbox).
 *  - Controles para agregar, eliminar y seleccionar cantidad del producto.
 *
 * @param {Object} productData - Objeto con los datos del producto.
 * @param {string} productData.productName - Nombre del producto.
 * @param {string} productData.highQualityName - Nombre de la calidad alta.
 * @param {number} productData.highQualityPrice - Precio de la calidad alta.
 * @param {string} productData.economicQualityName - Nombre de la calidad económica.
 * @param {number} productData.economicQualityPrice - Precio de la calidad económica.
 * @returns {HTMLDivElement} Elemento <div> que representa la tarjeta del producto lista para insertar en el DOM.
 */
export function createProductCardElement(productData) {
  // Contenedor principal de la tarjeta
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card", "border", "border-light-subtle", "rounded-4", "shadow-sm", "mb-2");
  cardDiv.dataset.ref = "product-card";
  cardDiv.dataset.productFullName = productData.productName;

  // Cuerpo de la tarjeta
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "p-2");

  // Grupo de botones y cantidad
  const inputGroup = document.createElement("div");
  inputGroup.classList.add("input-group", "input-group-sm", "mb-2");

  const addButton = document.createElement("button");
  addButton.setAttribute("type", "button");
  addButton.setAttribute("title", "Agregar");
  addButton.classList.add("btn", "btn-outline-success", "rounded-start-3", "add-product-btn");

  const addIcon = document.createElement("i");
  addIcon.classList.add("bi", "bi-plus-lg");
  addButton.appendChild(addIcon);

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("type", "button");
  deleteButton.setAttribute("title", "Eliminar");
  deleteButton.classList.add("btn", "btn-outline-danger", "remove-product-btn");

  const trashIcon = document.createElement("i");
  trashIcon.classList.add("bi", "bi-trash");
  deleteButton.appendChild(trashIcon);

  // Input de cantidad
  const quantityInput = document.createElement("input");
  quantityInput.setAttribute("type", "number");
  quantityInput.setAttribute("min", "1");
  quantityInput.setAttribute("value", "1");
  quantityInput.setAttribute("autocomplete", "off");
  quantityInput.classList.add("form-control", "rounded-end-3", "text-center", "quantity-input");

  inputGroup.appendChild(addButton);
  inputGroup.appendChild(deleteButton);
  inputGroup.appendChild(quantityInput);

  // Nombre del producto
  const productNameSpan = document.createElement("span");
  productNameSpan.classList.add("form-label", "small", "fw-semibold", "mb-2", "d-block", "text-break", "text-wrap", "w-100", "product-name", "search");
  productNameSpan.textContent = productData.productName;

  const qualitiesRow = document.createElement("div");
  qualitiesRow.classList.add("row", "g-2");

  // Calidad Económica
  const econCol = document.createElement("div");
  econCol.classList.add("col-6");

  const econCard = document.createElement("div");
  econCard.classList.add("card", "border-0", "bg-light-subtle", "h-100");

  const econCardBody = document.createElement("div");
  econCardBody.classList.add("card-body", "p-2");

  const econHeader = document.createElement("div");
  econHeader.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-1");

  const econLabel = document.createElement("small");
  econLabel.classList.add("fw-bold", "text-success");
  econLabel.textContent = "ECON";

  const econCheckbox = document.createElement("input");
  econCheckbox.setAttribute("type", "checkbox");
  econCheckbox.checked = true;
  econCheckbox.classList.add("form-check-input", "m-0", "product-quality-checkbox");

  econHeader.appendChild(econLabel);
  econHeader.appendChild(econCheckbox);

  const econDetails = document.createElement("div");

  const econPrice = document.createElement("small");
  econPrice.classList.add("fw-semibold", "text-dark", "price");
  econPrice.dataset.price = productData.economicQualityPrice;
  econPrice.textContent = `$${productData.economicQualityPrice}`;

  const econName = document.createElement("div");
  econName.classList.add("small", "text-muted", "text-break", "text-wrap", "w-100", "qualityName", "search");
  econName.textContent = productData.economicQualityName;

  econDetails.appendChild(econPrice);
  econDetails.appendChild(econName);

  econCardBody.appendChild(econHeader);
  econCardBody.appendChild(econDetails);
  econCard.appendChild(econCardBody);
  econCol.appendChild(econCard);

  // Calidad high
  const highCol = document.createElement("div");
  highCol.classList.add("col-6");

  const highCard = document.createElement("div");
  highCard.classList.add("card", "border-0", "bg-light-subtle", "h-100");

  const highCardBody = document.createElement("div");
  highCardBody.classList.add("card-body", "p-2");

  const highHeader = document.createElement("div");
  highHeader.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-1");

  const highLabel = document.createElement("small");
  highLabel.classList.add("fw-bold", "text-primary");
  highLabel.textContent = "ALTA";

  const highCheckbox = document.createElement("input");
  highCheckbox.setAttribute("type", "checkbox");
  highCheckbox.checked = true;
  highCheckbox.classList.add("form-check-input", "m-0", "product-quality-checkbox");

  highHeader.appendChild(highLabel);
  highHeader.appendChild(highCheckbox);

  const highDetails = document.createElement("div");

  const highPrice = document.createElement("small");
  highPrice.classList.add("fw-semibold", "text-dark", "price");
  highPrice.dataset.price = productData.highQualityPrice;
  highPrice.textContent = `$${productData.highQualityPrice}`;

  const highName = document.createElement("div");
  highName.classList.add("small", "text-muted", "text-break", "text-wrap", "w-100", "qualityName", "search");
  highName.textContent = productData.highQualityName;

  // Función para agregar el producto (para reutilizar en botón y enter)
  function handleAddProduct() {
    let quantity = parseInt(quantityInput.value, 10);
    if (isNaN(quantity) || quantity < 1) {
      quantity = 1;
      quantityInput.value = "1";
    }

    let economicQualityName, economicQualityPrice, highQualityName, highQualityPrice;

    if (econCheckbox.checked && !highCheckbox.checked) {
      economicQualityName = econName.textContent;
      economicQualityPrice = Number(econPrice.dataset.price);
      highQualityName = econName.textContent;
      highQualityPrice = Number(econPrice.dataset.price);
    } else if (!econCheckbox.checked && highCheckbox.checked) {
      economicQualityName = highName.textContent;
      economicQualityPrice = Number(highPrice.dataset.price);
      highQualityName = highName.textContent;
      highQualityPrice = Number(highPrice.dataset.price);
    } else {
      economicQualityName = econName.textContent;
      economicQualityPrice = Number(econPrice.dataset.price);
      highQualityName = highName.textContent;
      highQualityPrice = Number(highPrice.dataset.price);
    }

    const actualProductData = {
      productName: productNameSpan.textContent,
      economicQualityName,
      economicQualityPrice,
      highQualityName,
      highQualityPrice,
      quantity,
      econCheckboxChecked: econCheckbox.checked,
      highCheckboxChecked: highCheckbox.checked,
    };

    quantityInput.value = 1;
    addProductToSelectedProducts(actualProductData);
  }
  
  deleteButton.addEventListener("click", () => {
    cardDiv.remove();
    removeProductFromLocalStorage(productData.productName);
  });


  addButton.addEventListener("click", handleAddProduct);

  // Nuevo: activar agregar producto con Enter en el input de cantidad
  quantityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleAddProduct();
    }
  });

  // Permitir borrar el campo, pero validar solo números y sin ceros a la izquierda
  quantityInput.addEventListener("input", () => {
    let value = quantityInput.value.replace(/\D/g, "");
    value = value.replace(/^0+/, "");
    quantityInput.value = value;
  });

  // Si el usuario sale del input y está vacío, poner 1
  quantityInput.addEventListener("blur", () => {
    if (quantityInput.value === "") {
      quantityInput.value = "1";
    }
  });

  highDetails.appendChild(highPrice);
  highDetails.appendChild(highName);

  highCardBody.appendChild(highHeader);
  highCardBody.appendChild(highDetails);
  highCard.appendChild(highCardBody);
  highCol.appendChild(highCard);

  // Unir todas las partes
  qualitiesRow.appendChild(econCol);
  qualitiesRow.appendChild(highCol);

  cardBody.appendChild(inputGroup);
  cardBody.appendChild(productNameSpan);
  cardBody.appendChild(qualitiesRow);

  cardDiv.appendChild(cardBody);

  econCheckbox.addEventListener("change", () => {
    ensureAtLeastOneChecked(econCheckbox, highCheckbox);
  });

  highCheckbox.addEventListener("change", () => {
    ensureAtLeastOneChecked(highCheckbox, econCheckbox);
  });

  return cardDiv;
}

/**
 * Asegura que al menos uno de los dos checkboxes esté siempre activo.
 * Si ambos quedan desmarcados, vuelve a marcar el que se acaba de desmarcar.
 * @param {HTMLInputElement} changedCheckbox
 * @param {HTMLInputElement} otherCheckbox
 */
function ensureAtLeastOneChecked(changedCheckbox, otherCheckbox) {
  if (!changedCheckbox.checked && !otherCheckbox.checked) {
    changedCheckbox.checked = true;
  }
}

function addProductToSelectedProducts(productData) {
  // A espera de crear el componente tr para productos seleccionados
  const selectedProductRow = createSelectedProductRow(productData);

  insertElementIntoContainer(selectedProductRow, document.getElementById("products-body"));
  updateTotals(productData.economicQualityPrice * productData.quantity, productData.highQualityPrice * productData.quantity);
}

/**
 * Elimina un producto de localStorage por su nombre.
 * @param {string} productName
 */
function removeProductFromLocalStorage(productName) {
  const key = "availableProducts";
  const products = JSON.parse(localStorage.getItem(key)) || [];
  const updatedProducts = products.filter(
    (p) => p.productName !== productName
  );
  localStorage.setItem(key, JSON.stringify(updatedProducts));
}
