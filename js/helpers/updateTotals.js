export function updateTotals(economicalToAdd, highToAdd) {
  const discountButton = document.getElementById("discount-button");
  const totalCostEconomicalElement = document.getElementById("total-cost-economical");
  const totalCostHighElement = document.getElementById("total-cost-high");
  const discountedTotalEconomicalElement = document.getElementById("discounted-total-economical");
  const discountedTotalHighElement = document.getElementById("discounted-total-high");
  const depositEconomicalElement = document.getElementById("deposit-economical");
  const depositHighElement = document.getElementById("deposit-high");

  // Leer los valores actuales desde los datasets
  let economicalTotal = Number(totalCostEconomicalElement.dataset.totalCostEco) || 0;
  let highTotal = Number(totalCostHighElement.dataset.totalCostHigh) || 0;

  // Sumar los nuevos valores
  economicalTotal += Number(economicalToAdd) || 0;
  highTotal += Number(highToAdd) || 0;

  // Actualizar los datasets
  totalCostEconomicalElement.dataset.totalCostEco = economicalTotal.toFixed(2);
  totalCostHighElement.dataset.totalCostHigh = highTotal.toFixed(2);

  // Actualizar el texto de los totales
  totalCostEconomicalElement.textContent = `$${economicalTotal.toFixed(2)}`;
  totalCostHighElement.textContent = `$${highTotal.toFixed(2)}`;

  // Calcular descuento
  const discount = Number(discountButton.dataset.discount) || 0;
  const discountedEconomical = economicalTotal - economicalTotal * (discount / 100);
  const discountedHigh = highTotal - highTotal * (discount / 100);

  // Actualizar los totales con descuento
  discountedTotalEconomicalElement.dataset.discountedTotalEco = discountedEconomical.toFixed(2);
  discountedTotalHighElement.dataset.discountedTotalHigh = discountedHigh.toFixed(2);
  discountedTotalEconomicalElement.textContent = `$${discountedEconomical.toFixed(2)}`;
  discountedTotalHighElement.textContent = `$${discountedHigh.toFixed(2)}`;

  // Calcular depósitos (20%)
  const depositPercentage = 0.2;
  const depositEco = discountedEconomical * depositPercentage;
  const depositHigh = discountedHigh * depositPercentage;

  depositEconomicalElement.dataset.depositEconomical = depositEco.toFixed(2);
  depositHighElement.dataset.depositHigh = depositHigh.toFixed(2);
  depositEconomicalElement.textContent = `$${depositEco.toFixed(2)}`;
  depositHighElement.textContent = `$${depositHigh.toFixed(2)}`;
}

/**
 * Resta los importes de un producto eliminado de los totales y actualiza los elementos del DOM.
 * @param {number} economicalToSubtract - Importe económico a restar.
 * @param {number} highToSubtract - Importe alta a restar.
 */
export function subtractFromTotals(economicalToSubtract, highToSubtract) {
  const discountButton = document.getElementById("discount-button");
  const totalCostEconomicalElement = document.getElementById("total-cost-economical");
  const totalCostHighElement = document.getElementById("total-cost-high");
  const discountedTotalEconomicalElement = document.getElementById("discounted-total-economical");
  const discountedTotalHighElement = document.getElementById("discounted-total-high");
  const depositEconomicalElement = document.getElementById("deposit-economical");
  const depositHighElement = document.getElementById("deposit-high");

  // Leer los valores actuales desde los datasets
  let economicalTotal = Number(totalCostEconomicalElement.dataset.totalCostEco) || 0;
  let highTotal = Number(totalCostHighElement.dataset.totalCostHigh) || 0;

  // Restar los valores
  economicalTotal -= Number(economicalToSubtract) || 0;
  highTotal -= Number(highToSubtract) || 0;

  // No permitir valores negativos
  economicalTotal = Math.max(0, economicalTotal);
  highTotal = Math.max(0, highTotal);

  // Actualizar los datasets
  totalCostEconomicalElement.dataset.totalCostEco = economicalTotal.toFixed(2);
  totalCostHighElement.dataset.totalCostHigh = highTotal.toFixed(2);

  // Actualizar el texto de los totales
  totalCostEconomicalElement.textContent = `$${economicalTotal.toFixed(2)}`;
  totalCostHighElement.textContent = `$${highTotal.toFixed(2)}`;

  // Calcular descuento
  const discount = Number(discountButton.dataset.discount) || 0;
  const discountedEconomical = economicalTotal - economicalTotal * (discount / 100);
  const discountedHigh = highTotal - highTotal * (discount / 100);

  // Actualizar los totales con descuento
  discountedTotalEconomicalElement.dataset.discountedTotalEco = discountedEconomical.toFixed(2);
  discountedTotalHighElement.dataset.discountedTotalHigh = discountedHigh.toFixed(2);
  discountedTotalEconomicalElement.textContent = `$${discountedEconomical.toFixed(2)}`;
  discountedTotalHighElement.textContent = `$${discountedHigh.toFixed(2)}`;

  // Calcular depósitos (20%)
  const depositPercentage = 0.2;
  const depositEco = discountedEconomical * depositPercentage;
  const depositHigh = discountedHigh * depositPercentage;

  depositEconomicalElement.dataset.depositEconomical = depositEco.toFixed(2);
  depositHighElement.dataset.depositHigh = depositHigh.toFixed(2);
  depositEconomicalElement.textContent = `$${depositEco.toFixed(2)}`;
  depositHighElement.textContent = `$${depositHigh.toFixed(2)}`;
}

/**
 * Actualiza los totales al cambiar la cantidad de un producto seleccionado.
 * Resta el importe anterior y suma el nuevo importe, luego actualiza los totales.
 * 
 * @param {number} prevEconAmount - Importe económico anterior.
 * @param {number} newEconAmount - Importe económico nuevo.
 * @param {number} prevHighAmount - Importe alta anterior.
 * @param {number} newHighAmount - Importe alta nuevo.
 */
export function updateTotalsOnQuantityChange(prevEconAmount, newEconAmount, prevHighAmount, newHighAmount) {
  // Primero restar los importes anteriores
  subtractFromTotals(prevEconAmount, prevHighAmount);
  // Luego sumar los nuevos importes
  updateTotals(newEconAmount, newHighAmount);
}
