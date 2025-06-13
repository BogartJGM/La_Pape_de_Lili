export function handleDownloadProductsBtnListener() {
    const downloadFileBtn = document.getElementById("download-file-btn");
    if (!downloadFileBtn) {
        console.warn(`Advertencia: El elemento con ID 'download-file-btn' no existe`);
        return;
    }

    downloadFileBtn.addEventListener("click", () => {
        const key = "availableProducts";
        const products = JSON.parse(localStorage.getItem(key)) || [];
        if (products.length === 0) {
            console.warn("Advertencia: No hay productos para descargar.");
            return;
        }

        // Opcional: encabezados para el archivo Excel
        const worksheetData = [
            ["Nombre Producto", "Calidad Económica", "Precio Económica", "Calidad Alta", "Precio Alta"],
            ...products.map(product => [
                product.productName,
                product.economicQualityName,
                product.economicQualityPrice,
                product.highQualityName,
                product.highQualityPrice
            ])
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        // Calcular el ancho máximo de cada columna
        const colWidths = worksheetData[0].map((_, colIdx) => {
            return {
                wch: Math.max(
                    ...worksheetData.map(row => {
                        // Convertir a string y medir longitud
                        const cell = row[colIdx] != null ? String(row[colIdx]) : "";
                        return cell.length;
                    })
                ) + 2 // +2 para un poco de espacio extra
            };
        });
        worksheet['!cols'] = colWidths;

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");

        // Generar archivo y descargar
        XLSX.writeFile(workbook, "productos.xlsx");
    });
}