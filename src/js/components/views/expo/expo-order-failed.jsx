import React from 'react';
import { Link } from 'react-router';
import Header from '../../header.jsx';

var ExpoOrderFailedPage = React.createClass({

  render: function() {

    var burgerMenuOptions = ["About+/about", "Create Order+/", "Piccnicc Point+/map-view", "Order History+/order-history", "Logout+/login"]

    return (

    <div className="custom-container desktop-container">
      <Header headerTheme={"whiteNav"} text={"Order Confirmed"} iconRight={"menu"} iconLeft={"arrow_back"} burgerMenuOptions={burgerMenuOptions}/>
      <div className="order-confirmed-container center-align">

        <p>There was an issue with your payment, please try again.</p>

          <div className="">
            <img className="logo-container" src="/piccnicclogo.png" alt="Piccnicc Logo"></img>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = ExpoOrderFailedPage