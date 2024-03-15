const todoArray = JSON.parse(localStorage.getItem("todoArray")) || [];

function setToDo() {
  let toDoElem = document.querySelector(".js-input-text");
  let dateElem = document.querySelector(".js-input-datetime");

  todoArray.push({ todoName: toDoElem.value, todoDate: dateElem.value });
  toDoElem.value = "";
  dateElem.value = "";
  showAndDeleteSome();
  setItem();
}

showAndDeleteSome();
function showAndDeleteSome() {
  let getvalue = ``;
  for (let x = 0; todoArray.length > x; x++) {
    getvalue += `<div class="todo-content "><p>${todoArray[x].todoName}</p><p>${todoArray[x].todoDate}</p>
    <button class="delete-btn js-delete-button">Delete</button> 
    </div>`;
  }
  document.querySelector(".content").innerHTML = getvalue;
  document.querySelectorAll(".js-delete-button").forEach((value, index) => {
    value.addEventListener("click", () => {
      todoArray.splice(index, 1);
      showAndDeleteSome();
      setItem();
    });
  });
}

function setItem() {
  const json = JSON.stringify(todoArray);
  localStorage.setItem("todoArray", json);
}

document.body.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    setToDo();
  }
});

const submitElem = document.querySelector(".js-submit-btn");
let timeOutId;
submitElem.addEventListener("click", () => {
  if (submitElem.innerText === "Enter") {
    submitElem.innerText = "Added";
  }

  clearTimeout(timeOutId);
  timeOutId = setTimeout(() => {
    if (submitElem.innerText === "Added") {
      submitElem.innerText = "Enter";
    }
  }, 2000);
  setToDo();
});
