import { createSelectedProductRow } from "../components/createSelectedProductRow.js";
import { updateTotals } from "../helpers/updateTotals.js";

/**
 * Listener para importar productos seleccionados desde un archivo Excel.
 * Agrega filas a #products-body y actualiza los totales.
 */
export function handleImportSelectedProductsFromExcel() {
  const importBtn = document.getElementById("import-excel-btn");
  if (!importBtn) return;

  // Crear input file oculto si no existe
  let fileInput = document.getElementById("hidden-import-selected-input");
  if (!fileInput) {
    fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".xlsx,.xls,.csv";
    fileInput.style.display = "none";
    fileInput.id = "hidden-import-selected-input";
    document.body.appendChild(fileInput);
  }

  importBtn.addEventListener("click", () => {
    fileInput.value = "";
    fileInput.click();
  });

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Asume que la primera fila es encabezado
      let totalEco = 0,
        totalHigh = 0;
      jsonData.forEach((row, index) => {
        if (index === 0) return; // Saltar encabezado

        // Mapear columnas según el orden de handleDownloadQuotationExcel.js
        const [quantity, productName, economicQualityName, economicQualityPrice, amountEcon, econCheckboxChecked, highQualityName, highQualityPrice, amountHigh, highCheckboxChecked] = row;

        // Validar datos mínimos
        if (!productName || !quantity) return;

        const productData = {
          quantity: Number(quantity) || 1,
          productName: productName || "",
          economicQualityName: economicQualityName || "",
          economicQualityPrice: Number(economicQualityPrice) || 0,
          highQualityName: highQualityName || "",
          highQualityPrice: Number(highQualityPrice) || 0,
          econCheckboxChecked: String(econCheckboxChecked).toLowerCase() === "true",
          highCheckboxChecked: String(highCheckboxChecked).toLowerCase() === "true",
        };

        // Crear y agregar la fila
        const rowEl = createSelectedProductRow(productData);
        document.getElementById("products-body").appendChild(rowEl);

        // Sumar a los totales
        totalEco += productData.economicQualityPrice * productData.quantity;
        totalHigh += productData.highQualityPrice * productData.quantity;
      });

      // Actualizar los totales
      updateTotals(totalEco, totalHigh);
    };
    reader.readAsArrayBuffer(file);
  });
}
