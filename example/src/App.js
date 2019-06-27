import React, { Component } from 'react';
import Startdeliver from 'react-startdeliver';

export default class App extends Component {
  componentDidMount() {
    // To get the script to accept usage events, initiate it with your usage id...
    Startdeliver.init('USAGE_ID', {
      debug: true, // optional. Default to false
      skipLoader: false // optional.  Default to false
    });

    // Call the function with sendEvent as first param and an object containing userId (the users email) and usageType
    // startdeliverUserFieldToMatchOn and timestamp are optional
    Startdeliver.send({
      userId: '3', // value of the 'startdeliverUserFieldToMatchOn' or userEmail
      usageType: 'viewInvoice',
      startdeliverUserFieldToMatchOn: 'id', // optional. Default to 'email'
      timestamp: 1560166342000 // optional. Detault to current time
    });

    // Call the function with sendEvent with default startdeliverUserFieldToMatchOn ( 'email' )
    Startdeliver.send({
      userId: 'user@test.com',
      usageType: 'viewInvoice',
    });
  }

  render() {
    return <div>Example of usage Startdeliver App</div>;
  }
}
