/**
 * Listener para manejar las fechas de inicio y fin de cotización.
 * - Cuando el input #quotation-starting-date cambia a una fecha válida, 
 *   actualiza #quotation-end-date sumando 20 días.
 * - Cuando se presiona el botón #today-button, pone la fecha de inicio como hoy (UTC-6)
 *   y la de fin como 20 días después.
 */
export function handleQuotationDatesListener() {
  const startInput = document.getElementById("quotation-starting-date");
  const endInput = document.getElementById("quotation-end-date");
  const todayBtn = document.getElementById("today-button");

  if (!startInput || !endInput) return;

  // Suma días a una fecha y retorna en formato yyyy-mm-dd
  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    // Ajustar a UTC-6 (CDMX) para la fecha de fin
    result.setHours(result.getHours() - (result.getTimezoneOffset() / 60) - 6);
    return result.toISOString().slice(0, 10);
  }

  // Cuando cambia la fecha de inicio
  startInput.addEventListener("change", () => {
    if (startInput.value) {
      endInput.value = addDays(startInput.value, 20);
    }
  });

  // Cuando se presiona el botón "Hoy"
  if (todayBtn) {
    todayBtn.addEventListener("click", () => {
      // Obtener hoy en UTC-6
      const now = new Date();
      // UTC-6: restar 6 horas a la hora UTC
      now.setUTCHours(now.getUTCHours() - 6, 0, 0, 0);
      const todayStr = now.toISOString().slice(0, 10);
      startInput.value = todayStr;
      endInput.value = addDays(todayStr, 20);
      // Disparar evento change por si hay otros listeners
      startInput.dispatchEvent(new Event("change"));
    });
  }
}