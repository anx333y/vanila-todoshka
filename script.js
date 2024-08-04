const inputForm = document.querySelector('.todo-input-block');
const input = inputForm.querySelector('.todo-input-block__input');
const toDoList = document.querySelector('.todo-list');
let toDoItems = toDoList.children;
const toDoListToggleCheckboxes = toDoList.querySelectorAll('.todo-list-item__toggle-checkbox');
const toDoListDeleteButtons = toDoList.querySelectorAll('.todo-list-item__delete-button');
const toDoInfo = document.querySelector('.todo-info');
const toDoCount = toDoInfo.querySelector('.todo-info__count');
const toDoShowAllButton = toDoInfo.querySelector('.todo-view__all-button');
const toDoShowActiveButton = toDoInfo.querySelector('.todo-view__active-button');
const toDoShowCompletedButton = toDoInfo.querySelector('.todo-view__completed-button');
const toDoClearCompletedButton = toDoInfo.querySelector('.todo-info__clear-completed-button');
let isComleted = false;

//main
updateToDoCount();
hideToDoInfo();
inputForm.addEventListener('submit', (event) => addNewListItemHandler(event));

toDoListToggleCheckboxes.forEach((checkbox) => {
	checkboxParent = checkbox.parentNode.parentNode
	toggleCheckboxAddEventListener(checkbox, checkboxParent)
});
toDoListDeleteButtons.forEach((button) => {
	buttonParent = button.parentNode
	deleteButtonAddEventListener(button, buttonParent)
});

toDoShowAllButton.addEventListener('click', () => showAll());
toDoShowActiveButton.addEventListener('click', () => showActive());
toDoShowCompletedButton.addEventListener('click', () => showCompleted());
toDoClearCompletedButton.addEventListener('click', () => clearCompleted());


//functions
function addNewListItemHandler(event) { //
	event.preventDefault();
	const inputValue = input.value;
	if (inputValue) {
		const newListItem = createListItem(inputValue);
		toDoList.insertBefore(newListItem, toDoList.firstChild);
		updateToDoCount();
		hideToDoInfo();
		input.value = '';
	}
}

function toggleCheckboxAddEventListener(checkbox, checkboxParent) {
	checkbox.addEventListener('change', (event) => {
		checkboxParent.classList.toggle('todo-list-item__checked')
	});
}
function deleteButtonAddEventListener(button, buttonParent) {
	button.addEventListener('click', () => {
		toDoList.removeChild(buttonParent)
		updateToDoCount()
		hideToDoInfo()
	})
}
function updateToDoCount() {
	toDoCount.textContent = toDoItems.length + ' items left';
}
function hideToDoInfo() {
	const count = toDoItems.length;
	if (count) {
		toDoList.classList.remove('hidden');
		toDoInfo.classList.remove('hidden');
	} else {
		toDoList.classList.add('hidden');
		toDoInfo.classList.add('hidden');
	} //если добавлять новое дело, то он снова удаляет hidden, надо исправить
}
function getActiveCompletedLists() {
	return [
		Object.values(toDoItems).filter((item) => !item.classList.contains('todo-list-item__checked')),
		Object.values(toDoItems).filter((item) => item.classList.contains('todo-list-item__checked'))
	];
}
function showAll() {
	isComleted = false;
	Object.values(toDoItems).forEach((item) => item.classList.contains('hidden') && item.classList.remove('hidden'));
}
function showActive() {
	isComleted = false;
	const [activeList, completedList] = getActiveCompletedLists();
	activeList.forEach((active) => active.classList.contains('hidden') && active.classList.remove('hidden'));
	completedList.forEach((completed) => completed.classList.add('hidden'));
}
function showCompleted() {
	isComleted = true;
	const [activeList, completedList] = getActiveCompletedLists();
	activeList.forEach((active) => active.classList.add('hidden'));
	completedList.forEach((completed) => completed.classList.contains('hidden') && completed.classList.remove('hidden'));
}
function clearCompleted() {
	const completedList = Object.values(toDoItems).filter((item) => item.classList.contains('todo-list-item__checked'));
	completedList.forEach((completed) => completed.remove());
	updateToDoCount();
	hideToDoInfo();
}
function createListItem(inputValue) {
	const newListItem = document.createElement('li');
	const newListItemContent = document.createElement('span');
	const newListItemDeleteButton = createDeleteButton(newListItem);
	const newListItemToggleCheckbox = createToggleCheckbox(newListItem);
	newListItem.classList.add('todo-list-item');
	newListItemContent.classList.add('todo-list-item__content');
	newListItemContent.textContent = inputValue;
	newListItem.appendChild(newListItemToggleCheckbox);
	newListItem.appendChild(newListItemContent);
	newListItem.appendChild(newListItemDeleteButton);
	makeComleted(newListItem);
	return newListItem;
}
function createDeleteButton(newListItem) {
	const button = document.createElement('button');
	const buttonIcon = document.createElement('i');
	button.classList.add('todo-list-item__delete-button');
	buttonIcon.classList.add('fa');
	buttonIcon.classList.add('fa-close');
	button.appendChild(buttonIcon);
	deleteButtonAddEventListener(button, newListItem);
	return button;
}
function createToggleCheckbox(newListItem) {
	const checkboxWrapper = document.createElement('label');
	const checkbox = document.createElement('input');
	const checkboxCustom = document.createElement('span');
	checkboxWrapper.classList.add('todo-list-item__toggle-checkbox-wrapper');
	checkbox.classList.add('todo-list-item__toggle-checkbox');
	checkboxCustom.classList.add('todo-list-item__toggle-checkbox-custom');
	checkbox.type = 'checkbox';
	checkboxWrapper.appendChild(checkbox);
	checkboxWrapper.appendChild(checkboxCustom);
	toggleCheckboxAddEventListener(checkbox, newListItem);
	return checkboxWrapper;
}
function makeComleted(item) {
	return isComleted ? item.classList.add('hidden') : item.classList.remove('hidden');
}
