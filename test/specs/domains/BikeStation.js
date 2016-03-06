/* global describe it */

import _ from 'lodash';
import { expect } from 'chai';
import { genBikeStationList } from '../../utils/gen';

describe('BikeStation Domain', () => {

  const TEST_STATIONS = genBikeStationList(100);

  it('should get valid values', () => {
    expect(TEST_STATIONS).to.have.length(100);

    _.forEach(TEST_STATIONS, station => {
      expect(_.isString(station.id)).to.eql(true);
      expect(_.isString(station.name)).to.eql(true);
      expect(_.isNumber(station.numberOfBikes) && !_.isNaN(station.numberOfBikes)).to.eql(true);
      expect(_.isNumber(station.latitude) && !_.isNaN(station.latitude)).to.eql(true);
      expect(_.isNumber(station.longitude) && !_.isNaN(station.longitude)).to.eql(true);
      expect(_.isString(station.address)).to.eql(true);
      expect(station.numberOfBikes >= 0).to.eql(true);
    });
  });
});
