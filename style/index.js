
import { StyleSheet } from 'react-native';

const lineHeight = 28;

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
    top: lineHeight,
    left: lineHeight,
    right: lineHeight
  },
  searchInput: {
    height: lineHeight,
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
    bottom: lineHeight,
    left: lineHeight,
    right: lineHeight,
    width: 100,
    height: lineHeight,
    padding: 5,
    backgroundColor: '#ffffff'
  }
});
