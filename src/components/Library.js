import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import '../index.css';


class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
    return (
      <section className='library'>
        {
          this.state.albums.map( (album, index) =>
             <Link to={`/album/${album.slug}`} key={index}>
             <img src={album.albumCover} alt={album.title} className="albumCover" />
             <div className='albums' style={{color:'indigo', fontFamily:'Roboto', fontWeight: 200 }}>
             <h2>{album.title}</h2>
             <h3>{album.artist}</h3>
             <h4>{album.songs.length} songs</h4>
             </div>
            </Link>
          )
        }
      </section>
    );
  }
}

export default Library;
