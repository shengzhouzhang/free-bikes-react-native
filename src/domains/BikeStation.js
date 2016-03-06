
import _ from 'lodash';

export default class BikeStation {
  constructor (id, name = '', numberOfBikes = 0, latitude = 0, longitude = 0, address = '') {
    if (!id || !_.isString(id)) { throw new Error(`invalid id: ${id}`); }
    if (!_.isString(name)) { throw new Error(`invalid name: ${name}`); }
    if (!_.isNumber(numberOfBikes) ||
        _.isNaN(numberOfBikes)) { throw new Error(`invalid numberOfBikes: ${numberOfBikes}`); }
    if (!_.isNumber(latitude) ||
        _.isNaN(latitude)) { throw new Error(`invalid latitude: ${latitude}`); }
    if (!_.isNumber(longitude) ||
        _.isNaN(longitude)) { throw new Error(`invalid longitude: ${longitude}`); }
    if (!_.isString(address)) { throw new Error(`invalid address: ${address}`); }

    this.id = id;
    this.name = name;
    this.numberOfBikes = numberOfBikes >= 0 ? numberOfBikes : 0;
    this.longitude = longitude;
    this.latitude = latitude;
    this.address = address;
  }
}
