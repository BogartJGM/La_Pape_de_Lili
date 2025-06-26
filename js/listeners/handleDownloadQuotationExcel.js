export function handleDownloadQuotationExcel() {
  const btnDownloadExcel = document.querySelector("#download-excel-btn");
  if (!btnDownloadExcel) return;

  btnDownloadExcel.addEventListener("click", function (e) {
    // Validación de campos requeridos en el formulario de datos personales
    const form = document.getElementById('personal-data-form');
    if (form) {
      const requiredInputs = form.querySelectorAll('input[required]');
      let allFilled = true;
      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          allFilled = false;
        }
      });
      if (!allFilled) {
        // Solo abre el accordion si está cerrado
        const collapseEl = document.getElementById('collapse-personal-data');
        if (!collapseEl.classList.contains('show')) {
          new bootstrap.Collapse(collapseEl, { show: true });
          document.querySelector('[data-bs-target="#collapse-personal-data"]').classList.remove('collapsed');
        }
        // Coloca el focus en el input client-name
        const clientNameInput = document.getElementById('client-name');
        if (clientNameInput) {
          setTimeout(() => clientNameInput.focus(), 350); // Espera a que termine la animación
        }
        e.preventDefault();
        return false;
      }
    }

    // Selecciona todas las filas de productos
    const rows = document.querySelectorAll('tr[data-ref="selected-product-row"]');
    if (rows.length === 0) {
      alert("No hay productos seleccionados para descargar.");
      return;
    }

    // Encabezados para el Excel
    const headers = [
      "Cantidad",
      "Nombre Producto",
      "Calidad Económica",
      "Precio Económica",
      "Importe Económica",
      "Económica Seleccionada",
      "Calidad Alta",
      "Precio Alta",
      "Importe Alta",
      "Alta Seleccionada"
    ];

    // Construye los datos de cada fila
    const data = [headers];
    rows.forEach(row => {
      const ds = row.dataset;
      data.push([
        ds.quantity || "",
        ds.productName || "",
        ds.brandEcon || "",
        ds.priceEcon || "",
        ds.amountEcon || "",
        ds.econCheckboxChecked || "",
        ds.brandHigh || "",
        ds.priceHigh || "",
        ds.amountHigh || "",
        ds.highCheckboxChecked || ""
      ]);
    });

    // Crea la hoja y ajusta el ancho de columnas
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    worksheet['!cols'] = headers.map((h, i) => ({
      wch: Math.max(
        h.length,
        ...data.slice(1).map(row => String(row[i] || "").length)
      ) + 2
    }));

    // Obtiene los valores de los campos para el nombre del archivo y para la hoja de datos
    const nombre = document.getElementById('client-name')?.value.trim() || "";
    const escuela = document.getElementById('school-name')?.value.trim() || "";
    const fechaInicio = document.getElementById('quotation-starting-date')?.value.trim() || "";
    const fechaFin = document.getElementById('quotation-end-date')?.value.trim() || "";
    const notas = document.getElementById('notes-field')?.value.trim() || "";

    // Hoja de datos adicionales
    const datos = [
      ["Campo", "Valor"],
      ["Nombre del cliente", nombre],
      ["Nombre de la escuela", escuela],
      ["Fecha de inicio", fechaInicio],
      ["Fecha de fin", fechaFin],
      ["Notas", notas]
    ];
    const datosSheet = XLSX.utils.aoa_to_sheet(datos);

    // Crea el libro y ajusta el ancho de columnas
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cotización");
    XLSX.utils.book_append_sheet(workbook, datosSheet, "Datos");

    const nombreArchivo = `${nombre} - ${escuela}.xlsx`;

    XLSX.writeFile(workbook, nombreArchivo);
  });
}
