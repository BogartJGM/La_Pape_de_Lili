export function initSortable() {
  new Sortable(document.getElementById("products-body"), {
    animation: 150,
    handle: "td:first-child",
  });
}
