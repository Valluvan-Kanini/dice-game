'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//These are Global Variables, So We can access these variables inside of any function
let scores, currentScore, activePlayer, playing;

//Starting conditions before Dice Roll
const init = function () {
  //Replacing the values for Global variables
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
//calling the function
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  //Toggle the CSS Property using the 'player--active' class between Player 1 and Player 2
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling Dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random Dice number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice); //This is optional, for our reference only

    //2.Display the Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.Check the rolled 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      //call the switchPlayer function
      switchPlayer();
    }
  }
});

//Hold Button Functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to the Active Player's Score
    scores[activePlayer] = scores[activePlayer] + currentScore; // This value will replace the scores Array variable value

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score is >= 100, if it is true Finish the Game and Announce the Winner
    if (scores[activePlayer] >= 20) {
      //Finish the Game
      playing = false; //After the player winner announcement, due to this 'false' value the Roll Dice and Hold Button will not work

      diceEl.classList.add('hidden'); //To hide the Dice after the winner anoucement

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3. Switch to the next player
      switchPlayer();
    }
  }
});

//New Game Button functionality
btnNew.addEventListener('click', init);
