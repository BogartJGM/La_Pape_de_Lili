import { handleCreateProductBtnListener } from "./listeners/handleCreateProduc.js";
import { magic } from "./debug/magic.js";
import { initSortable } from "./helpers/initSortable.js";
import { handleDiscountChangeListener } from "./listeners/handleDiscountChange.js";
import { handleProductSearchListener } from "./listeners/handleProductSearch.js";
import { loadAvailableProductsFromStorage } from "./helpers/loadAvailableProducts.js";

function main() {
  handleCreateProductBtnListener();
  magic();
  initSortable();
  handleDiscountChangeListener();
  handleProductSearchListener();
  loadAvailableProductsFromStorage();
}

main();
