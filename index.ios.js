
'use strict';

import React from 'react-native';
import BikeApp from './src/components/App/Bike';
import BikesRepository from './src/repositories/bikes';

class App extends React.Component {
  render = () => {
    return (<BikeApp bikesRepository={new BikesRepository(fetch)} />);
  };
}

React.AppRegistry.registerComponent('bikeShare', () => App);
