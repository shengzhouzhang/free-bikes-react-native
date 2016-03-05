
import { StyleSheet } from 'react-native';
import CONFIG from '../config';

const DEFAULT_LINE_HEIGHT = CONFIG.DEFAULT_LINE_HEIGHT;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  map: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchTool: {
    position: 'absolute',
    top: DEFAULT_LINE_HEIGHT,
    left: DEFAULT_LINE_HEIGHT,
    right: DEFAULT_LINE_HEIGHT
  },
  searchInput: {
    height: DEFAULT_LINE_HEIGHT,
    borderWidth: 0.5,
    borderColor: '#eeeeee',
    fontSize: 14,
    padding: 7,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  searchInfo: {
    color: '#aaa'
  },
  searchResult: {
    padding: 5
  },
  searchResults: {
    marginTop: 2,
    padding: 2,
    borderWidth: 0.5,
    borderColor: '#eeeeee',
    backgroundColor: '#ffffff',
  },
  getDirection: {
    position: 'absolute',
    bottom: DEFAULT_LINE_HEIGHT * 2,
    right: DEFAULT_LINE_HEIGHT,
    width: 100,
    height: DEFAULT_LINE_HEIGHT,
    padding: 5,
    backgroundColor: '#ffffff'
  },
  loading: {
    position: 'absolute',
    bottom: DEFAULT_LINE_HEIGHT * 2,
    left: DEFAULT_LINE_HEIGHT
  }
});
