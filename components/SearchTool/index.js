
import _ from 'lodash';
import React from 'react-native';
import styles from '../../style';
import Input from '../../components/SearchTool/Input';
import Results from '../../components/SearchTool/Result';

export default class SearchTool extends React.Component {
  static propTypes = {
    stations: React.PropTypes.array.isRequired
  };
  state = {
    text: 'south'
  };
  render = () => {
    return (
      <React.View style={styles.searchTool}>
        <Input value={this.state.text} onTextChange={this.onTextChangeHandler} />
        <Results stations={this.filter(this.props.stations, this.state.text)} />
      </React.View>
    );
  };
  onTextChangeHandler = (text) => {
    this.setState({ text: text });
  };
  filter = (entities, keyword = '') => {
    if (keyword.length < 3) { return []; }
    return _.filter(entities, entity => {
      return entity.name.search(new RegExp(keyword, 'i')) >= 0;
    });
  };
}
