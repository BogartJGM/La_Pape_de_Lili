import { createProductCardElement } from "../components/createProductCard.js";

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
      console.warn("Advertencia: No se pudieron obtener los datos del formulario del nuevo producto.");
      return;
    }

    addProductCardToDOM(productData);
  });
}

/**
 * Obtiene y retorna los datos ingresados en el formulario de nuevo producto.
 *
 * Busca el formulario con ID 'new-product-form' en el DOM y extrae los valores de los campos:
 *  - Nombre del producto (#product-name)
 *  - Nombre y precio de la calidad económica (#eco-name, #eco-price)
 *  - Nombre y precio de la calidad alta (#high-name, #high-price)
 *
 * Si el formulario no existe, muestra una advertencia en la consola y retorna null.
 * Tras obtener los datos, reinicia el formulario para limpiar los campos.
 *
 * @typedef {Object} ProductData
 * @property {string} productName Nombre del producto.
 * @property {string} economicQualityName Nombre de la calidad económica.
 * @property {number|string} economicQualityPrice Precio de la calidad económica.
 * @property {string} highQualityName Nombre de la calidad alta.
 * @property {number|string} highQualityPrice Precio de la calidad alta.
 *
 * @returns {ProductData|null} Objeto con los datos del producto o null si el formulario no existe.
 */
function getNewProductFormData() {
  const form = document.getElementById("new-product-form");
  if (!form) {
    console.warn(`Advertencia: El elemento con ID 'new-product-form' no existe`);
    return null;
  }

  const productData = {
    productName: form.querySelector("#product-name").value,
    economicQualityName: form.querySelector("#eco-name").value,
    economicQualityPrice: Number(form.querySelector("#eco-price").value),
    highQualityName: form.querySelector("#high-name").value,
    highQualityPrice: Number(form.querySelector("#high-price").value),
  };

  form.reset();

  return productData;
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
    container.appendChild(productNode);
  }
}

export { handleCreateProductBtnListener };
