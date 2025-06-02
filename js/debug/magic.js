export function magic() {
  window.addEventListener("keydown", function (event) {
    if (event.key === ".") {
      document.getElementById("create-product-btn").click();
    } else if (event.key === ",") {
      document.querySelectorAll("button[title='Agregar']")[1].click();
    }
  });
}
