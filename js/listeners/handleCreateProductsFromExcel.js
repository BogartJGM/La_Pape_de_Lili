import { createProductCardElement } from "../components/createProductCard.js";

/**
 * Añade una tarjeta de producto al DOM y la guarda en localStorage.
 * @param {Object} productData
 */
function addProductCardToDOMAndStorage(productData) {
  // Añadir al DOM
  const container = document.getElementById("available-products");
  const productNode = createProductCardElement(productData);
  if (container && productNode) {
    container.appendChild(productNode);
  }
  // Guardar en localStorage
  const key = "availableProducts";
  const products = JSON.parse(localStorage.getItem(key)) || [];
  products.push(productData);
  localStorage.setItem(key, JSON.stringify(products));
}

/**
 * Inicializa el listener para el botón de subir archivo Excel.
 * Al seleccionar un archivo, imprime los datos en consola y los añade al DOM y localStorage.
 */
export function handleCreateProductFromExcel() {
  const uploadBtn = document.getElementById("upload-file-btn");
  if (!uploadBtn) return;

  // Crear input file oculto si no existe
  let fileInput = document.getElementById("hidden-excel-input");
  if (!fileInput) {
    fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".xlsx,.xls,.csv";
    fileInput.style.display = "none";
    fileInput.id = "hidden-excel-input";
    document.body.appendChild(fileInput);
  }

  uploadBtn.addEventListener("click", () => {
    fileInput.value = ""; // Permitir volver a seleccionar el mismo archivo
    fileInput.click();
  });

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      // Tomar la primera hoja
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });


      // Vaciar el contenedor de productos antes de añadir nuevos y eliminar datos de localStorage
      const container = document.getElementById("available-products");
      if (container) {
        container.innerHTML = "";
      }
      localStorage.removeItem("availableProducts");

      // Procesar jsonData para crear productos
      jsonData.forEach((row, index) => {
        if (index === 0) return; // Saltar encabezado
        const productData = {
          productName: row[0] || "",
          economicQualityName: row[1] || "",
          economicQualityPrice: Number(row[2]) || 0,
          highQualityName: row[3] || "",
          highQualityPrice: Number(row[4]) || 0,
        };
        addProductCardToDOMAndStorage(productData);
      });
    };
    reader.readAsArrayBuffer(file);
  });
}
