import { expect } from 'chai';
import { uniqueId } from './utilities';

describe('uniqueId functionality', () => {
  it('appends the unique to a prefix if provided', () => {
    expect(uniqueId('contact_')).to.equal('contact_1');
  });
  it('will generate a unique ID per each instance of use', () => {
    let test1 = uniqueId("test-");
    expect(test1).to.equal('test-1');
    let test2 = uniqueId("test-");
    expect(test2).to.equal('test-2');
  });
});
