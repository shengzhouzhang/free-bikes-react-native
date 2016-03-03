
import _ from 'lodash';
import React from 'react-native';
import styles from '../../style';
import Input from '../../components/SearchTool/Input';
import Results from '../../components/SearchTool/Result';
import SelectedStation from '../../stores/station';

const MIN_LEN = 3;

export default class SearchTool extends React.Component {
  static propTypes = {
    stations: React.PropTypes.array.isRequired
  };
  state = {
    text: '',
    showResults: true
  };
  render = () => {
    return (
      <React.View style={styles.searchTool}>
        <Input value={this.state.text} onTextChange={this.onTextChangeHandler} />
        { this.state.showResults && this.state.text.length > MIN_LEN ?
          (<Results stations={this.filter(this.props.stations, this.state.text)} />) : (undefined) }
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
    this.setState({ text: SelectedStation.getState().name, showResults: false });
  };
  onTextChangeHandler = (text) => {
    this.setState({ text: text, showResults: true });
  };
  filter = (entities, keyword = '') => {
    if (keyword.length <= MIN_LEN) { return []; }
    return _.filter(entities, entity => {
      return entity.name.search(new RegExp(keyword, 'i')) >= 0;
    });
  };
}
