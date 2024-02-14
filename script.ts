document.addEventListener("DOMContentLoaded", function () {

  const itemInput = document.querySelector(".itemInput") as HTMLInputElement;
  const addItemBtn = document.querySelector(".addItemBtn") as HTMLButtonElement;
  const itemList = document.querySelector(".itemList") as HTMLUListElement;

  /* Парсим элементы из localStorage */

  const items = JSON.parse(localStorage.getItem("items") || '""');



  /*Если в localStorage есть массив элементов, выводим их */

  if (items) {
    items.forEach((item: string) => {
      addItem(item);
    });
  }


  /*Вешаем ивент на кнопку, если текст введен, обнуляем текст в инпуте и добавляем новый элемент в список, иначе меняем цвет границы инпута на красный */

  addItemBtn.addEventListener("click", function () {
    const newItemText = itemInput.value.trim();
    if (newItemText !== "") {
      addItem(newItemText);
      itemInput.value = "";
      itemInput.placeholder = "Введите текст";
      itemInput.style.borderColor = "";
    } else {
      itemInput.style.borderColor = "red";
      itemInput.placeholder = "Введите текст!";
    }
  });

  /* Добавляем li, в него добавляем p с текстом из инпута, добавляем стили для стилизации, вешаем ивент на кнопку удаления элемента, 
  обновляем localStorage в случае добавления и удаления элемента */

  function addItem(text: string) {
    const li = document.createElement("li");
    li.className = "item";
    const p = document.createElement("p");
    p.className = "item-text";
    p.textContent = text;
    itemList.appendChild(li);
    li.appendChild(p);

    const removeBtn = document.createElement("button");
    removeBtn.className = "delete-item-button";
    removeBtn.textContent = "✖";
    removeBtn.setAttribute("aria-label", "Удалить элемент");
    removeBtn.addEventListener("click", function () {
      itemList.removeChild(li);
      updateLocalStorage();
    });

    li.appendChild(removeBtn);
    updateLocalStorage();
  }

  /* Обновляем localStorage, выделяем текст всех элементов, пушим их в массив, сохраняем */

  function updateLocalStorage() {
    const itemsEl = document.querySelectorAll("p");
    const items: string[] = [];

    itemsEl.forEach((itemEl) => {
      items.push(itemEl.innerText);
    });
    localStorage.setItem("items", JSON.stringify(items));
  }
});
