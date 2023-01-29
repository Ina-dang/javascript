// Leave the next line, the form must be assigned to a variable named 'form' in order for the exercise test to pass
const form = document.querySelector("form");
const list = document.querySelector("#list");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const product = form.elements.product;
  const qtyInput = form.elements.qty;
  addItem(product.value, qtyInput.value);
  product.value = "";
  qtyInput.value = "";
});

const addItem = function (product, qtyInput) {
  const newItem = document.createElement("li");
  list.append(newItem);
  newItem.innerText = `${qtyInput} ${product}`;
};
