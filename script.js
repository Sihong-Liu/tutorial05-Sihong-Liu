var numCircles = 6;
// The colour variable should be an array that contains as many random RGB colours as there are circles.
var colours = [];
// This pickedColor is the RGB color we are trying to guess (string)
var pickedColor;
// This is the default colour of the game.
let defaultColour = "#582c99";

// Grab all appropriate elements from the HTML.
var circles = document.querySelectorAll(".circle");
var colourToGuess = document.getElementById("colour-to-guess");
var resultMessage = document.getElementById("result-message");
var resetButton = document.getElementById("restart");  // Corrected
var banner = document.querySelector("h1");  // Corrected

init();

// The init function should reset the stage and set a new RGB color
function init() {
    //Call reset()
    reset();

    // let the text of the colourToGuess element to display the correct RGB color
    colourToGuess.textContent = pickedColor.toUpperCase();

    //setting up event listeners for circles
    circles.forEach(circle => {
        circle.addEventListener("click", clickCircle);
    });

    // Add a listener for reset button
    resetButton.addEventListener("click", reset);
}

// react with clicks on circles
function clickCircle() {
    // Get the color of the clicked circle
    var selectedColor = this.style.backgroundColor;

    if (selectedColor === pickedColor) {
        // Win condition
        resultMessage.textContent = "You win!";
        resetButton.textContent = "Play Again";

        // Change all circles and banner to the correct color
        circles.forEach(circle => {
            circle.style.backgroundColor = pickedColor;
        });
        banner.style.backgroundColor = pickedColor;
    } else {
        // wrong guess
        this.style.backgroundColor = defaultColour;
        resultMessage.textContent = "Try again";
    }
}

// The reset function sets new values for the colours array and picks a new target color
function reset() {
    // Clear previous messages and reset button text and banner color
    resultMessage.textContent = "";
    resetButton.textContent = "Restart";
    banner.style.backgroundColor = defaultColour;

    // Get new colors and select a new target color
    colours = genRandomColours();
    pickedColor = chooseColor();
    colourToGuess.textContent = pickedColor.toUpperCase();

    // Set each circle's color to a new color
    circles.forEach((circle, index) => {
        circle.style.backgroundColor = colours[index];
    });
}

//generate a random RGB color string
function makeColour() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// set new values for the colours array
function genRandomColours() {
    let arr = [];//create an empty array
    for (let i = 0; i < numCircles; i++) {
        arr.push(makeColour());//push random generated RGB into it
    }
    return arr;
}

//pick one of the colors randomly as the target color
function chooseColor() {
    const randInd = Math.floor(Math.random() * colours.length);
    return colours[randInd];
}
