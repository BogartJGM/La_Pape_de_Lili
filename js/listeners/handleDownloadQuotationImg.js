export function handleDownloadQuotationImg() {
  const imgLetterheadSrc = "assets/letterhead.png";
  const downloadImgBtn = document.getElementById("download-img-btn");

  downloadImgBtn.addEventListener("click", () => {
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
    
    const quotationData = {
      clientName: document.getElementById("client-name").value,
      schoolName: document.getElementById("school-name").value,
      quotationStartingDate: document.getElementById("quotation-starting-date").value,
      quotationEndingDate: document.getElementById("quotation-end-date").value,
      totalCostHigh: redondeo(Number(document.getElementById("total-cost-high").dataset.totalCostHigh)),
      totalCostEconomical: redondeo(Number(document.getElementById("total-cost-economical").dataset.totalCostEco)),
      depositHigh: redondeo(Number(document.getElementById("deposit-high").dataset.depositHigh)),
      depositEconomical: redondeo(Number(document.getElementById("deposit-economical").dataset.depositEconomical)),
      discountedTotalHigh: redondeo(Number(document.getElementById("discounted-total-high").dataset.discountedTotalHigh)),
      discountedTotalEconomical: redondeo(Number(document.getElementById("discounted-total-economical").dataset.discountedTotalEco)),
      notesField: document.getElementById("notes-field").value,
    };

    const rows = document.querySelectorAll("#products-body tr");
    const products = Array.from(rows).map((tr) => {
      const { ref, ...rest } = tr.dataset;
      return rest;
    });

    // Genera las filas de productos en formato HTML
    const productsRowsHtml = products
      .map(
        (item) => `
      <tr class="product">
        <td class="text-center">${item.quantity || ""}</td>
        <td></td>
        <td style="padding-left: 5px;">${item.productName || ""}</td>
        <td></td>
        <td style="padding-left: 8px;">${item.brandHigh || ""}</td>
        <td class="text-right">${item.priceHigh || ""}</td>
        <td class="text-right" style="border-right: 2px dotted black">${item.amountHigh || ""}</td>
        <td></td>
        <td style="padding-left: 8px;">${item.brandEcon || ""}</td>
        <td class="text-right">${item.priceEcon || ""}</td>
        <td class="text-right">${item.amountEcon || ""}</td>
      </tr>
    `
      )
      .join("");

    // Plantilla HTML con los datos insertados
    const templateHtml = `
      <div style="all: initial; display: initial;">
        <div id="container" style="background: #fff; padding: 20px; width: 900px;">
          <img class="letterhead" src="${imgLetterheadSrc}" alt="Membrete de la empresa" style="width:100%;margin-bottom:20px;" />
          <table class="client-data-table default-gray r2">
            <tr>
              <td>
                <span>Cliente:</span> <span>${quotationData.clientName}</span>
              </td>
              <td>
                <span>Cotizado el:</span> <span>${quotationData.quotationStartingDate}</span>
              </td>
              <td rowspan="2">
                DESPUÉS DE ESTA FECHA LOS PRECIOS<br />
                COTIZADOS ESTÁN SUJETOS A CAMBIOS
              </td>
            </tr>
            <tr>
              <td>
                <span> Escuela:</span> <span>${quotationData.schoolName}</span>
              </td>
              <td>
                <span> Válido al:</span> <span>${quotationData.quotationEndingDate}</span>
              </td>
            </tr>
          </table>
          <br />
          <table class="products-table">
            <thead>
              <tr>
                <th class="quantity-style"></th>
                <th></th>
                <th></th>
                <th></th>
                <th class="quality-header q-high-color r2" colspan="3">CALIDAD ALTA</th>
                <th></th>
                <th class="quality-header q-eco-color r2" colspan="3">CALIDAD ECONÓMICA</th>
              </tr>
              <tr>
                <td style="height: 6px" colspan="11"></td>
              </tr>
              <tr>
                <th class="product-details default-gray r2"></th>
                <th></th>
                <th class="product-details default-gray r2">PRODUCTO</th>
                <th></th>
                <th class="product-details default-gray r2 left-r">MARCA</th>
                <th class="product-details default-gray r2 middle-r">PRECIO</th>
                <th class="product-details default-gray r2 right-r">IMPORTE</th>
                <th></th>
                <th class="product-details default-gray r2 left-r">MARCA</th>
                <th class="product-details default-gray r2 middle-r">PRECIO</th>
                <th class="product-details default-gray r2 right-r">IMPORTE</th>
              </tr>
            </thead>
            <tbody class="product-container">
              ${productsRowsHtml}
            </tbody>
          </table>
          <br />
          <table class="prices-table">
            <tr class="default-gray r2">
              <th class="price-concept">TOTAL</th>
              <td class="price-value" style="padding-right: 50px;">$${quotationData.totalCostHigh}</td>
              <td class="price-value" style="width: 245px; padding-right: 30px;">$${quotationData.totalCostEconomical}</td>
            </tr>
            <tr></tr>
            <tr class="default-gray r2">
              <th class="price-concept discount">PRECIO CON DESCUENTO</th>
              <td class="price-value discount" style="padding-right: 50px;">$${quotationData.discountedTotalHigh}</td>
              <td class="price-value discount" style="padding-right: 30px;">$${quotationData.discountedTotalEconomical}</td>
            </tr>
            <tr></tr>
            <tr class="default-gray r2">
              <th class="price-concept">PUEDES APARTAR CON</th>
              <td class="price-value" style="padding-right: 50px;">$${quotationData.depositHigh}</td>
              <td class="price-value" style="padding-right: 30px;">$${quotationData.depositEconomical}</td>
            </tr>
          </table>
          <br />
          <table class="notes-table default-gray r2">
            <tr>
              <td style="width: 10%;">NOTAS</td>
              <td style="white-space: pre-line;">${quotationData.notesField}</td>
            </tr>
          </table>
        </div>
      </div>
    `;

    // Crea el contenedor y le inserta la plantilla
    const container = document.createElement("div");
    container.innerHTML = templateHtml;

    // Oculta el contenedor fuera de pantalla
    container.style.position = "absolute";
    container.style.left = "-9999px";
    document.body.appendChild(container);

    // Usa html2canvas para convertir el contenedor en imagen y descargarla
    // Configuración de html2canvas para calidad más alta
    const containerElement = container.querySelector("#container");
    html2canvas(containerElement, { scale: 1.5 }).then((canvas) => {
      const link = document.createElement("a");

      let nombreArchivo = "";
      if (quotationData.schoolName) {
        nombreArchivo = `${quotationData.clientName} - ${quotationData.schoolName}`;
      } else {
        nombreArchivo = `${quotationData.clientName}`;
      }

      link.download = `${nombreArchivo}.png`;
      link.href = canvas.toDataURL();
      link.click();
      document.body.removeChild(container);
    });
  });
}

function redondeo(valor) {
  // Validación: si es exactamente 0, devolvemos 0
  if (valor === 0) {
    return 0;
  }

  // Validación adicional: debe ser un número
  if (typeof valor !== "number" || isNaN(valor)) {
    throw new TypeError("El valor debe ser un número válido");
  }

  const entero = Math.floor(valor);
  // escalamos el decimal a centésimas y lo redondeamos a entero
  const decimalCent = Math.round((valor - entero + Number.EPSILON) * 100);

  if (decimalCent <= 20) {
    // hasta 0.20 → redondea hacia abajo
    return entero;
  } else if (decimalCent < 80) {
    // de 0.21 hasta 0.79 → .5
    return entero + 0.5;
  } else {
    // 0.80 en adelante → siguiente entero
    return entero + 1;
  }
}
