"use strict";
// root input
let titleInput = document.querySelector("input.title");
let priceInput = document.querySelector("input.price");
let taxesInput = document.querySelector("input.taxes");
let adsInput = document.querySelector("input.ads");
let discountInput = document.querySelector("input.discount");
let countInput = document.querySelector("input.count");
let categoryInput = document.querySelector("input.category");
let searchInput = document.querySelector("input.search");
// button or text
let totalInput = document.querySelector("div.total");
let createInput = document.querySelector("input.create");
let searchByTitleInput = document.querySelector("input.by-title");
let searchByCateInput = document.querySelector("input.by-cate");
let deleteInput = document.querySelector("input.delete");
//table var
let table = document.querySelector("#data-read table");
//function for edit valid input
function validInput() {
    if (titleInput.value != "") {
        if (priceInput.value != "") {
            if (categoryInput.value != "") {
                addToLocalStorage();
                // createData();
            }
            else {
                categoryInput.style.border = "2px solid red";
            }
        }
        else {
            priceInput.style.border = "2px solid red";
        }
    }
    else {
        titleInput.style.border = "2px solid red";
    }
}
setInterval(() => {
    let total = +priceInput.value +
        +taxesInput.value +
        +adsInput.value -
        +discountInput.value;
    totalInput.innerHTML = `total:${total}`;
}, 100);
createInput.addEventListener("click", () => {
    validInput();
});
// function for add data to localStorage
let dataTable;
if (localStorage.data != null) {
    dataTable = JSON.parse(localStorage.data);
}
else {
    dataTable = [];
}
let idNum = 1;
function addToLocalStorage() {
    let newData = {
        title: titleInput.value,
        price: priceInput.value,
        tax: taxesInput.value,
        ads: adsInput.value,
        discount: discountInput.value,
        category: categoryInput.value,
        count: countInput.value,
    };
    console.log(newData.count);
    if (+newData.count > 1) {
        for (let i = 0; i < +newData.count; i++) {
            dataTable.push(newData);
            createData();
        }
    }
    else {
        console.log(newData.count);
    }
    // addToLocalStorage();
    // dataTable.push(newData);
    localStorage.setItem("data", JSON.stringify(dataTable));
    console.log(dataTable);
}
// localStorage.clear();
function createData() {
    let tr = document.createElement("tr");
    tr.innerHTML += `
  <td>${idNum}</td>
  <td>${titleInput.value}</td>
          <td>${priceInput.value}</td>
          <td>${taxesInput.value || "0"}</td>
          <td>${adsInput.value || "0"}</td>
          <td>${discountInput.value || "0"}</td>
          <td>${categoryInput.value}</td>
          <td class="delete"><i class="fa-solid fa-trash-can"></i></td>
          <td class="edit"><i class="fa-solid fa-pen-to-square"></i></td>
          `;
    table.appendChild(tr);
    idNum++;
}
function showData() {
    if (dataTable != null) {
        for (let i = 0; i < dataTable.length; i++) {
            table.innerHTML += `
      <td>${idNum}</td>
    <td>${dataTable[i].title}</td>
          <td>${dataTable[i].price}</td>
          <td>${dataTable[i].tax || "0"}</td>
          <td>${dataTable[i].ads || "0"}</td>
          <td>${dataTable[i].discount || "0"}</td>
          <td>${dataTable[i].category}</td>
          <td class="delete" onclick="deleteItem(${i})"><i class="fa-solid fa-trash-can"></i></td>
          <td class="edit"><i class="fa-solid fa-pen-to-square"></i></td>`;
            idNum = i + 2;
        }
    }
}
showData();
setInterval(() => {
    deleteInput.value = `delete all (${document.querySelectorAll("table tr").length - 1})`;
}, 100);
function deleteAll() {
    deleteInput.addEventListener("click", () => {
        table.innerHTML = `      <tr>
          <th>id</th>
          <th>title</th>
          <th>price</th>
          <th>taxes</th>
          <th>ads</th>
          <th>discount</th>
          <th>category</th>
          <th>delete</th>
          <th>Edit</th>
        </th>`;
        localStorage.clear();
    });
}
deleteAll();
function deleteItem(i) {
    dataTable.splice(i, 1);
    localStorage.data = JSON.stringify(dataTable);
    table.innerHTML = `      <tr>
          <th>id</th>
          <th>title</th>
          <th>price</th>
          <th>taxes</th>
          <th>ads</th>
          <th>discount</th>
          <th>category</th>
          <th>delete</th>
          <th>Edit</th>
        </th>`;
    showData();
}
