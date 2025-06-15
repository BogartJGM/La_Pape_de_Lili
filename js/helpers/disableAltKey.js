/**
 * Previene el comportamiento predeterminado de la tecla Alt
 * en todo el documento, excepto donde se haya redefinido.
 */
export function disableAltKeyGlobally() {
  document.addEventListener("keydown", function (e) {
    // Si la tecla es Alt y no está redefinida en el target
    // (Puedes personalizar este selector si tienes excepciones)
    const isAlt = e.key === "Alt";
    const hasCustomAlt = e.target?.hasAttribute?.("data-allow-alt");
    if (isAlt && !hasCustomAlt) {
      e.preventDefault();
      // Opcional: e.stopPropagation();
    }
  }, true);
}