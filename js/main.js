import { handleCreateProductBtnListener } from "./listeners/handleCreateProduct.js";
import { magic } from "./debug/magic.js";
import { initSortable } from "./helpers/initSortable.js";
import { handleDiscountChangeListener } from "./listeners/handleDiscountChange.js";
import { handleProductSearchListener } from "./listeners/handleProductSearch.js";
import { loadAvailableProductsFromStorage } from "./helpers/loadAvailableProducts.js";
import { handleCreateProductFromExcel } from "./listeners/handleCreateProductsFromExcel.js";
import { handleDownloadProductsBtnListener } from "./listeners/handleDownloadProducts.js";
import { handleDownloadQuotationExcel } from "./listeners/handleDownloadQuotationExcel.js";
import { handleImportQuotationFromExcel } from "./listeners/handleImportQuotationFromExcel.js";
import { handleToggleAsideBtnListener } from "./listeners/handleToggleAside.js";
import { handleQuotationDatesListener } from "./listeners/handleQuotationDates.js";
import { disableAltKeyGlobally } from "./helpers/disableAltKey.js";
import { initFocus } from "./helpers/focusHelpers.js";
import { textareaAutosize } from "./helpers/textareaAutosize.js";

function main() {
  handleCreateProductBtnListener();
  // magic();
  initSortable();
  handleDiscountChangeListener();
  handleProductSearchListener();
  loadAvailableProductsFromStorage();
  handleCreateProductFromExcel();
  handleDownloadProductsBtnListener();
  handleDownloadQuotationExcel();
  handleImportQuotationFromExcel();
  handleToggleAsideBtnListener();
  handleQuotationDatesListener();
  disableAltKeyGlobally();
  initFocus();
  textareaAutosize();
}

main();
