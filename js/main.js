import { handleCreateProductBtnListener } from "./listeners/handleCreateProduct.js";
import { magic } from "./debug/magic.js";
import { initSortable } from "./helpers/initSortable.js";
import { handleDiscountChangeListener } from "./listeners/handleDiscountChange.js";
import { handleProductSearchListener } from "./listeners/handleProductSearch.js";
import { loadAvailableProductsFromStorage } from "./helpers/loadAvailableProducts.js";
import { handleCreateProductFromExcel } from "./listeners/handleCreateProductsFromExcel.js";
import { handleDownloadProductsBtnListener } from "./listeners/handleDownloadProducts.js";

function main() {
  handleCreateProductBtnListener();
  magic();
  initSortable();
  handleDiscountChangeListener();
  handleProductSearchListener();
  loadAvailableProductsFromStorage();
  handleCreateProductFromExcel();
  handleDownloadProductsBtnListener();
}

main();
