
import raw from '../../data/bikes.json';
import { parseRawToEntities } from '../../utils/parser';

describe('parser util', () => {

  it('should parse raw data into entity', () => {
    let entities = parseRawToEntities(raw);
    // console.log(entities);
  });
});
