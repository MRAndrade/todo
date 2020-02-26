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
  var todoText = "";

  for(var i = 0; i < newItem.value.length; i++){
      
    if (
      //if character isn't a space
      newItem.value[i] !== " ") {

      todoText += newItem.value[i];
      
    } else if(
      //if next character isn't a space
      newItem.value[i+1] !== " "
      //if if it's not the last item of the string
      && newItem.value[i+1] !== undefined
      //if previous character isn't a space
      && newItem.value[i-1] !== " "
      //if it's not the first item of the string
      && newItem.value[i-1] !== undefined) {

      todoText += newItem.value[i];

    }
    
    //in case of multiple whitespaces in a row
    else if (
      //if previous character is a space
      newItem.value[i-1] == " " &&
      //if next character isn't a space
      newItem.value[i+1] !== " " &&
      //if it's not the last item of the string
      newItem.value[i+1] !== undefined &&
      //preventing whitespaces BEFORE the non whitespace character
      todoText !== ""){
        todoText += " ";
    }
  }

  if (todoText !== "") {

    var check = document.createElement('input');
    check.setAttribute('type','checkbox');

    var li = document.createElement('li');
    li.appendChild(check);
    li.append(todoText);

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