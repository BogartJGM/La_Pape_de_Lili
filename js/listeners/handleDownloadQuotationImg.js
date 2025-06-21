export function handleDownloadQuotationImg() {
  const imgLetterheadSrc = "../../assets/letterhead.png";
  const downloadImgBtn = document.getElementById("download-img-btn");

  downloadImgBtn.addEventListener("click", () => {
    const rows = document.querySelectorAll("#products-body tr");
    const products = Array.from(rows).map((tr) => {
      const { ref, ...rest } = tr.dataset;
      return rest;
    });
    

    // Crea el contenedor para la imagen
    const container = document.createElement("div");
    container.style.background = "#fff";
    container.style.padding = "20px";
    container.style.width = "900px";

    // Imagen de encabezado
    const img = document.createElement("img");
    img.src = imgLetterheadSrc;
    img.style.width = "100%";
    img.style.marginBottom = "20px";
    container.appendChild(img);

    // Tabla
    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    // Encabezados de tabla
    const headers = ["Cantidad", "Producto", "Marca Económica", "Precio Económica", "Total Económica", "Marca Premium", "Precio Premium", "Total Premium"];
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    headers.forEach((h) => {
      const th = document.createElement("th");
      th.textContent = h;
      th.style.border = "1px solid #000";
      th.style.padding = "4px";
      th.style.background = "#eee";
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);

    // Filas de datos
    const tbody = document.createElement("tbody");
    products.forEach((item) => {
      const tr = document.createElement("tr");
      [item.quantity, item.productName, item.brandEcon, item.priceEcon, item.amountEcon, item.brandhigh, item.priceHigh, item.amountHigh].forEach((val) => {
        const td = document.createElement("td");
        td.textContent = val;
        td.style.border = "1px solid #000";
        td.style.padding = "4px";
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    container.appendChild(table);

    // Oculta el contenedor fuera de pantalla
    container.style.position = "absolute";
    container.style.left = "-9999px";
    document.body.appendChild(container);

    // Usa html2canvas para convertir el contenedor en imagen y descargarla
    html2canvas(container).then((canvas) => {
      const link = document.createElement("a");
      link.download = "cotizacion.png";
      link.href = canvas.toDataURL();
      link.click();
      document.body.removeChild(container);
    });
  });
}
