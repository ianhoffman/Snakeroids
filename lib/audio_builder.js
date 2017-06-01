class AudioBuilder {
  constructor() {
    this.volume = .5;
    this.createAudio = this.createAudio.bind(this);
    this.createBackgroundMusic = this.createBackgroundMusic.bind(this);
    this.backgroundMusic = this.createBackgroundMusic();
    this.backgroundMusic.play();

    document.getElementsByClassName('fa')[0].addEventListener('click', e => {
      e.preventDefault();
      if(this.volume === 0) {
        this.volume = .2;
        this.backgroundMusic.volume = .7;
        e.target.classList.remove('fa-volume-off');
        e.target.classList.add('fa-volume-up');
      } else {
        this.volume = 0;
        this.backgroundMusic.volume = 0;
        e.target.classList.remove('fa-volume-up');
        e.target.classList.add('fa-volume-off');
      }
    });
  }

  createAudio(src, playbackRate) {
    const audio = document.createElement('audio');
    audio.src = src;
    if(playbackRate) {
      audio.playbackRate = playbackRate;
    }
    document.body.appendChild(audio);
    audio.volume = this.volume;
    audio.onended = () => document.body.removeChild(audio);
    return audio;
  }

  createBackgroundMusic(src) {
    this.backgroundMusic = document.createElement('audio');
    this.backgroundMusic.src = 'sounds/background-music.mp3';
    this.backgroundMusic.volume = .5;
    // document.body.appendChild(this.backgroundMusic);
    this.backgroundMusic.onended = () => this.backgroundMusic.play();
    return this.backgroundMusic;
  }
}

export default AudioBuilder;