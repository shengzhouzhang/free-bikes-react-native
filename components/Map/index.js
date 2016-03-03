
import _ from 'lodash';
import React from 'react-native';
import styles from '../../style';
import SelectedStation from '../../stores/station';
import Direction from '../../components/Map/Direction';

const DEFAULT_ZOOM_LEVEL = .1;
const ZOOMED_IN = .01;
const STROKE_COLOR = '#cd5c5c';
const MAX_CIRCLE_SIZE = 15;
const MIN_CIRCLE_SIZE = 5;

export default class Map extends React.Component {
  static propTypes = {
    region: React.PropTypes.object.isRequired,
    name: React.PropTypes.string.isRequired,
    stations: React.PropTypes.array.isRequired
  };
  static defaultProps = {
    region: {
      latitude: -37.83,
      longitude: 144.96,
      latitudeDelta: DEFAULT_ZOOM_LEVEL,
      longitudeDelta: DEFAULT_ZOOM_LEVEL
    },
    name: 'melbourne city',
    showDirection: false
  };
  state = { region: this.props.region, name: '' };
  render = () => {
    return (
      <React.View style={styles.container}>
        <React.MapView style={styles.map}
          region={this.state.region}
          rotateEnabled={false}
          overlays={this.parseEntitiesToOverlays(this.props.stations)}
          >
        </React.MapView>
        { this.state.showDirection ? (<Direction address={this.state.name} />) : (undefined) }
      </React.View>
    );
  };
  componentDidMount = () => {
    this.unsubscribe = SelectedStation.subscribe(() => {
      this.onSelectStationHandler();
    });
  };
  componentWillUnmount = () => {
    this.unsubscribe();
  };
  onSelectStationHandler = () => {
    let selected = SelectedStation.getState();
    let station = _.find(this.props.stations, station => {
      return !!selected && station.id === selected.id;
    });
    this.setState({
      region: {
        latitude: station.position.lat,
        longitude: station.position.lng,
        latitudeDelta: ZOOMED_IN,
        longitudeDelta: ZOOMED_IN
      },
      name: station.name,
      showDirection: true
    });
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
