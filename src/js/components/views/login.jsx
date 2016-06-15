import React from 'react';
import { Link } from 'react-router';
import RedHeader from '../red-header.jsx';
import BaseButton from '../base-button.jsx';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

var Login = React.createClass({
  getInitialState: function() {
    return {
      userType: ""
    };
  },

  selectorChange: function(event, index, value) {
    this.setState({
      userType: value
    })
  },

  renderUserLink: function() {
    if(this.state.userType === 'piccniccer') {
      return <BaseButton buttonLink={"/piccniccer-orders"} buttonText={"Piccniccer Login"}/>
    } else if (this.state.userType === 'retailer'){
      return <BaseButton buttonLink={"/retailer-orders"} buttonText={"Retailer Login"}/>
    } else {
      return <BaseButton buttonLink={"/"} buttonText={"Login"}/>
    }
  },

  render: function() {
    return (
      <div>
        <div className="custom-container">
          <RedHeader text={"Piccnicc"} iconRight={""} iconLeft={""} />

          <div className="row login-container">
            <div className="center-align">
              <div className="row">
                <SelectField className="dropdown" value={this.state.userType} floatingLabelText="Username" onChange={this.selectorChange}>
                    <MenuItem value="piccniccer" primaryText="Piccniccer" />
                    <MenuItem value="retailer" primaryText="Retailer" />
                </SelectField >
              </div>
              <div className="row">
                <TextField id="password" hintText="Password" floatingLabelText="Password" />
              </div>
            </div>
          </div>

          {this.renderUserLink()}
      </div>
    </div>
    );
  }
});

module.exports = Login;
