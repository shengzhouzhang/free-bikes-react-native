
'use strict';

import React from 'react-native';
import SearchTool from '../../components/SearchTool';
import Map from '../../components/Map';
import styles from '../../style';
import { parseRawToEntities } from '../../utils/parser';
import raw from '../../data/bikes.json';

let stations = parseRawToEntities(raw);

export default class BikeApp extends React.Component {
  render = () => {
    return (
      <React.View style={styles.container}>
        <Map stations={stations} />
        <SearchTool stations={stations} />
      </React.View>
    );
  };
}
