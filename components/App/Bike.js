
import React from 'react-native';
import SearchTool from '../../components/SearchTool';
import Map from '../../components/Map';
import styles from '../../style';
import BikesRepository from '../../repositories/bikes';

export default class BikeApp extends React.Component {
  static propTypes = {
    fetch: React.PropTypes.func.isRequired
  };
  constructor (props) {
    super(props)
    this.bikesRepository = new BikesRepository(this.props.fetch);
  }
  state = {
    stations: []
  };
  render = () => {
    return (
      <React.View style={styles.container}>
        <Map stations={this.state.stations} />
        <SearchTool stations={this.state.stations} />
      </React.View>
    );
  };
  componentDidMount = () => {
    this.updateStations();
  }
  updateStations = () => {
    return this.bikesRepository.fetchBikes()
      .then(stations => this.setState({ stations }))
      .catch(err => console.error(err));
  }
}
