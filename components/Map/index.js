
'use strict';

import React from 'react-native';
import styles from '../../style';

export default class Map extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isFirstLoad: true,
      mapRegion: undefined,
      mapRegionInput: undefined,
      annotations: []
    };
  }

  render() {
    return (
      <React.View style={styles.container}>
        <React.MapView style={styles.map} ></React.MapView>
      </React.View>
    );
  }
}
