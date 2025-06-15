import { createSelectedProductRow } from "../components/createSelectedProductRow.js";
import { resetTotals, updateTotals } from "../helpers/updateTotals.js";

/**
 * Listener para importar productos seleccionados desde un archivo Excel.
 * Agrega filas a #products-body y actualiza los totales.
 * También restaura los datos generales si existen.
 */
export function handleImportQuotationFromExcel() {
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

      // --- Restaurar datos generales si existe la hoja "Datos" ---
      const datosSheet = workbook.Sheets["Datos"];
      if (datosSheet) {
        const datos = XLSX.utils.sheet_to_json(datosSheet, { header: 1 });
        // Buscar los valores por nombre de campo
        const getValue = (campo) => {
          const row = datos.find(r => r[0] === campo);
          return row ? row[1] : "";
        };
        document.getElementById("client-name").value = getValue("Nombre del cliente");
        document.getElementById("school-name").value = getValue("Nombre de la escuela");
        document.getElementById("quotation-starting-date").value = getValue("Fecha de inicio");
        document.getElementById("quotation-end-date").value = getValue("Fecha de fin");
        document.getElementById("notes-field").value = getValue("Notas");
      }

      // --- Importar productos desde la hoja principal ---
      const firstSheetName = workbook.SheetNames.find(name => name !== "Datos");
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Eliminar productos seleccionados existentes antes de importar
      const productsBody = document.getElementById("products-body");
      if (productsBody) {
        productsBody.innerHTML = "";
      }

      // Limpiar los totales antes de importar los nuevos datos
      resetTotals();

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
        productsBody.appendChild(rowEl);

        // Sumar a los totales
        totalEco += productData.economicQualityPrice * productData.quantity;
        totalHigh += productData.highQualityPrice * productData.quantity;
      });

      // Actualizar los totales
      updateTotals(totalEco, totalHigh);

      // Abrir el accordion de datos personales de forma fluida (usando Bootstrap Collapse)
      const collapseEl = document.getElementById('collapse-personal-data');
      if (collapseEl && !collapseEl.classList.contains('show')) {
        new bootstrap.Collapse(collapseEl, { show: true });
        const trigger = document.querySelector('[data-bs-target="#collapse-personal-data"]');
        if (trigger) {
          trigger.classList.remove('collapsed');
        }
      }
    };
    reader.readAsArrayBuffer(file);
  });
}
