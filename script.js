document.addEventListener("DOMContentLoaded", function () {
    var itemInput = document.querySelector(".itemInput");
    var addItemBtn = document.querySelector(".addItemBtn");
    var itemList = document.querySelector(".itemList");
    var items = JSON.parse(localStorage.getItem("items") || '""');
    if (items) {
        items.forEach(function (item) {
            addItem(item);
        });
    }
    addItemBtn.addEventListener("click", function () {
        var newItemText = itemInput.value.trim();
        if (newItemText !== "") {
            addItem(newItemText);
            itemInput.value = "";
            itemInput.style.borderColor = "";
        }
        else {
            itemInput.style.borderColor = "red";
        }
    });
    function addItem(text) {
        var li = document.createElement("li");
        li.className = "item";
        var p = document.createElement("p");
        p.className = "item-text";
        p.textContent = text;
        itemList.appendChild(li);
        li.appendChild(p);
        var removeBtn = document.createElement("button");
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
        var itemsEl = document.querySelectorAll("p");
        var items = [];
        itemsEl.forEach(function (itemEl) {
            items.push(itemEl.innerText);
        });
        localStorage.setItem("items", JSON.stringify(items));
    }
});
