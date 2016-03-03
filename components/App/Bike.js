
'use strict';

import React from 'react-native';
import SearchTool from '../../components/SearchTool';
import Map from '../../components/Map';
import styles from '../../style';

export default class BikeApp extends React.Component {
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
        <Map />
        <SearchTool />
      </React.View>
    );
  }
}
