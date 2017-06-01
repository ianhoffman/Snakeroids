class AudioBuilder {
  constructor() {
    this.volume = .2;
    this.createAudio = this.createAudio.bind(this);
    
    document.getElementsByClassName('fa')[0].addEventListener('click', e => {
      e.preventDefault();
      if(this.volume === 0) {
        this.volume = .2;
        e.target.classList.remove('fa-volume-off');
        e.target.classList.add('fa-volume-up');
      } else {
        this.volume = 0;
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
    audio.volume = this.volume;
    audio.onended = () => document.body.removeChild(audio);
    return audio;
  }
}

export default AudioBuilder;