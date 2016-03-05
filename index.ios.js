
'use strict';

import React from 'react-native';
import BikeApp from './src/components/App/Bike';

class App extends React.Component {
  render = () => {
    return (<BikeApp fetch={fetch} />);
  };
};

React.AppRegistry.registerComponent('bikeShare', () => App);
