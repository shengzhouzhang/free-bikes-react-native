
import _ from 'lodash';

export function parseRawToEntities (raw = {}) {
  return _.map(raw.data, item => {
    return {
      id: item[8],
      name: item[9],
      numberOfBikes: parseInt(item[11]),
      position: {
        lat: item[14][1],
        lng: item[14][2]
      }
    };
  });
};
