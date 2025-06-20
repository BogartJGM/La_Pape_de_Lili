import { createProductCardElement } from "../components/createProductCard.js";

/**
 * Obtiene y retorna los datos ingresados en el formulario de nuevo producto.
 * Si algún campo está vacío, retorna null.
 */
function getNewProductFormData() {
  const form = document.getElementById("new-product-form");
  if (!form) {
    console.warn(`Advertencia: El elemento con ID 'new-product-form' no existe`);
    return null;
  }

  const productName = form.querySelector("#product-name").value.trim();
  const economicQualityName = form.querySelector("#eco-name").value.trim();
  const economicQualityPrice = form.querySelector("#eco-price").value.trim();
  const highQualityName = form.querySelector("#high-name").value.trim();
  const highQualityPrice = form.querySelector("#high-price").value.trim();

  // Validar campos vacíos
  if (!productName || !economicQualityName || !economicQualityPrice || !highQualityName || !highQualityPrice) {
    return null;
  }

  form.reset();

  return {
    productName,
    economicQualityName,
    economicQualityPrice: Number(economicQualityPrice),
    highQualityName,
    highQualityPrice: Number(highQualityPrice),
  };
}

/**
 * Agrega una tarjeta de producto al DOM dentro del contenedor con ID 'available-products'.
 *
 * Utiliza los datos proporcionados para crear un nodo de tarjeta de producto mediante createProductCardElement,
 * y lo inserta como hijo del contenedor con ID 'available-products' en el DOM.
 * Si el contenedor o el nodo del producto no existen, la función no realiza ninguna acción.
 *
 * @param {ProductData} productData - Objeto con los datos del producto a mostrar en la tarjeta.
 */
function addProductCardToDOM(productData) {
  const productNode = createProductCardElement(productData);
  const container = document.getElementById("available-products");

  if (container && productNode) {
    // Agregar animación grow
    productNode.classList.add("grow-animate");
    setTimeout(() => {
      productNode.classList.remove("grow-animate");
    }, 200);

    container.appendChild(productNode);
    // Guardar en localStorage
    const key = "availableProducts";
    const products = JSON.parse(localStorage.getItem(key)) || [];
    products.push(productData);
    localStorage.setItem(key, JSON.stringify(products));
  }

  const modalElement = document.getElementById("newProductModal");
  const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
  modalInstance.hide();
}
/**
 * Muestra un mensaje de error arriba del modal-header con animación shake.
 */
function showModalError(message) {
  removeModalError();
  const modal = document.getElementById("newProductModal");
  if (!modal) return;
  const modalHeader = modal.querySelector(".modal-header");
  if (!modalHeader) return;

  const errorDiv = document.createElement("div");
  errorDiv.id = "modal-error-msg";
  errorDiv.className = "alert alert-danger py-1 px-2 mb-2 shake";
  errorDiv.style.fontSize = "0.95em";
  errorDiv.textContent = message;

  modalHeader.parentNode.insertBefore(errorDiv, modalHeader);
}

/**
 * Elimina el mensaje de error si existe.
 */
function removeModalError() {
  const errorDiv = document.getElementById("modal-error-msg");
  if (errorDiv) {
    errorDiv.remove();
  }
}

/**
 * Inicializa el listener para el botón de creación de producto.
 *
 * Al hacer clic en el botón con ID 'create-product-btn', esta función:
 *  - Previene el comportamiento por defecto del formulario de nuevo producto (ID 'new-product-form').
 *  - Obtiene los datos ingresados en el formulario de nuevo producto.
 *  - Si los datos son válidos, agrega una nueva tarjeta de producto al contenedor con ID 'available-products' en el DOM.
 *  - Si el formulario o el botón no existen, muestra advertencias en la consola.
 *
 * Esta función depende de:
 *  - getNewProductFormData: para obtener los datos del formulario con ID 'new-product-form'.
 *  - addProductCardToDOM: para agregar la tarjeta al contenedor con ID 'available-products'.
 *
 * No retorna ningún valor.
 */
function handleCreateProductBtnListener() {
  const createProductBtn = document.getElementById("create-product-btn");
  if (!createProductBtn) {
    console.warn(`Advertencia: El elemento con ID 'create-product-btn' no existe`);
    return;
  }

  createProductBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const productData = getNewProductFormData();

    if (!productData) {
      showModalError("Introduce todos los valores para el producto.");
      return;
    }

    removeModalError();
    addProductCardToDOM(productData);
  });
}

// Elimina el mensaje de error si el modal se cierra
const newProductModal = document.getElementById("newProductModal");
if (newProductModal) {
  newProductModal.addEventListener("hidden.bs.modal", () => {
    removeModalError();
  });
}

export { handleCreateProductBtnListener };
