import React from 'react';
// import ChatBox from './Chat/ChatBox.jsx';
import HeroBG from './Hero';
import '../../styles/welcome.styl';
const logoImage = require('../../img/undraw_dreamer_gxxi.svg');
require('../../img/bubble.jpg');





export default function Welcome() {


  return (
    <div className="welcome-container">


      <header >
        <div className="header-text">
          <h1>Our focus is to help our students learn better in this modern day.</h1>
          <p className="hide-on-mobile">Talking Cloud is in the process of creating something amazing. Registrations are not yet available, but you can sign up for our
          newsletter to stay up-to-date!</p>
        </div>

        <div className="home-nav">
          <div className="home-left">

            <iframe src="https://cdn.forms-content.sg-form.com/79ee141a-73c6-11eb-ac8b-66afe12ce720" />
          </div>

          <div className="home-right">
            <img src={logoImage.default} alt="relax and wait" />
            <p className="hide-on-mobile">Do you want to hear a construction joke?</p>
            <p className="hide-on-mobile">Sorry, I'm still working on it.</p>
          </div>
        </div>



      </header>
    </div>
  );

}
