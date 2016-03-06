
import _ from 'lodash';
import React from 'react-native';
import styles from '../../style';
import SelectedStation from '../../stores/station';
import GetDirection from '../../components/Map/GetDirection';
import CONFIG from '../../config';

const DEFAULT_ZOOM_LEVEL = CONFIG.DEFAULT_ZOOM_LEVEL;
const ZOOMED_IN = CONFIG.ZOOMED_IN;
const OVERLAY_COLOR = CONFIG.OVERLAY_COLOR;
const MAX_OVERLAY_SIZE = CONFIG.MAX_OVERLAY_SIZE;
const MIN_OVERLAY_SIZE = CONFIG.MIN_OVERLAY_SIZE;
const ENABLE_ANNOTATION = CONFIG.ENABLE_ANNOTATION;

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
    showGetDirection: false
  };
  state = { region: this.props.region, name: this.props.name };
  render = () => {
    return (
      <React.View style={styles.container}>
        <React.MapView style={styles.map}
          region={this.state.region}
          rotateEnabled={false}
          annotations={
            ENABLE_ANNOTATION ? this.parseEntitiesToAnnotations(this.props.stations) : []
          }
          overlays={this.parseEntitiesToOverlays(this.props.stations)}
        />
        { this.state.showGetDirection ? (<GetDirection address={this.state.name} />) : (undefined) }
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
      showGetDirection: true
    });
  };
  parseEntitiesToAnnotations = (entities) => {
    return _.map(entities, entity => {
      return {
        title: entity.name,
        latitude: entity.latitude,
        longitude: entity.longitude,
        onFocus: this.selectStation.bind(this, entity.id, entity.name),
      };
    });
  };
  parseEntitiesToOverlays = (entities) => {
    let largestStation = _.maxBy(entities, entity => entity.numberOfBikes);
    let largest = largestStation && largestStation.numberOfBikes || 0;
    return _.map(entities, entity => {
      return {
        id: entity.id,
        coordinates: [ {
          latitude: entity.latitude,
          longitude: entity.longitude,
        } ],
        lineWidth: this.getOverlaySize(entity.numberOfBikes, largest),
        strokeColor: OVERLAY_COLOR
      };
    });
  };
  getOverlaySize = (numberOfBikes, largest) => {
    if (largest && numberOfBikes >= largest) { return MAX_OVERLAY_SIZE; }
    if (numberOfBikes <= 0) { return MIN_OVERLAY_SIZE; }
    if (largest <= 0) { return MIN_OVERLAY_SIZE; }
    return _.max([ MIN_OVERLAY_SIZE + (numberOfBikes / largest) *
      (MAX_OVERLAY_SIZE - MIN_OVERLAY_SIZE), MIN_OVERLAY_SIZE ]);
  };
  selectStation = (id, name) => {
    SelectedStation.dispatch({
      type: 'SELECT',
      station: { id, name }
    });
  };
}
