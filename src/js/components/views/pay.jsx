import React from 'react';
import { Link } from 'react-router';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

let Page = React.createClass({

  getInitialState: function() {
    return {
      cardSelected: false,
      card: ""
    };
  },

  onChange: function(event, index, value) {
    this.setState({
      cardSelected: true,
      card: value
    });
  },

  renderCVV: function () {
    if(this.state.cardSelected) {
      return (
        <div className="input-field cvv-input-div">
          <input id="cvv-input" type="text" />
          <label>CVV</label>
        </div>
      )
    }
  },

  render: function() {
    return (

      <div>
        <div className="center-align">
          <SelectField className="dropdown" value={this.state.card} floatingLabelText="Select a Card" onChange={this.onChange}>
            <MenuItem value="Visa ending in --1234" primaryText="Visa ending in --1234" />
            <MenuItem value="Mastercard ending in --5678" primaryText="Mastercard ending in --5678" />
          </SelectField >
        </div>

        {this.renderCVV()}

        <Link to="/order-confirmation">
          <div className="btn-large base-button"> PAY </div>
        </Link>

      </div>
    );
  }
});

module.exports = Page;
