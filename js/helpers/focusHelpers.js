export function initFocus() {
  // Focus input de accordion personal data
  const personalCollapse = document.getElementById("collapse-personal-data");
  personalCollapse.addEventListener("shown.bs.collapse", () => {
    const firstInput = personalCollapse.querySelector("#client-name");
    if (firstInput) firstInput.focus();
  });

  // Focus input product name
  const newProductModal = document.getElementById("new-product-modal");
  newProductModal.addEventListener("shown.bs.modal", () => {
    document.getElementById("product-name").focus();
  });

  const discountModal = document.getElementById("discount-modal");
  discountModal.addEventListener("shown.bs.modal", () => {
    const firstInput = discountModal.querySelector("#discount-input");
    if (firstInput) firstInput.focus();
  });

  const changeQntyModal = document.getElementById("change-qnty-modal");
  changeQntyModal.addEventListener("shown.bs.modal", () => {
    const firstInput = changeQntyModal.querySelector("#change-qnty-input");
    if (firstInput) firstInput.focus();
  });
}
  