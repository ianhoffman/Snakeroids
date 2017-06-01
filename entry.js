import GameView from './lib/game_view.js';
import AudioBuilder from './lib/audio_builder.js';

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
    
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    if (canvas.width  !== displayWidth ||
        canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }

    let firstEnter = true;
    window.addEventListener('keypress', e => {
        if(e.keyCode === 13 && firstEnter) {
            firstEnter = false;
            showInstructions(document.getElementById('start-button'), canvas, audioBuilder);
        } else if(e.keyCode) {
            showGame(document.getElementById('start-button'), canvas, audioBuilder);
        }
    });

    document.getElementsByClassName('title-container')[0].addEventListener('click', e => {
            e.preventDefault();
            if(e.target.id==='start-button') {
                showInstructions(e.target, canvas, audioBuilder);
            }
    });
});

const showInstructions = (startButton, canvas, audioBuilder) => {
    startButton.id = '';
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
    const game = new GameView(canvas, audioBuilder);
    document.getElementById('instructions-container').style.display = 'none';
    startButton.id = '';
    game.start();
};
