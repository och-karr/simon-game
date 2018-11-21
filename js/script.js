let order = []; //order of the colors (computer)
let playerOrder = []; //order of the colors (player choice)
let flash; //the number of flashes that appear on the game
let turn; //the number of turn
let good; // boolean - true if the player chose the right colors
let compTurn; //boolean - comp turn or player turn
let intervalId;
let strict = false; //if strict is checked - it starts with false
let noise = true;
let on = false; // if power is checked - it starts withn false
let win; //did player win or not

//Refference the HTML elements:
const turnCounter = document.querySelector("#turn"); //we don't interract only with this element
const topLeft = document.querySelector("#topleft"); 
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

strictButton.addEventListener("click", (event) => { //change event will be also good
    if (strictButton.checked) {
        strict = true;
    } else {
        strict = false;
    }
})