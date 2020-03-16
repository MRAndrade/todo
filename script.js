//setting variables to all HTML elements so I can target them

var newItem = document.getElementById('new-item');
var addBtn = document.getElementById('add-btn');
var clearBtn = document.getElementById('clear-btn');
var todoList = document.getElementById('todo-list');
var doneItem = document.getElementById('is-done');
var counterList = document.getElementById('counter-list');

//adding Listerers so I can add items and clear the whole list

newItem.addEventListener("keydown", function(e){
  if (e.keyCode === 13) {
    addItem();
  };
});

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

    var paragraph = document.createElement('p');
    paragraph.setAttribute('class','todo-text');

    var deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class','delete-btn');
    deleteBtn.innerHTML = "x";

    var li = document.createElement('li');
    li.appendChild(check);
    li.appendChild(paragraph);
    paragraph.append(todoText);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    newItem.value = "";
  }
  
  initialLoad();
}

function removeItem(){
  this.parentNode.remove();
  initialLoad();
}

function clearList() {
  todoList.innerHTML = "";
  initialLoad();
}

function isDone(){
  var counter = 0;
  var items = document.getElementsByClassName('todo-text');
  for (var i=0; i < items.length; i++){
    if (items[i].classList.contains('done')){
      counter++;
    }
  }
  doneItem.innerHTML = counter;
}

function countList() {
  var counter = todoList.childElementCount;
  counterList.innerHTML = '/' + counter;
}

function toggleDone(){
  /*this.parentNode.classList.toggle('done'); */
  this.parentNode.querySelector('p').classList.toggle('done');
}

//This function is called when screen is first loadead, a new item is added or the list is cleared
function initialLoad(){

  //keeping focus on new item input
  newItem.focus();

  //keeping up the counter
  isDone();
  countList();

  //creating a variable that holds all existing checkboxes at the moment
  var checkboxItems = document.querySelectorAll('input[type="checkbox"]');
  if(checkboxItems.length === 0){
    doneItem.innerHTML = 0;
  }

  //adding a listener to every existing checkbox
  for (var i = 0; i < checkboxItems.length; i++){
    checkboxItems[i].addEventListener('click', toggleDone);
    checkboxItems[i].addEventListener('click', isDone);
  }

  //creating a variable that holds all existing delete buttons from items at the moment
  var deleteBtns = document.querySelectorAll('button[class="delete-btn"]');

  //adding a listener to every delete button so it can delete the item which holds it
  for (var i = 0; i < deleteBtns.length; i++){
    deleteBtns[i].addEventListener('click', removeItem);
  }
}