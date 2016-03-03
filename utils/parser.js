
import _ from 'lodash';

export function parseRawToEntities (raw = {}) {
  return _.map(raw.data, item => {
    return {
      id: item[8],
      name: item[9],
      numberOfBikes: parseInt(item[11]),
      position: {
        lat: parseFloat(item[14][1]),
        lng: parseFloat(item[14][2])
      }
    };
  });
};
