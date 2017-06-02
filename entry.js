import GameView from './lib/game_view.js';
import AudioBuilder from './lib/audio_builder.js';

var firstEnter = true;
var secondEnter = false;
var game;
var gameStarted = false;

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');

    const audioBuilder = new AudioBuilder();

    const githubLinks = document.querySelectorAll('.fa-github');
    for(let i = 0; i < githubLinks.length; i++) {
        githubLinks[i].addEventListener('click', e => {
            window.location = 'https://github.com/ianhoffman/SpaceExplorer';
        });
    }
    
    const linkedinLinks = document.querySelectorAll('.fa-linkedin');
    for(let j = 0; j < linkedinLinks.length; j++) {
        linkedinLinks[j].addEventListener('click', e => {
            window.location = 'https://www.linkedin.com/in/hoffmanian/';
        });
    }
    
    let displayWidth  = canvas.clientWidth;
    let displayHeight = canvas.clientHeight;
    var oldWidth, delta; 
    if (canvas.width  !== displayWidth ||
        canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }

    window.addEventListener('resize', e => {
        e.preventDefault();
        displayWidth  = canvas.clientWidth;
        displayHeight = canvas.clientHeight;
        if (canvas.width  !== displayWidth ||
        canvas.height !== displayHeight) {
            setTimeout(() => {
                canvas.width = displayWidth;
                canvas.height = displayHeight;
                if(game) {
                    game.game.DIM_X = canvas.width;
                    game.game.DIM_Y = canvas.height;
                }
            }, 10);
        }
    });

    window.addEventListener('keypress', e => {
        if(e.keyCode === 13 && firstEnter) {
            showInstructions(document.getElementById('start-button'), canvas, audioBuilder);
        } else if(e.keyCode === 13 && secondEnter) {
            showGame(document.getElementById('start-button'), canvas, audioBuilder);
        }
    });

    document.getElementsByClassName('title-container')[0].addEventListener('click', e => {
        e.preventDefault();
        if(e.target.id==='start-button' && gameStarted === false) {
            showInstructions(e.target, canvas, audioBuilder);
        }
     });
});

const showInstructions = (startButton, canvas, audioBuilder) => {
    startButton.id = '';
    firstEnter = false;
    secondEnter = true;
    const titleContainer = startButton.parentElement;
    titleContainer.style.display = 'none';
    document.getElementsByClassName('top-links')[0].style.display = 'flex';
    document.getElementById('instructions-container').style.display = 'flex';
    document.getElementById('start-button').addEventListener('click', e2 => {
        e2.preventDefault();
        showGame(e2.target, canvas, audioBuilder);
    });
};

const showGame = (startButton, canvas, audioBuilder) => {
    if(!gameStarted) {
        game = new GameView(canvas, audioBuilder);
        secondEnter = false;
        gameStarted = true;
        document.getElementsByClassName('left-links')[0].style.display = 'flex';
        document.getElementById('instructions-container').style.display = 'none';
        game.start();
    }
};
