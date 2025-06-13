import "https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js";

export function initSortable() {
  new Sortable(document.getElementById("products-body"), {
    animation: 150,
    handle: "td:first-child",
  });
}
