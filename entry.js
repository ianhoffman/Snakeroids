import GameView from './lib/game_view.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    canvas.style.width = "800px";
    canvas.style.height = "800px";

    const ctx = canvas.getContext('2d');
    canvas.webkitImageSmoothingEnabled = false;
    canvas.mozImageSmoothingEnabled = false;
    canvas.imageSmoothingEnabled = false;
    
    const game = new GameView(ctx);
    game.start();
});