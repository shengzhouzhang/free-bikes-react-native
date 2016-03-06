
import _ from 'lodash';
import React from 'react-native';
import styles from '../../style';
import Input from '../../components/SearchTool/Input';
import Results from '../../components/SearchTool/Results';
import SelectedStation from '../../stores/station';

export default class SearchTool extends React.Component {
  static propTypes = {
    stations: React.PropTypes.array.isRequired,
    minimumKeywordLength: React.PropTypes.number,
  };
  static defaultProps = {
    minimumKeywordLength: 3,
  };
  state = {
    text: '',
    isTyping: false
  };
  render = () => {
    return (
      <React.View style={styles.searchTool}>
        <Input value={this.state.text} onTextChange={this.onTextChangeHandler} />
        { this.state.isTyping && this.state.text.length >= this.props.minimumKeywordLength ?
          (<Results stations={this.filter(this.props.stations, this.state.text)} />) : (undefined) }
      </React.View>
    );
  };
  componentDidMount = () => {
    this.unsubscribe = SelectedStation.subscribe(() => {
      this.onSelectStationHandler(SelectedStation.getState().name);
    });
  };
  componentWillUnmount = () => {
    this.unsubscribe();
  };
  onSelectStationHandler = (name) => {
    this.setState({ text: name, isTyping: false });
  };
  onTextChangeHandler = (text) => {
    this.setState({ text: text, isTyping: true });
  };
  filter = (entities, keyword = '') => {
    if (keyword.length < this.props.minimumKeywordLength) { return []; }
    return _.filter(entities, entity => {
      return entity.name.search(new RegExp(keyword, 'i')) >= 0;
    });
  };
}
