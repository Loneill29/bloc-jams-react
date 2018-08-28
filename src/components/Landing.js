import React from 'react';


const Landing = () => (
  <section className="landing">
    <h2 className="hero-title" style={{color:'indigo', fontFamily:'Roboto', fontWeight: 300}}>Turn the music up!</h2>

    <section className="selling-points">
      <div className="point">
        <h3 className="point-title" style={{color:'indigo', fontFamily:'Roboto', fontWeight: 300}}>Choose your music</h3>
        <p className="point-description" style={{color:'indigo', fontFamily:'Roboto', fontWeight: 300}}>The world is full of music; why should you have to listen to music that someone else chose?</p>
      </div>
      <div className="point">
        <h3 className="point-title" style={{color:'indigo', fontFamily:'Roboto', fontWeight: 300}}>Unlimited, streaming, ad-free</h3>
        <p className="point-description" style={{color:'indigo', fontFamily:'Roboto', fontWeight: 300}}>No arbitrary limits. No distractions.</p>
      </div>
      <div className="point">
        <h3 className="point-title" style={{color:'indigo', fontFamily:'Roboto', fontWeight: 300}}>Mobile enabled</h3>
        <p className="point-description" style={{color:'indigo', fontFamily:'Roboto', fontWeight: 300}}>Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
      </div>
    </section>
 </section>

);

export default Landing;
