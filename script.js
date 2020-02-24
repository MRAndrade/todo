//setting variables to all HTML elements so I can target them

var newItem = document.getElementById('new-item');
var addBtn = document.getElementById('add-btn');
var clearBtn = document.getElementById('clear-btn');
var todoList = document.getElementById('todo-list');
var counterList = document.getElementById('counter-list');

//adding Listerers so I can add items and clear the whole list

addBtn.addEventListener("click", addItem);
clearBtn.addEventListener("click", clearList);
initialLoad();

function addItem(){
  //cancelling input of an empty item
  if (newItem.value == " ") {
    newItem.value = "";
  }

  //adding valid item to te list
  if (newItem.value) {
    var todoText = document.createTextNode(newItem.value);

    var check = document.createElement('input');
    check.setAttribute('type','checkbox');

    var li = document.createElement('li');
    li.appendChild(check);
    li.appendChild(todoText);

    todoList.appendChild(li);
    newItem.value = "";
  }
  
  initialLoad();
}

function clearList() {
  todoList.innerHTML = "";
  initialLoad();
}

function countList() {
  var counter = todoList.childElementCount;
  counterList.innerHTML = counterText(counter);
  
  function counterText(number){
    if (number === 0) {
      return 'No items in the list.';
    } else if (number === 1) {
      return '1 item in the list.';
    } else {
      return number + ' items in the list.';
    }
  }
}

//Function to keep focus on input and counter up to date
function initialLoad(){
  newItem.focus();
  countList();
}