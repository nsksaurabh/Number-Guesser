/* GAME FUNCTION:
- Player must guess a number between min and max value
- Player has limited guesses
-Notify a player of guesses remaining
-Notify player of correct answer if lost
-Player can choose to play a game
*/

//Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector("#game"),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');


// Assigning Min and Max
minNum.textContent = min;
maxNum.textContent = max;

//Play Again Event Listner
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

//Listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);


    //Validate
    if (guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    //Check if won
    if (guess === winningNum) {
        //Game Over - Player won
        gameOver(true, `You Won! You have guessed the number correctly.`);


    } else {
        // Wrong Number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            //Gameover Lost

            gameOver(false, `Game Over! You Lost The correct number was ${winningNum}`);

        }
        else {
            //Game Continues -answer is wrong

            //Change border color
            guessInput.style.borderColor = "red";
            //clear input
            guessInput.value = '';
            //Set Message
            setMessage(`${guess} is not correct, ${guessesLeft} guesses are left`, 'red');
        }

    }
});


//Game Over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    //Disabling input
    guessInput.disabled = true;
    //Change border color
    guessInput.style.borderColor = color;
    //message
    message.style.color = color;
    //Set Message
    setMessage(msg);

    //Play Again
    guessBtn.value = "Play Again";
    guessBtn.className += 'play-again';


}

//Set Message
function setMessage(msg, color) {
    message.style.color = color;

    message.textContent = msg;
}

//Get Winning Number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);

}