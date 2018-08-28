import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
        <nav>
           <Link to='/' style={{padding:'20px'}}>Home</Link>
           <Link to='/library' style={{padding:'20px'}}>Library</Link>
         </nav>
          <h1 style={{color:'indigo', fontFamily:'Roboto', fontWeight: 500}}>B l o c J a m s</h1>
        </header>
      <main>
        <Route exact path="/" component={Landing} />
        <Route path="/library" component={Library} />
        <Route path="/album/:slug" component={Album} />
      </main>
      </div>
    );
  }
}

export default App;
