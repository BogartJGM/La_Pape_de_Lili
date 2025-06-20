export function initFocus() {
  // Focus input de accordion personal data
  const personalCollapse = document.getElementById("collapse-personal-data");
  personalCollapse.addEventListener("shown.bs.collapse", () => {
    const firstInput = personalCollapse.querySelector("#client-name");
    if (firstInput) firstInput.focus();
  });

  // Focus input product name
  const newProductModal = document.getElementById("newProductModal");
  newProductModal.addEventListener("shown.bs.modal", () => {
    document.getElementById("product-name").focus();
  });

}
  