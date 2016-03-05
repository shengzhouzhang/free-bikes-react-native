
import _ from 'lodash';
import BikeStation from '../domains/Station';

export function parseAddress (addressStr) {
  try {
    let data = JSON.parse(addressStr);
    let address = [];
    if (data.address) { address.push(data.address); }
    if (data.city) { address.push(data.city); }
    if (data.state) { address.push(data.state); }
    if (data.zip) { address.push(data.zip); }
    return address.join(' ');
  } catch (err) {
    console.error(`parseAddress error: ${addressStr}`);
    return '';
  }
}

export function parseRawToEntities (raw = {}) {
  return _.map(raw, item => {
    return new BikeStation(
      item.id,
      item.featurename,
      parseInt(item.nbbikes, 10),
      parseFloat(item.coordinates.latitude),
      parseFloat(item.coordinates.longitude),
      parseAddress(item.coordinates.human_address)
    );
  });
}

export default class BikesRepository {
  constructor (fetch) {
    this.fetch = fetch;
  }
  fetchBikes = () => {
    return this.fetch('https://data.melbourne.vic.gov.au/resource/tdvh-n9dv.json')
      .then(res => res.json())
      .then(raw => parseRawToEntities(raw));
  };
}
