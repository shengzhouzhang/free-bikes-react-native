
import { createStore } from 'redux';

export function reducer (previous = null, action) {
  switch (action.type) {
    case 'SELECT':
      return action.station;
    default:
      return previous;
  }
}

export default createStore(reducer);
