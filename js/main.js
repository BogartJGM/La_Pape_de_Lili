import { handleCreateProductBtnListener } from "./listeners/handleCreateProduc.js";
import { magic } from "./debug/magic.js";
import { initSortable } from "./helpers/initSortable.js";
import { handleDiscountChangeListener } from "./listeners/handleDiscountChange.js";
import { handleProductSearchListener } from "./listeners/handleProductSearch.js";

function main() {
  handleCreateProductBtnListener();
  magic();
  initSortable();
  handleDiscountChangeListener();
  handleProductSearchListener(); 
}

main();
