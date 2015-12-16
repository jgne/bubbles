import React from 'react';
import { Link } from 'react-router';

let MenuComponent = require('../menu.jsx');

var Menu = React.createClass({

  getStructuredMenu: function() {

    var filterer = this.props.helpers.filterMenu;
    var structurer = this.props.helpers.orderMenu;
    var filteredMenu =
      filterer(this.props.basket, this.props.tagName, this.props.tagValue);
    if (this.props.tagName === "restaurant"){
      return structurer(filteredMenu, "foodType");
    } else {
      return structurer(filteredMenu, "restaurant");
    }
  },

  render: function() {
    var menu = this.getStructuredMenu();

    return (
      <div>
        <MenuComponent menu={menu} actions={this.props.actions} />
        <Link to="/basket/page">Basket</Link>
      </div>
    );
  }
});

module.exports = Menu;