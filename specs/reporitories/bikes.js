
import fetch from 'node-fetch';
import BikesRepository from '../../repositories/bikes';

describe('bikes repositories', () => {

  let bikesRepository = new BikesRepository(fetch);

  it('should fetch bikes', (done) => {
    bikesRepository.fetchBikes()
      .then(data => {
        console.log(data);
        done();
      });
  });
});
