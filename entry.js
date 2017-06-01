import GameView from './lib/game_view.js';
import AudioBuilder from './lib/audio_builder.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');

    const audioBuilder = new AudioBuilder();

    document.getElementsByClassName('title-container')[0].addEventListener('click', e => {
            e.preventDefault();
            if(e.target.id==='start-button') {
                e.target.id = '';
                const titleContainer = e.target.parentElement;
                titleContainer.style.display = 'none';
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
