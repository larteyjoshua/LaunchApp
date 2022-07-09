import * as fromRider from './rider.actions';

describe('loadRiders', () => {
  it('should return an action', () => {
    expect(fromRider.loadRiders().type).toBe('[Rider] Load Riders');
  });
});
