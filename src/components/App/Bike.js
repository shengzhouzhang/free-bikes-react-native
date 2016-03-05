
import React from 'react-native';
import styles from '../../style';
import BikesRepository from '../../repositories/bikes';
import SearchTool from '../../components/SearchTool';
import Map from '../../components/Map';
import Loading from '../../components/Loading';

export default class BikeApp extends React.Component {
  static propTypes = {
    fetch: React.PropTypes.func.isRequired
  };
  constructor (props) {
    super(props);
    this.bikesRepository = new BikesRepository(this.props.fetch);
  }
  state = {
    stations: [],
    isLoading: false
  };
  render = () => {
    return (
      <React.View style={styles.container}>
        <Map stations={this.state.stations} />
        <SearchTool stations={this.state.stations} />
        { this.state.isLoading ? (<Loading />) : (undefined) }
      </React.View>
    );
  };
  componentDidMount = () => {
    this.updateStations();
  };
  updateStations = () => {
    this.setState({ isLoading: true });
    return this.bikesRepository.fetchBikes()
      .then(stations => this.setState({ stations: stations, isLoading: false }))
      .catch(err => {
        console.error(err);
        this.setState({ isLoading: false });
      });
  };
}
