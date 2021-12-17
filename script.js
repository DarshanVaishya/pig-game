"use strict";

// Selecting elements
//Players
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
// Scores
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
// Current scores
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
// Buttons
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
// Dice
const diceEl = document.querySelector(".dice");

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

diceEl.classList.add("hidden");
score0El.textContent = 0;
score1El.textContent = 0;

// Rolling dice functionality
function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function switchPlayer() {
	document.querySelector(`#current--${activePlayer}`).textContent = 0;
	player0El.classList.toggle("player--active");
	player1El.classList.toggle("player--active");
	activePlayer = +!activePlayer;
	currentScore = 0;
}

btnRoll.addEventListener("click", () => {
	// 1. Generate a random dice roll
	const dice = getRandomNumber(1, 7);

	// 2. Display dice
	diceEl.classList.remove("hidden");
	diceEl.src = `static/dice-${dice}.png`;

	// 3. Check for 1
	if (dice !== 1) {
		// Add dice to current score
		currentScore += dice;
		document.querySelector(`#current--${activePlayer}`).textContent =
			currentScore;
	} else {
		// Switch to next player
		switchPlayer();
	}
});

btnHold.addEventListener("click", () => {
	// 0. Return if currentScore is 0
	if (currentScore === 0) return;

	// 1. Add current csore to active player's score
	scores[activePlayer] += currentScore;
	document.querySelector(`#score--${activePlayer}`).textContent =
		scores[activePlayer];

	// 2. Check if player's score is >= 25
	if (scores[activePlayer] >= 25) {
		document
			.querySelector(`.player--${activePlayer}`)
			.classList.add("player--winner");
		document
			.querySelector(`.player--${activePlayer}`)
			.classList.remove("player--active");
		diceEl.classList.add("hidden");

		btnHold.style.display = "none";
		btnRoll.style.display = "none";
		return;
	}
	// 3. Switch player
	switchPlayer();
});

btnNew.addEventListener("click", () => {
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	btnHold.style.display = "block";
	btnRoll.style.display = "block";

	score0El.textContent = 0;
	score1El.textContent = 0;
	current0El.textContent = 0;
	current1El.textContent = 0;

	player0El.classList.remove("player--winner");
	player1El.classList.remove("player--winner");
	player0El.classList.add("player--active");
	player1El.classList.remove("player--active");
});
