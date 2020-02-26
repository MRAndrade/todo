//setting variables to all HTML elements so I can target them

var newItem = document.getElementById('new-item');
var addBtn = document.getElementById('add-btn');
var removeBtn = document.getElementById('remove-btn');
var clearBtn = document.getElementById('clear-btn');
var todoList = document.getElementById('todo-list');
var counterList = document.getElementById('counter-list');

//adding Listerers so I can add items and clear the whole list

newItem.addEventListener("keydown", function(e){
  if (e.keyCode === 13) {
    addItem();
  };
});

addBtn.addEventListener("click", addItem);
clearBtn.addEventListener("click", clearList);
removeBtn.addEventListener("click", enableRemove);
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

    var deleteBtn = document.createElement('button');
    deleteBtn.classList.add('none');

    var li = document.createElement('li');
    li.appendChild(check);
    li.append(todoText);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    newItem.value = "";
  }
  
  initialLoad();
}

function enableRemove(){
  var currentItems = todoList.querySelectorAll('button');
  for (var i = 0; i < currentItems.length; i++){
    currentItems[i].classList.toggle('none');
    currentItems[i].addEventListener('click', removeItem);
  }

  function removeItem(){
    this.parentNode.remove();
    countList();
  }
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

function toggleDone(){
  this.parentNode.classList.toggle('done');
}

//This function is called when screen is first loadead, a new item is added or the list is cleared
function initialLoad(){

  //keeping focus on new item input
  newItem.focus();

  //keeping up the number of items in the list
  countList();

  //creating a variable that holds all existing checkboxes at the moment
  var checkboxItems = document.querySelectorAll('input[type="checkbox"]');

  //adding a listener to every existing checkbox so it can apply the visual effect to the text of each item
  for (var i = 0; i < checkboxItems.length; i++){
    checkboxItems[i].addEventListener('click', toggleDone);
  }
}