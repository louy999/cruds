// root input
let titleInput = document.querySelector("input.title") as HTMLInputElement;
let priceInput = document.querySelector("input.price") as HTMLInputElement;
let taxesInput = document.querySelector("input.taxes") as HTMLInputElement;
let adsInput = document.querySelector("input.ads") as HTMLInputElement;
let discountInput = document.querySelector(
  "input.discount"
) as HTMLInputElement;
let countInput = document.querySelector("input.count") as HTMLInputElement;
let categoryInput = document.querySelector(
  "input.category"
) as HTMLInputElement;
let searchInput = document.querySelector("input.search") as HTMLInputElement;
// button or text
let totalInput = document.querySelector("div.total") as HTMLDivElement;
let createInput = document.querySelector("input.create") as HTMLInputElement;
let deleteInput = document.querySelector("input.delete") as HTMLInputElement;
//table var
let table = document.querySelector("#data-read table") as HTMLTableElement;
let mood: string = "create";
let numberIndexInArray: number;
//function for edit valid input
function validInput() {
  if (titleInput.value != "") {
    if (priceInput.value != "") {
      if (categoryInput.value != "") {
        addToLocalStorage();
        // createData();
      } else {
        categoryInput.style.border = "2px solid red";
      }
    } else {
      priceInput.style.border = "2px solid red";
    }
  } else {
    titleInput.style.border = "2px solid red";
  }
}
setInterval(() => {
  let total =
    +priceInput.value +
    +taxesInput.value +
    +adsInput.value -
    +discountInput.value;

  totalInput.innerHTML = `total:${total}`;
}, 100);
createInput.addEventListener("click", () => {
  validInput();
  restDAta();
});
function restDAta() {
  titleInput.value = "";
  priceInput.value = "";
  taxesInput.value = "";
  adsInput.value = "";
  discountInput.value = "";
  countInput.value = "";
  categoryInput.value = "";
}

// function for add data to localStorage
let dataTable: any[];
if (localStorage.data != null) {
  dataTable = JSON.parse(localStorage.data);
} else {
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
  if (mood == "create") {
    if (+newData.count > 1) {
      for (let i = 0; i < +newData.count; i++) {
        dataTable.push(newData);
        createData();
        console.log(`mood ${mood}`);
      }
    } else {
      console.log(`mood ${mood}`);
      dataTable.push(newData);
      createData();
      console.log(newData.count);
    }
  } else {
    console.log(`mood ${mood}`);
    dataTable[numberIndexInArray] = newData;
    countInput.style.display = "block";
    createInput.value = "create";
    mood = "create";
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

  localStorage.setItem("data", JSON.stringify(dataTable));
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
          <td class="edit" ><i class="fa-solid fa-pen-to-square"></i></td>
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
          <td class="edit" onclick="edit(${i})"><i class="fa-solid fa-pen-to-square"></i></td>`;
      idNum = i + 2;
    }
  }
}
showData();

setInterval(() => {
  deleteInput.value = `delete all (${
    document.querySelectorAll("table tr").length - 1
  })`;
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
    // restDAta();
  });
}
deleteAll();

function deleteItem(i: number) {
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

function edit(i: number) {
  titleInput.value = dataTable[i].title;
  priceInput.value = dataTable[i].price;
  taxesInput.value = dataTable[i].tax;
  adsInput.value = dataTable[i].ads;
  discountInput.value = dataTable[i].discount;
  categoryInput.value = dataTable[i].category;
  countInput.style.display = "none";
  createInput.value = "update";
  mood = "update";
  numberIndexInArray = i;
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMood = "title";
function moodSearch(id: string) {
  if (id == "by-title") {
    searchInput.placeholder = `search ${id}`;
    searchMood = "title";
  } else {
    searchMood = "cate";
    searchInput.placeholder = `search ${id}`;
  }
  searchInput.focus();
}
function search(value: any) {
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
  if (searchMood == "title") {
    for (let i = 0; i < dataTable.length; i++) {
      if (dataTable[i].title.includes(value)) {
        console.log(dataTable[i]);
        table.innerHTML += `
      <td>${i + 1}</td>
    <td>${dataTable[i].title}</td>
          <td>${dataTable[i].price}</td>
          <td>${dataTable[i].tax || "0"}</td>
          <td>${dataTable[i].ads || "0"}</td>
          <td>${dataTable[i].discount || "0"}</td>
          <td>${dataTable[i].category}</td>
          <td class="delete" onclick="deleteItem(${i})"><i class="fa-solid fa-trash-can"></i></td>
          <td class="edit" onclick="edit(${i})"><i class="fa-solid fa-pen-to-square"></i></td>`;
      }
    }
  } else {
    for (let i = 0; i < dataTable.length; i++) {
      if (dataTable[i].category.includes(value)) {
        console.log(dataTable[i]);
        table.innerHTML += `
      <td>${i + 1}</td>
    <td>${dataTable[i].title}</td>
          <td>${dataTable[i].price}</td>
          <td>${dataTable[i].tax || "0"}</td>
          <td>${dataTable[i].ads || "0"}</td>
          <td>${dataTable[i].discount || "0"}</td>
          <td>${dataTable[i].category}</td>
          <td class="delete" onclick="deleteItem(${i})"><i class="fa-solid fa-trash-can"></i></td>
          <td class="edit" onclick="edit(${i})"><i class="fa-solid fa-pen-to-square"></i></td>`;
      }
    }
  }
}
