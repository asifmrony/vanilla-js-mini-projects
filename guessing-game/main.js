/*
1. Generate a Random number between 1 and 100.

1.1. Record the turn number the player is on.
        start it on 1.

2. Provide a input taking functionality so players
 can input 10 times.

3. Tell gamer if guessing is right or wrong.

    3.1. IF wrong and turn left,
        1. then game should be told whether
            guess is to high or low.
        2. tell the player previous guess number
        3. Increment the turn number by 1.
    
    3.2. IF wrong and player has no turn left,
        1. Game Over with warning signal.
        2. Plyer would start the game again.
        3. Stop players being able to enter more
            guesses.

    3.3. IF correct,
        1. Congratulation msg with warm.
        1. Player would start the game again.

4. Once the game restarts, make sure game logic
    and UI are completely reset, then go back to
    step 1.
*/

let randomNumber = Math.floor(Math.random() * 100) + 1;
console.log("Random Number" + randomNumber);

let turnNumber = 1;
let resetButton;

const guessInput = document.querySelector('.guessField');
const submitButton = document.querySelector('.guessSubmit')

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

function checkResult() {
    let inputValue = guessInput.value;
    guessInput.value = '';

    if (randomNumber !== inputValue && turnNumber <= 10) {
        if (turnNumber == 1) {
            guesses.textContent = "Previous guesses: ";
            guesses.append(inputValue);
        } else {
            let newGuess = guesses;
            newGuess.append(" " + inputValue);
        }
        turnNumber++;
        console.log("Turn Number" + turnNumber);
        lastResult.textContent = "Wrong";
        lastResult.style.backgroundColor = "red";
        let guessDifferenceRandom = randomNumber - inputValue;
        // let guessDifferenceInput = Math.abs(inputValue - randomNumber);
        if (guessDifferenceRandom > 40) {
            lowOrHi.textContent = "Your Guess is too low";
        } else if (guessDifferenceRandom < -40) {
            lowOrHi.textContent = "Your Guess is too High";
        } else {
            lowOrHi.textContent = "Your were Close";
        }
    } else if ((randomNumber !== inputValue && turnNumber > 10)) {
        console.log("Turn over");
        guessInput.setAttribute("disabled", true);
        this.setAttribute("disabled", true);
        lastResult.textContent = "!!!GAME OVER!!!";
        lastResult.style.backgroundColor = "red";
        lowOrHi.style.display = 'none';
        let newButton = document.createElement('button');
        newButton.textContent = "Start New Game";
        let someParent = lowOrHi.parentElement;
        someParent.appendChild(newButton);
    }
}

submitButton.addEventListener("click", checkResult);