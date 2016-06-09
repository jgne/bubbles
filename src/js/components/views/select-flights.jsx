import React from 'react';
import { Link } from 'react-router';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

//import areIntlLocalesSupported from 'intl-locales-supported';

let FlightData  = require('../../data/flight-data.js');
let DateTimeFormat;

// if (areIntlLocalesSupported('en-GB')) {
//   DateTimeFormat = global.Intl.DateTimeFormat;
// } else {
//   const IntlPolyfill = require('intl');
//   require('intl/locale-data/jsonp/en-GB');
//
//   DateTimeFormat = IntlPolyfill.DateTimeFormat;
// }


var renderInputFields = function(details) {
  return details.map(function(detail) {
    return (
      <MenuItem key={detail} value={detail} primaryText={detail} />
    )
  })
}

//Seclect Airline - Select Date and Select Flight are nested inside
let SelectAirline = React.createClass({
  getInitialState: function() {
    return {
      selectedAirline: ""
    };
  },

  selectorChange: function(event, index, value) {
    this.setState({
      selectedAirline: value
    })
    var airline = value.replace(/\s+/g, '')
    var terminal = FlightData.flightsByAirline[airline].terminal
    this.props.setTerminal(terminal);
  },

  renderFlightDate: function(){
    if(this.state.selectedAirline !== ""){
      return <SelectDate setTerminal={this.props.setTerminal} selectedAirline={this.state.selectedAirline}/>
    } else {
      return (<div></div>)
    }
  },

  render: function() {
    return (
    <div className="center-align">
      <SelectField className="dropdown" value={this.state.selectedAirline} floatingLabelText="Select Airline" onChange={this.selectorChange}>
        {renderInputFields(FlightData.airlineOptions)}
      </ SelectField>
        {this.renderFlightDate()}
    </div>
    )
  }
});


//Select Date function, data not linked to anthing
let SelectDate = React.createClass({
  getInitialState: function(date) {
    return {
      selectedDate: 2
    };
  },

  datePickerChange: function(event, date) {
    this.setState({
      selectedDate: date
    })
  },
  renderFlightNumber: function() {
    if(this.state.selectedDate !== 2) {
      return <SelectFlightNumber selectedAirline={this.props.selectedAirline} selectedDate={this.state.selectedDate}/>
    } else {
      return (<div></div>)
    }
  },

  render:function() {
    return(
      <div className="center-align">
        <div className="date-picker-container">
          <DatePicker
            hintText="Select the date of your flight"
            onChange={this.datePickerChange}
           />
        </div>
        {this.renderFlightNumber()}
      </div>
    )
  }
});

//Select Flight Number, looks up in JSON object
let SelectFlightNumber = React.createClass({
  getInitialState: function() {
    return {
      selectedFlightNumber: "",
      lookUpAirline: this.props.selectedAirline,
      date: this.props.selectedDate
    };
  },
  componentWillReceiveProps: function(newProps) {
    this.setState({
      lookUpAirline: newProps.selectedAirline,
      date: newProps.selectedDate,
      selectedFlightNumber: ""
    })
  },

  selectorChange: function(event, index, value) {
    this.setState({
      selectedFlightNumber: value,
    })
  },
  renderCorrespondingFlightNumbers: function() {
    var airline = (this.state.lookUpAirline).replace(/\s+/g, '');
    var correspondingFlights = FlightData.flightsByAirline[airline].flightNumbers;

    return (
      correspondingFlights
    )
  },

  renderFullFlightDetails: function() {
    if(this.state.selectedFlightNumber === ""){
      return (<div></div>)
    } else {
    var airlineSpace = this.state.lookUpAirline
    var airline = (this.state.lookUpAirline).replace(/\s+/g, '');
    var flight = this.state.selectedFlightNumber
    var date = (this.state.date).toUTCString().split('23:00')[0];
    var flightLookUp = FlightData.flightsByAirline[airline][flight]

    if(flightLookUp.Status === "Approved") {
      return (
        <div className="flight-detail-container">
          <div className="">
            <div className="center-align">
              <p className="flight-detail flight-detail-label">{airlineSpace} | {flight}</p>
              <p className="flight-detail"><span className="flight-detail-label">From: </span> LGW London Gatwick</p>
              <p className="flight-detail"><span className="flight-detail-label">To: </span> {flightLookUp.To}</p>
              <p className="flight-detail"><span className="flight-detail-label">On: </span> {date}</p>
              <p className="flight-detail"><span className="flight-detail-label">Time: </span> {flightLookUp.Time}</p>
              <p className="flight-detail" id="gate"><span className="flight-detail-label">Gate: </span> [tbc]</p>
            </div>
        </div>
      </div>
      )
    } else {
      return (
        <div>
          <p className = 'view-text'> Your flight departs in less than one hour. Unfortunately, that doesn't give us quite enough time to have your order made up, collected and delivered in good time for you to board, so we can't accept your order this time.
            Please try again next time you fly, just give us a little bit more notice - you can book any time up to 60 minutes before scheduled take-off.

            Have  a safe flight,

            Piccnicc
          </p>
        </div>
      )
    }
  }
  },

  render:function() {
    return(
      <div>
        <SelectField className="dropdown" value={this.state.selectedFlightNumber} floatingLabelText="Select Flight" onChange={this.selectorChange}>
          {renderInputFields(this.renderCorrespondingFlightNumbers())}
        </ SelectField>
        <div className="">
          {this.renderFullFlightDetails()}
        </div>
      </div>
    )
  }
})




//Overall Component, exported funciton
let flightDetails = React.createClass({
  render: function() {
    return (
      <div>
        <div className="">
          <SelectAirline setTerminal={this.props.setTerminal}/>
        </div>
        <Link to='/basket/select-restaurant'>
          <div className="btn-large base-button"> NEXT </div>
        </Link>
    </div>
    )
  }
})

module.exports = flightDetails