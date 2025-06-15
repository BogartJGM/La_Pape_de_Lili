/**
 * Listener para mostrar/ocultar el aside y expandir el main con transición fluida.
 * También mueve el botón de toggle sincronizadamente.
 */
export function handleToggleAsideBtnListener() {
  const toggleBtn = document.getElementById("toggle-aside-btn");
  const main = document.querySelector("main.col-9, main.col-12");
  const aside = document.querySelector("aside.col-3");
  const icon = toggleBtn.querySelector("i");

  if (!toggleBtn || !main || !aside || !icon) return;

  let asideVisible = true;

  toggleBtn.addEventListener("click", () => {
    if (asideVisible) {
      // Ocultar aside y expandir main al mismo tiempo
      aside.classList.add("aside-hidden");
      main.classList.remove("col-9");
      main.classList.add("col-12");
      toggleBtn.style.left = "calc(100% - 18px)";
      icon.classList.remove("bi-chevron-right");
      icon.classList.add("bi-chevron-left");
      asideVisible = false;
    } else {
      // Mostrar aside y retraer main al mismo tiempo
      aside.classList.remove("aside-hidden");
      main.classList.remove("col-12");
      main.classList.add("col-9");
      toggleBtn.style.left = "calc(75% - 18px)";
      icon.classList.remove("bi-chevron-left");
      icon.classList.add("bi-chevron-right");
      asideVisible = true;
    }
  });
}