let itemList = [];
let currentIndex = 0;

const body = document.querySelector("body");

// Function to add an item to the list
function addItem() {
	const newItem = document.getElementById("itemInput").value;
	if (newItem.trim() === "") {
		alert("No item has been entered.");
	} else {
		itemList.push(newItem);
		document.getElementById("itemInput").value = "";
		displayList();
	}
}

// Function to remove the last item from the list using a button
function remove() {
	const removeButton = document.getElementById("removeButton");
	removeButton.addEventListener("click", () => {
		if (itemList.length > 0) {
			itemList.pop();
			displayList();
		} else {
			alert("No items to remove.");
		}
	});
}

// Call the remove function when the page loads
remove();

// Function to display the list of players
function displayList() {
	const listElement = document.getElementById("itemList");
	listElement.innerHTML = "";

	itemList.forEach((item) => {
		const listItem = document.createElement("li");
		listItem.className = "item";
		listItem.textContent = item;
		listElement.appendChild(listItem);
	});
}

// Function for the countdown timer and event handling
function keyeraser_and_countdown() {
	document.addEventListener("keydown", function (event) {
		if (event.key === "Enter") {
			event.preventDefault();

			// Check if there are at least 2 players before starting
			if (itemList.length < 2) {
				alert("You need at least 2 players before starting!");
				return;
			}

			const ridder = document.getElementById("itemInput");
			ridder.remove();
			let countdownElement = document.getElementById("countdown");
			let count = 3;
			countdownElement.textContent = count;

			const listElement = document.getElementById("itemList");
			if (listElement) listElement.innerHTML = "";

			let interval = setInterval(function () {
				count--;
				countdownElement.textContent = count;
				if (count === 0) {
					clearInterval(interval);
					countdownElement.textContent = "Go!";

					document.body.innerHTML = "";
					let buttoner = document.createElement("button");
					buttoner.textContent = "Click here!";
					buttoner.id = "buttoner";
					document.body.appendChild(buttoner);

					looparound();
					win();
				}
			}, 1000);
		}
	});
}

keyeraser_and_countdown();

// Function to handle the loop of selecting players when button is clicked
function looparound() {
	let button = document.getElementById("buttoner");

	if (!button) {
		console.error("Button with ID 'buttoner' not found!");
		return;
	}

	button.addEventListener("click", () => {
		if (itemList.length === 0) {
			alert("No players added! Please add players to the list.");
			return;
		}

		const existingList = document.getElementById("displayList");
		if (existingList) existingList.remove();

		const ulElement = document.createElement("ul");
		ulElement.id = "displayList";

		const liElement = document.createElement("li");
		liElement.textContent = itemList[currentIndex];
		ulElement.appendChild(liElement);

		document.body.appendChild(ulElement);

		currentIndex = (currentIndex + 1) % itemList.length;
	});
}

// Function to handle the win event
function win() {
	var winbutton = document.createElement("button");
	winbutton.id = "buttonwin";
	winbutton.innerText = "Win?";
	document.body.appendChild(winbutton);

	var nero = document.getElementById("buttonwin");
	nero.addEventListener("click", () => {
		if (itemList.length === 0) {
			alert("No players added! Please add players to the list.");
			return;
		}

		document.body.innerHTML = "";

		const listContainer = document.createElement("div");
		listContainer.id = "list-container";

		window.setTimeout(() => {
			document.body.appendChild(listContainer);

			itemList.forEach((item) => {
				const button = document.createElement("button");
				button.textContent = item;

				button.addEventListener("click", () => {
					document.body.innerHTML = "";

					const winMessage = document.createElement("h1");
					winMessage.textContent = `${item} has won!`;
					document.body.appendChild(winMessage);
				});

				listContainer.appendChild(button);
			});
		}, 1000);
	});
}
