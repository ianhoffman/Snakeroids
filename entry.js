import GameView from './lib/game_view.js';

const instructions = (ctx) => {
    const startModal = document.getElementById('start-modal');
    startModal.innerHTML = "<h2>Collect the power-ups and avoid the asteroids to win!</h2>" + 
    "<ul><li>Two power-ups: extra torque!</li>" +
    "<li>Four power-ups: speed boosters!</li>" +
    "<li>Six power-ups: shield!</li>" + 
    "<li>Six power-ups: lasers!</li>" + 
    "<li>Ten power-ups: You win!</li></ul>" + 
    "<button id='start-button'>Start</button>"; 

    document.getElementById('start-button').addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('main').removeChild(
            document.getElementsByClassName('start-modal-container')[0]);
        const game = new GameView(ctx);
        game.start();
    });
};

const startMessage = (ctx) => {
    const startModalContainer = document.createElement('div');
    startModalContainer.className = 'start-modal-container';
    document.querySelector('main').appendChild(startModalContainer);
    const startModal = document.createElement('div');
    startModal.id = 'start-modal';
    startModalContainer.appendChild(startModal);

    const line1 = document.createElement('h1');
    line1.innerHTML = "Welcome to Snakeroids:";
    const line2 = document.createElement('h2');
    line2.innerHTML = "A mash-up of two classic arcade games.";
    const startButton = document.createElement('button');
    startButton.innerHTML = "Let's Go!";

    startModal.appendChild(line1);
    startModal.appendChild(line2);
    startModal.appendChild(startButton);
    startButton.id = 'start-button';

    const startListener = startButton.addEventListener('click', e => {
        e.preventDefault();
        e.target.innerHTML = 'start';
        e.target.removeEventListener('click', startListener);
        instructions(ctx);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');

    const ctx = canvas.getContext('2d');
    canvas.webkitImageSmoothingEnabled = false;
    canvas.mozImageSmoothingEnabled = false;
    canvas.imageSmoothingEnabled = false;

    startMessage(ctx);
});
