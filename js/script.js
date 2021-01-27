const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoItemList = document.querySelector(".todo-items");
const checkAllButton = document.querySelector(".check-all-button");

var todos = JSON.parse(localStorage.getItem("todos")) || [];

renderTodos();

todoForm.addEventListener("submit", function(event){
	
	event.preventDefault();

	addTodo(todoInput.value);

});

todoItemList.addEventListener("click", function(event){

	if(event.target.type == "checkbox"){

		toggleTodo(event.target.parentElement.getAttribute("data-id"));

	}

	if(event.target.classList.contains("delete-button")){

		deleteTodo(event.target.parentElement.getAttribute("data-id"));

	}

});

checkAllButton.addEventListener("click", function(){

	checkAll();

});

function addTodo(todo){
	
	var objTodo = {
		id: generateID(),
		title: todo,
		completed: false
	};

	todos.push(objTodo);

	addToLocalStorage();

	renderTodos();

	todoInput.value = "";

}

function addToLocalStorage(){

	localStorage.setItem("todos", JSON.stringify(todos));

}

function renderTodos(){

	todoItemList.innerHTML = "";

	todos.forEach(function(todo){

		var checked = todo.completed ? "checked" : "";

		var li = document.createElement("li");

		li.setAttribute("class", "item");

		li.setAttribute("data-id", todo.id);

		if(li.completed){
			li.classList.add("checked");
		}

		li.innerHTML = `
			<input type="checkbox" class="checkbox" ${checked}>
			${todo.title}
			<button class="delete-button">X</button>
		`;

		todoItemList.append(li);

	});

}

function toggleTodo(id){
	
	todos.forEach(function(todo){

		if(todo.id == id){
			todo.completed = !todo.completed;
		}

	});

	addToLocalStorage();

	renderTodos();

}

function deleteTodo(id){

	todos = todos.filter(function(todo){

		return todo.id != id;

	});

	addToLocalStorage();

	renderTodos();

}

function generateID(){
	
	return Date.now();

}

function checkAll(){

	todos.forEach(function(todo){

		todo.completed = true;

	});

	addToLocalStorage();

	renderTodos();

}