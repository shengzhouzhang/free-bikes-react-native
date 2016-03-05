
import _ from 'lodash';
import React from 'react-native';
import styles from '../../style';
import SelectedStation from '../../stores/station';
import Direction from '../../components/Map/Direction';

const DEFAULT_ZOOM_LEVEL = .1;
const ZOOMED_IN = .01;
const STROKE_COLOR = '#cd5c5c';
const STROKE_COLOR_EMPTY = '#cd5c5c';
const MAX_CIRCLE_SIZE = 15;
const MIN_CIRCLE_SIZE = 5;

export default class Map extends React.Component {
  static propTypes = {
    region: React.PropTypes.object,
    name: React.PropTypes.string,
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
  state = { region: this.props.region, name: this.props.name };
  render = () => {
    return (
      <React.View style={styles.container}>
        <React.MapView style={styles.map}
          region={this.state.region}
          rotateEnabled={false}
          overlays={this.parseEntitiesToOverlays(this.props.stations)}
        />
        { this.state.showDirection ? (<Direction address={this.state.name} />) : (undefined) }
      </React.View>
    );
  };
  componentDidMount = () => {
    this.unsubscribe = SelectedStation.subscribe(() => {
      this.onSelectStationHandler(SelectedStation.getState());
    });
  };
  componentWillUnmount = () => {
    this.unsubscribe();
  };
  onSelectStationHandler = (selectedStation) => {
    let station = _.find(this.props.stations, station => {
      return !!selectedStation && station.id === selectedStation.id;
    });
    this.setState({
      region: {
        latitude: station.latitude,
        longitude: station.longitude,
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
        latitude: entity.latitude,
        longitude: entity.longitude
      }
    });
  };
  parseEntitiesToOverlays = (entities) => {
    let largest = _.maxBy(entities, entity => entity.numberOfBikes).numberOfBikes;
    return _.map(entities, entity => {
        return {
          id: entity.id,
          coordinates: [{
            latitude: entity.latitude,
            longitude: entity.longitude,
          }],
          lineWidth: this.getOverlaySize(entity.numberOfBikes, largest),
          strokeColor: entity.numberOfBikes ? STROKE_COLOR : STROKE_COLOR_EMPTY
        }
      });
  };
  getOverlaySize = (numberOfBikes, largest) => {
    if (largest && numberOfBikes >= largest) { return MAX_CIRCLE_SIZE; }
    if (numberOfBikes <= 0) { return MIN_CIRCLE_SIZE; }
    if (largest <= 0) { return MIN_CIRCLE_SIZE; }
    return _.max([ MIN_CIRCLE_SIZE + (numberOfBikes / largest) * (MAX_CIRCLE_SIZE - MIN_CIRCLE_SIZE), MIN_CIRCLE_SIZE ]);
  };
};
