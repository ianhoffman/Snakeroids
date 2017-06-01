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
    
  // Lookup the size the browser is displaying the canvas.
    var displayWidth  = canvas.clientWidth;
    var displayHeight = canvas.clientHeight;
 
  // Check if the canvas is not the same size.
    if (canvas.width  !== displayWidth ||
        canvas.height !== displayHeight) {
 
    // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }

    document.getElementsByClassName('title-container')[0].addEventListener('click', e => {
            e.preventDefault();
            if(e.target.id==='start-button') {
                e.target.id = '';
                const titleContainer = e.target.parentElement;
                titleContainer.style.display = 'none';
                document.getElementsByClassName('top-links')[0].style.display = 'flex';
                document.getElementById('instructions-container').style.display = 'flex';
                document.getElementById('start-button').addEventListener('click', e2 => {
                    e2.preventDefault();
                    const game = new GameView(canvas, audioBuilder);
                    document.getElementById('instructions-container').style.display = 'none';
                    e2.target.id = '';
                    game.start();
                });
            }
    });
});
