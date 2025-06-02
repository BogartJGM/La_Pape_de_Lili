import { handleCreateProductBtnListener } from "./listeners/handleCreateProduc.js";
import { magic } from "./debug/magic.js";
import { initSortable } from "./helpers/initSortable.js";
import { handleDiscountChangeListener } from "./listeners/handleDiscountChange.js";

function main() {
  handleCreateProductBtnListener();
  magic();
  initSortable();
  handleDiscountChangeListener(); // <-- Agrega aquí la inicialización
}

main();
