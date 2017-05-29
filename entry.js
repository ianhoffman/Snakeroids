import GameView from './lib/game_view.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    canvas.style.width = "800px";
    canvas.style.height = "800px";
    const ctx = canvas.getContext('2d');

    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    
    const game = new GameView(ctx);
    game.start();
});