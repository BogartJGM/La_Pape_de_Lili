import { handleCreateProductBtnListener } from "./listeners/handleCreateProduc.js";
import { magic } from "./debug/magic.js";
import { initSortable } from "./helpers/initSortable.js";

function main() {
  handleCreateProductBtnListener();
  magic();
  initSortable();
}

main();
