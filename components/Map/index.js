
import _ from 'lodash';
import React from 'react-native';
import styles from '../../style';

const DEFAULT_ZOON_LEVEL = .1;

export default class Map extends React.Component {
  static propTypes = {
    region: React.PropTypes.object.isRequired,
    stations: React.PropTypes.array.isRequired
  };
  static defaultProps = {
    region: {
      latitude: -37.83,
      longitude: 144.96,
      latitudeDelta: DEFAULT_ZOON_LEVEL,
      longitudeDelta: DEFAULT_ZOON_LEVEL
    }
  };
  render = () => {
    return (
      <React.View style={styles.container}>
        <React.MapView style={styles.map}
          region={this.props.region}
          rotateEnabled={false}
          annotations={this.parseEntitiesToAnnotations(this.props.stations)} >
        </React.MapView>
      </React.View>
    );
  };
  parseEntitiesToAnnotations = (entities) => {
    return _.map(entities, entity => {
      return {
        title: entity.name,
        latitude: entity.position.lat,
        longitude: entity.position.lng
      }
    });
  };
};
