
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
    borderColor: '#aaaaaa',
    fontSize: 14,
    padding: 7,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  changeButton: {
    alignSelf: 'center',
    marginTop: 5,
    padding: 3,
    borderWidth: 0.5,
    borderColor: '#777777',
  },
});
