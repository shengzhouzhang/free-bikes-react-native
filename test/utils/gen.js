
import Chance from 'chance';
import BikeStation from '../../src/domains/BikeStation';

let chance = new Chance();

export function genAddress () {
  return {
    address: chance.address(),
    city: chance.city(),
    state: chance.state(),
    zip: chance.zip()
  };
}

export function genAddressList (num) {
  let data = [];
  for (let i = 0; i < num; i++) {
    data.push(genAddress());
  }
  return data;
}

export function genRawData (id) {
  return {
    id: id.toString() || '0',
    featurename: chance.name(),
    nbbikes: chance.integer(),
    coordinates: {
      latitude: chance.floating(),
      longitude: chance.floating(),
      human_address: '{}'
    }
  };
}

export function genRawDataArray (num) {
  let data = [];
  for (let i = 0; i < num; i++) {
    data.push(genRawData(i));
  }
  return data;
}

export function genBikeStation (id) {
  return new BikeStation(
    id.toString() || '0',
    chance.name(),
    chance.integer(),
    chance.floating(),
    chance.floating(),
    chance.address()
  );
}

export function genBikeStationList (num) {
  let data = [];
  for (let i = 0; i < num; i++) {
    data.push(genBikeStation(i));
  }
  return data;
}
