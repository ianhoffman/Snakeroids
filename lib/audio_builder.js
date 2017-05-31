class AudioBuilder {
  constructor() {
    this.volume = .5;
    this.createAudio = this.createAudio.bind(this);
  }

  createAudio(src, playbackRate) {
    const audio = document.createElement('audio');
    audio.src = src;
    if(playbackRate) {
      audio.playbackRate = playbackRate;
    }
    audio.volume = this.volume;
    audio.onended = () => document.body.removeChild('audio');
    return audio;
  }
}

export default AudioBuilder;