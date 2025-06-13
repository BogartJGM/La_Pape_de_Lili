import { fakerES as faker } from "https://cdn.jsdelivr.net/npm/@faker-js/faker@8.4.1/+esm"; // Usar faker en español

export function magic() {
  document.getElementById("create-product-btn").addEventListener("click", function (e) {
    e.preventDefault();

    // Genera datos falsos directamente en español
    const productName = faker.commerce.productName();
    const ecoName = faker.company.name().split(" ")[0];
    const ecoPrice = faker.commerce.price({ min: 10, max: 20, dec: 2 });
    const highName = faker.company.name().split(" ")[0];
    const highPrice = faker.commerce.price({ min: 18, max: 30, dec: 2 });

    // Asigna los valores a los campos del formulario
    document.getElementById("product-name").value = productName;
    document.getElementById("eco-name").value = ecoName;
    document.getElementById("eco-price").value = ecoPrice;
    document.getElementById("high-name").value = highName;
    document.getElementById("high-price").value = highPrice;

    // Dispara eventos de input para cada campo
    document.getElementById("product-name").dispatchEvent(new Event('input'));
    document.getElementById("eco-name").dispatchEvent(new Event('input'));
    document.getElementById("eco-price").dispatchEvent(new Event('input'));
    document.getElementById("high-name").dispatchEvent(new Event('input'));
    document.getElementById("high-price").dispatchEvent(new Event('input'));
  });

  window.addEventListener("keydown", function (event) {
    if (event.key === ".") {
      document.getElementById("create-product-btn").click();
    } else if (event.key === ",") {
      document.querySelectorAll("button[title='Agregar']")[1]?.click();
    }
  });
}
