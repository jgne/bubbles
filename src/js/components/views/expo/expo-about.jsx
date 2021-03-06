import React from 'react';
import Header from '../../header.jsx';
import { Link } from 'react-router';


var ExpoAbout = React.createClass({
  render: function() {
    var burgerMenuOptions = ["About+/expo-about", "FAQ+/expo-faq"]

    return (
      <div>
        <Header headerTheme={"whiteNav"} text={"About"} iconRight={"menu"} iconLeft={"arrow_back"} burgerMenuOptions={burgerMenuOptions}/>
        <div className="center-align desktop-container">
          <div className="content-container margin-all">
            <p>Piccnicc is an online ordering service, which delivers delicious food from nearby restaurants to exhibitors and attendees.</p>
            <p>Whether you're stuck to your stand or just don't want to wait in line for a blandwich, Piccnicc will bring you your choice of food, when you want it.*</p>
            <p>So, what are you waiting for? </p>
            <Link to="/">
              <div className="red-button btn about-place-order">Place your order now</div>
            </Link>

            <p><i>* Orders must be placed at least 45 minutes before requested delivery time. No maximum time limit</i></p>
            <div className="piccnicc-sig-style">
              <img className="logo-container" src="/piccnicclogo.png" alt="Piccnicc Logo"></img>
              <p className="piccnicc-slogan">Hampers of Happiness, Delivered</p>
              <p>Click for our <Link className="link-text" to="/expo-terms">Terms & Conditions</Link> and <Link className="link-text" to="/expo-privacy">Privacy Policy</Link></p>
              <p>Follow us on <a href='https://twitter.com/piccniccapp' target='_blank'>twitter.com/piccniccapp</a> #nomoregreychicken</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ExpoAbout;
