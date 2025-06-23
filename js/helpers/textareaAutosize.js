export function textareaAutosize() {
  document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("notes-field");

    // función que reajusta la altura
    function autoResize() {
      this.style.height = "auto"; // reset previo
      this.style.height = this.scrollHeight + "px"; // fijar al scrollHeight
    }

    // iniciar con el tamaño correcto (por si ya hay contenido)
    autoResize.call(textarea);

    // escuchar cambios
    textarea.addEventListener("input", autoResize);
  });
}