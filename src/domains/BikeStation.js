
export default class BikeStation {
  constructor (id, name = '', numberOfBikes = 0, latitude = 0, longitude = 0, address = '') {
    this.id = id;
    this.name = name;
    this.numberOfBikes = numberOfBikes >= 0 ? numberOfBikes : 0;
    this.longitude = longitude;
    this.latitude = latitude;
    this.address = address;
  }
}
