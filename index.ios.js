
'use strict';

import React from 'react-native';
import BikesApp from './src/components/App/Bikes';
import BikesRepository from './src/repositories/Bikes';

class App extends React.Component {
  render = () => {
    return (<BikesApp bikesRepository={new BikesRepository(fetch)} />);
  };
}

React.AppRegistry.registerComponent('bikeShare', () => App);
