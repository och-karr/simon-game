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

const darkgreen = "rgb(0, 107, 62)";
const lightgreen = "rgb(0, 233, 136)";
const darkred = "rgb(151, 0, 33)";
const lightred = "rgb(255, 0, 55)";
const darkyellow = "rgb(133, 113, 1)";
const lightyellow = "rgb(255, 217, 0)";
const darkblue = "rgb(0, 59, 107)";
const lightblue = "rgb(0, 138, 252)";

strictButton.addEventListener("click", (event) => { //change event will be also good
    if (strictButton.checked) {
        strict = true;
    } else {
        strict = false;
    }
});

onButton.addEventListener('click', (event) => {
    if (onButton.checked) {
        on = true;
        turnCounter.innerHTML = "0";
    } else {
        on = false;
        turnCounter.innerHTML = "";
        clearColor(); //all the lights should go off
        clearInterval(intervalId); //!!!! explain later !!!!
    }
});

startButton.addEventListener("click", (event) => {
    if (on || win) { //if on or win is true
        play();
    }
});

function play() { //the state at the start of the game
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true; //player did nothing incorrect yet
    for (var i = 0; i < 20; i++) { //20 points is max
        order.push(Math.floor(Math.random() * 4) + 1) //without plus 1 it would be numbers from 0 to 3
    }
    compTurn = true; //computer shows colors at first
    intervalId = setInterval(gameTurn, 800); //run the gameTurn fuction every 800 ms (colors)
}

function gameTurn () {
    on = false; //because player cannot click buttons while computer turn is
    if (flash === turn) { //then computer turn is over
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true; // then player can start pressing buttons
    }

    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (order[flash] === 1) one();
            if (order[flash] === 2) two();
            if (order[flash] === 3) three();
            if (order[flash] === 4) four();
            flash++;
        }, 200); // do after 200 ms
    }
}

function one() {
    if (noise) {
        let audio = document.getElementById("sound1");
        audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = lightgreen;
}

function two() {
    if (noise) {
        let audio = document.getElementById("sound2");
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = lightred;
}

function three() {
    if (noise) {
        let audio = document.getElementById("sound3");
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = lightyellow;
}

function four() {
    if (noise) {
        let audio = document.getElementById("sound4");
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = lightblue;
}

function clearColor() {
    topLeft.style.backgroundColor = darkgreen;
    topRight.style.backgroundColor = darkred;
    bottomLeft.style.backgroundColor = darkyellow;
    bottomRight.style.backgroundColor = darkblue;
}

function flashColor() {
    topLeft.style.backgroundColor = lightgreen;
    topRight.style.backgroundColor = lightred;
    bottomLeft.style.backgroundColor = lightyellow;
    bottomRight.style.backgroundColor = lightblue;
}

topLeft.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(1); //if player click topLeft then push '1' into playerOrder array
        check();
        one();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

topRight.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(2); //if player click topLeft then push '1' into playerOrder array
        check();
        two();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

bottomLeft.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(3); //if player click topLeft then push '1' into playerOrder array
        check();
        three();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

bottomRight.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(4); //if player click topLeft then push '1' into playerOrder array
        check();
        four();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

function check() {
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) 
        good = false;
    if (playerOrder.length === 20 && good) {
        winGame();
    }
    if (good === false) {
        flashColor();
        turnCounter.innerHTML = "NO!";
        setTimeout(() => {
            turnCounter.innerHTML = turn;
            clearColor();
            if (strict) {
                play();
            } else {
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);
        noise = false;
    }
    if (turn === playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }
}

function winGame() {
    flashColor();
    turnCounter.innerHTML = "WIN!";
    on = false;
    win = true;
}