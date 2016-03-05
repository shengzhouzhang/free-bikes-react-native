
import { createStore } from 'redux';

function counter (station = {}, action) {
  switch (action.type) {
    case 'SELECT':
      return action.station;
    default:
      return station;
  }
}

export default createStore(counter);
