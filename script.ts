document.addEventListener("DOMContentLoaded", function () {
  const itemInput = document.querySelector(".itemInput") as HTMLInputElement;
  const addItemBtn = document.querySelector(".addItemBtn") as HTMLButtonElement;
  const itemList = document.querySelector(".itemList") as HTMLUListElement;
  const items = JSON.parse(localStorage.getItem("items") || '""');

  if (items) {
    items.forEach((item: string) => {
      addItem(item);
    });
  }

  addItemBtn.addEventListener("click", function () {
    const newItemText = itemInput.value.trim();
    if (newItemText !== "") {
      addItem(newItemText);
      itemInput.value = "";
      itemInput.style.borderColor = "";
    } else {
      itemInput.style.borderColor = "red";
    }
  });

  function addItem(text: string) {
    const li = document.createElement("li");
    li.className = "item";
    const p = document.createElement("p");
    p.className = "item-text";
    p.textContent = text;
    itemList.appendChild(li);
    li.appendChild(p);
    const removeBtn = document.createElement("button");
    removeBtn.className = "item-button";
    removeBtn.textContent = "✖";
    removeBtn.addEventListener("click", function () {
      itemList.removeChild(li);
      updateLocalStorage();
    });

    li.appendChild(removeBtn);
    updateLocalStorage();
  }

  function updateLocalStorage() {
    const itemsEl = document.querySelectorAll("p");
    const items: string[] = [];

    itemsEl.forEach((itemEl) => {
      items.push(itemEl.innerText);
    });
    localStorage.setItem("items", JSON.stringify(items));
  }
});
