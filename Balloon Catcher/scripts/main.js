const canvas = document.getElementById("Canvas");
canvas.width = 900;
canvas.height = 750;
const con = canvas.getContext("2d");


function resize() {

    const height = window.innerHeight - 20;


    const ratio = canvas.width / canvas.height;
    const width = height * ratio;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
}
window.addEventListener("load", resize, false);

// Game Basics
class GameBasics {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        // active playing field // game movmennnt
        this.playBoundaries = {
            top: 150,
            bottom: 650,
            left: 100,
            right: 800
        };

        this.level = 1;
        this.score = 0;
        this.shields = 2;
        // game settings
        this.setting = {
            updateSeconds: 1 / 60,
            manSpeed: 200,
            bulletSpeed: 130,
            bulletMaxFrequency: 500,
            ufoLines: 4,
            ufoColumns: 8,
            ufoSpeed: 35,
            ufoSinkingValue: 30,
            bombSpeed: 75,
            bombFrequency: 0.05,
            pointsPerUFO: 25
        };

        this.positionContainer = [];

        this.pressedKeys = {};
    }

    presentPosition() {
        return this.positionContainer.length > 0 ?
            this.positionContainer[this.positionContainer.length - 1] //if not empty 
            :
            null; //null when is empty
    }

    goToPosition(position) {

        if (this.presentPosition()) {
            this.positionContainer.length = 0;
        }

        if (position.entry) {
            position.entry(play);
        }

        this.positionContainer.push(position);
    }

    pushPosition(position) {
        this.positionContainer.push(position);
    }

    popPosition() {
            this.positionContainer.pop();
        }
        // GameBasics start - Starting the loop
    start() {

        setInterval(function() {
            gameLoop(play);
        }, this.setting.updateSeconds * 1000);

        this.goToPosition(new OpeningPosition());
    }

    keyDown(keyboardCode) {

        this.pressedKeys[keyboardCode] = true;

        if (this.presentPosition() && this.presentPosition().keyDown) {
            this.presentPosition().keyDown(this, keyboardCode);
        }
    }


    keyUp(keyboardCode) {

        delete this.pressedKeys[keyboardCode];
    }
}

// Game Loop
function gameLoop(play) {
    "use strict";
    let presentPosition = play.presentPosition();

    if (presentPosition) {
        // update
        if (presentPosition.update) {
            presentPosition.update(play);
        }
        // draw
        if (presentPosition.draw) {
            presentPosition.draw(play);
        }
    }
}

// Keyboard events listening
window.addEventListener("keydown", function(e) {
    const keyboardCode = e.which || event.keyCode; // Use either which or keyCode, depending on browser support
    if (keyboardCode == 37 || keyboardCode == 39 || keyboardCode == 32) {
        e.preventDefault();
    } //space/left/right (32/37/29)
    play.keyDown(keyboardCode);
});

window.addEventListener("keyup", function(e) {
    const keyboardCode = e.which || event.keyCode; // Use either which or keyCode, depending on browser support
    play.keyUp(keyboardCode);
});

// Create a GameBasics object
const play = new GameBasics(canvas);
play.sounds = new Sounds();
play.sounds.init();
play.start();