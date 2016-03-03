
import _ from 'lodash';
import React from 'react-native';
import styles from '../../style';

const DEFAULT_ZOON_LEVEL = .1;
const STROKE_COLOR = '#cd5c5c';
const MAX_CIRCLE_SIZE = 15;
const MIN_CIRCLE_SIZE = 5;

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
          overlays={this.parseEntitiesToOverlays(this.props.stations)}
          >
        </React.MapView>
      </React.View>
    );
  };
  parseEntitiesToAnnotations = (entities) => {
    return _.map(entities, entity => {
      return {
        title: entity.name,
        latitude: entity.position.lat,
        longitude: entity.position.lng,
        animateDrop: true
      }
    });
  };
  parseEntitiesToOverlays = (entities) => {
    let largest = _.maxBy(entities, entity => entity.numberOfBikes).numberOfBikes;
    return _.map(entities, entity => {
      return {
        id: entity.id,
        coordinates: [{
          latitude: entity.position.lat,
          longitude: entity.position.lng,
        }],
        lineWidth: this.getOverlaySize(entity.numberOfBikes, largest),
        strokeColor: STROKE_COLOR
      }
    });
  };
  getOverlaySize = (numberOfBikes, largest) => {
    return MIN_CIRCLE_SIZE + (numberOfBikes / largest) * (MAX_CIRCLE_SIZE - MIN_CIRCLE_SIZE);
  };
};
