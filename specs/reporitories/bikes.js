/* global describe it */

import _ from 'lodash';
import { expect } from 'chai';
import fetch from 'node-fetch';
import BikesRepository from '../../src/repositories/bikes';

const DEFAULT_TIMEOUT = 10 * 1000;

describe('bikes repositories', () => {

  let bikesRepository = new BikesRepository(fetch);

  it('should fetch bikes', function (done) {
    this.timeout(DEFAULT_TIMEOUT);
    bikesRepository.fetchBikes()
      .then(data => {
        expect(data.length > 0).to.eql(true);
        _.map(data, item => {
          expect(_.isString(item.id)).to.eql(true);
          expect(_.isString(item.name)).to.eql(true);
          expect(_.isNumber(item.numberOfBikes) && !_.isNaN(item.numberOfBikes)).to.eql(true);
          expect(_.isNumber(item.latitude) && !_.isNaN(item.latitude)).to.eql(true);
          expect(_.isNumber(item.longitude) && !_.isNaN(item.longitude)).to.eql(true);
          expect(_.isString(item.address) && !_.isNaN(item.address)).to.eql(true);
        });
        done();
      })
      .catch(err => {
        return done(err);
      });
  });
});
