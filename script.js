//Setting variables to all HTML elements so I can target them

var newItem = document.getElementById('new-item');
var addBtn = document.getElementById('add-btn');
var clearBtn = document.getElementById('clear-btn');
var todoList = document.getElementById('todo-list');
var doneItem = document.getElementById('is-done');
var counterList = document.getElementById('counter-list');

//Adding listener to the input and the 'add-btn', so it can add new items to the list

newItem.addEventListener("keydown", function(e){
  if (e.keyCode === 13) {
    addItem(newItem.value);
  };
});

addBtn.addEventListener("click", function(){
  addItem(newItem.value);
});

//Adding listener to the clear-btn so it can clear the entire list
clearBtn.addEventListener("click", clearList);

initialLoad();

//That's the function reponsible for adding items to the screen. It has 2 argumentos: the value it's going to checked and if this function is being called through edit option instead of adding
function addItem(text, edit){

  //Variable that will hold the final value
  var todoText = "";

  //Creating a loop that will go through the entire input value
  for(var i = 0; i < text.length; i++){
      
    if (
      //if character isn't a space
      text[i] !== " ") {

      todoText += text[i];
      
    } else if(
      //if next character isn't a space
      text[i+1] !== " "
      //if if it's not the last item of the string
      && text[i+1] !== undefined
      //if previous character isn't a space
      && text[i-1] !== " "
      //if it's not the first item of the string
      && text[i-1] !== undefined) {

      todoText += text[i];

    }
    
    //in case of multiple whitespaces in a row
    else if (
      //if previous character is a space
      text[i-1] == " " &&
      //if next character isn't a space
      text[i+1] !== " " &&
      //if it's not the last item of the string
      text[i+1] !== undefined &&
      //preventing whitespaces BEFORE the non whitespace character
      todoText !== ""){

        todoText += " ";
    }
  }

  if (todoText !== "") {

    //If it comes from editItem, it will return the value after being checked by the conditions above
    if(edit === true) {
      return todoText;
    }

    //Else, it will create a new item to the list
    else {
      //All elements for a new item are created here: checkbox, text displayed on the item, edit option, delete option and the 'li' element that will hold it all inside itself

      var check = document.createElement('input');
      check.setAttribute('type','checkbox');

      var paragraph = document.createElement('p');
      paragraph.setAttribute('class','todo-text');

      var editBox = document.createElement('input');
      editBox.setAttribute('class', 'edit-box none');
      editBox.setAttribute('type','text');

      var editBtn = document.createElement('button');
      editBtn.setAttribute('class','edit-btn');
      editBtn.append('Edit');

      var deleteBtn = document.createElement('button');
      deleteBtn.setAttribute('class','delete-btn');
      deleteBtn.innerHTML = "x";

      var li = document.createElement('li');
      li.appendChild(check);
      li.appendChild(paragraph);
      paragraph.append(todoText);
      li.appendChild(editBox);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
      newItem.value = "";
    }
  }
  
  initialLoad();  
}

function editItem(){
  //Variable that will hold the result from addItem condition checker
  var value = "";

  //Targeting paragraph from item
  var getParagraph = this.parentNode.getElementsByTagName('p');
  var p = getParagraph[0];
  p.classList.toggle('none');

  //Targeting editBox from item
  var getEditBox = this.parentNode.getElementsByClassName('edit-box');
  var editBox = getEditBox[0];
  editBox.classList.toggle('none');

  editBox.focus();

  editBox.addEventListener("keydown", function(e){
    if (e.keyCode === 13) {
      //When hit enter, it will run addItem and check if the input value is valid
      value = addItem(editBox.value, true);

      //Preventing from value being set as undefined
      if (value !== undefined) {
        p.innerHTML = value;
      }

      //Preventing from bug that toggle double times after the first edit
      if (p.classList.contains('none')) {
        p.classList.toggle('none');
      }
      if (!editBox.classList.contains('none')) {
        editBox.classList.toggle('none');
      }
    };
  });
}

//Function that removes the item clicked
function removeItem(){
  this.parentNode.remove();
  initialLoad();
}

//Function responsible for clearing the entire list
function clearList() {
  todoList.innerHTML = "";
  initialLoad();
}

//Checking how many items are done and keeping the updated number on the screen
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

//Checking how many items there are on the list
function countList() {
  var counter = todoList.childElementCount;
  counterList.innerHTML = '/' + counter;
}

//Toggle between done and undone item
function toggleDone(){
  this.parentNode.querySelector('p').classList.toggle('done');
}

//This function is called when screen is first loadead, a new item is added or the list is cleared. We need to do it so it can
function initialLoad(){

  //Keeping focus on new item input
  newItem.focus();

  //Keeping up the counter
  isDone();
  countList();

  //Creating a variable that holds all existing checkboxes at the moment
  var checkboxItems = document.querySelectorAll('input[type="checkbox"]');
  if(checkboxItems.length === 0){
    doneItem.innerHTML = 0;
  }

  //Adding a listener to every existing checkbox
  for (var i = 0; i < checkboxItems.length; i++){
    checkboxItems[i].addEventListener('click', toggleDone);
    checkboxItems[i].addEventListener('click', isDone);
  }

  //Creating a variable that holds all existing delete and edit buttons from items at the moment
  var deleteBtns = document.querySelectorAll('button[class="delete-btn"]');
  var editBtns = document.querySelectorAll('button[class="edit-btn"]');

  //Adding a listener to every delete button so it can delete the item which holds it, the same applies for editting
  for (var i = 0; i < deleteBtns.length; i++){
    deleteBtns[i].addEventListener('click', removeItem);
    editBtns[i].addEventListener('click', editItem);
  }
}