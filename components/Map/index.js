
'use strict';

import React from 'react-native';
import styles from '../../style';

export default class Map extends React.Component {
  static propTypes = {
    stations: React.PropTypes.array.isRequired
  };
  render = () => {
    return (
      <React.View style={styles.container}>
        <React.MapView style={styles.map} ></React.MapView>
      </React.View>
    );
  };
};
