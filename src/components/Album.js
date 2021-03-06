import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import '../index.css';

class Album extends Component {
  constructor(props) {
    super(props);

  const album = albumData.find( album => {
    return album.slug === this.props.match.params.slug
  });

  this.state = {
    album: album,
    currentSong: album.songs[0],
    currentTime: 0,
    duration: album.songs[0].duration,
    isPlaying: false,
    isHovered: false
  };

  this.audioElement = document.createElement('audio');
  this.audioElement.src = album.songs[0].audioSrc;

}

play() {
  this.audioElement.play();
  this.setState({ isPlaying: true });
}

pause() {
  this.audioElement.pause();
  this.setState({ isPlaying: false });
}

componentDidMount() {
  this.eventListeners = {
    timeupdate: e => {
      this.setState({ currentTime: this.audioElement.currentTime });
    },
    durationchange: e => {
      this.setState({ duration: this.audioElement.duration });
    }
  };
  this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
  this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
}

componentWillUnmount() {
     this.audioElement.src = null;
     this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
   }

setSong(song) {
  this.audioElement.src = song.audioSrc;
  this.setState({ currentSong: song });
}

handleSongClick(song) {
  const isSameSong = this.state.currentSong == song;
  if (this.state.isPlaying && isSameSong) {
    this.pause();

  } else {
    if (!isSameSong) { this.setSong(song); }
    this.play();
  }
}

songDisplay(song) {
  const isSameSong = this.state.currentSong == song;
  if (this.state.isPlaying && isSameSong) {
    return 'ion-pause';
  } else if (this.isHovered) {return 'ion-play'
} else return 'song-number'
}

handlePrevClick() {
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
     const newIndex = Math.max(0, currentIndex - 1);
     const newSong = this.state.album.songs[newIndex];
     this.setSong(newSong);
     this.play(newSong);
}

handleNextClick() {
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
  const newIndex = Math.min(4, currentIndex + 1);
  const newSong = this.state.album.songs[newIndex];
  this.setSong(newSong);
  this.play(newSong);
}

handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

formatTime(timeInSeconds) {
  timeInSeconds = Number(timeInSeconds);
  const timeInMinutes = Math.floor(timeInSeconds/60);
  const remainingSeconds = Math.floor(timeInSeconds%60);
  if (typeof timeInSeconds !== 'number') {
    return "--:--"
  } else if
    (remainingSeconds < 10) {
    return `${(timeInMinutes)}:0${(remainingSeconds)}`
      }
  else return `${(timeInMinutes)}:${(remainingSeconds)}`
}

  render() {
    return (

      <section className="albumDisplay">
        <section id="album-info">
         <img id="album-cover-art" src={this.state.album.albumCover} className="albumDisplayCover" />
         <div className="album-details">
          <h2 id="album-title" style={{color:'indigo', fontFamily:'Roboto', fontWeight: 600, }}>{this.state.album.title}</h2>
          <h2 className="artist" style={{color:'indigo', fontFamily:'Roboto', fontWeight: 200, }}>{this.state.album.artist}</h2>
          <h4 id="release-info" style={{color:'indigo', fontFamily:'Roboto', fontWeight: 200, }}>{this.state.album.releaseInfo}</h4>
        </div>
        </section>
        <table id="song-list">
          <colgroup>
          <col id="song-number-column" />
           <col id="song-title-column"/>
           <col id="song-duration-column"/>
         </colgroup>

         <tbody>
            {this.state.album.songs.map( (song, index) =>
              <tr className="song" key={index} onClick={() => this.handleSongClick(song)}
                    onMouseEnter={() => this.setState({isHovered: index+1})}
                    onMouseLeave={() => this.setState({isHovered: false})}>
                  <td className="song-actions">

                  <button id="song-action-btns" className="mdl-button mdl-js-button mdl-button--accent">
                  <i className="material-icons">play</i>
                           { (this.state.currentSong.title === song.title) ?
                           <span className={this.state.isPlaying ? "ion-pause" : "ion-play"}></span>
                           :
                           (this.state.isHovered === index+1) ?
                           <span className="ion-play"></span>
                           :
                           <span className="song-number">{index+1}</span>
                          }
                   </button>

                  </td>
                <td className="song-title">{song.title}</td>
                <td className="song-duration">{this.formatTime(song.duration)}</td>
              </tr>
            )}
          </tbody>
       </table>
       <PlayerBar
                  isPlaying={this.state.isPlaying}
                  currentSong={this.state.currentSong}
                  currentTime={this.audioElement.currentTime}
                  duration={this.audioElement.duration}
                  formatTime={(timeInSeconds) => this.formatTime(timeInSeconds)}
                  handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                  handlePrevClick={() => this.handlePrevClick()}
                  handleNextClick={ () => this.handleNextClick()}
                  handleTimeChange={(e) => this.handleTimeChange(e)}
                />
      </section>
    );
  }
}
export default Album;
