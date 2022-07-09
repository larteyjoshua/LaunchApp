import * as fromFood from './food.actions';

describe('loadFoods', () => {
  it('should return an action', () => {
    expect(fromFood.loadFoods().type).toBe('[Food] Load Foods');
  });
});
