import * as fromRole from './role.actions';

describe('loadRoles', () => {
  it('should return an action', () => {
    expect(fromRole.loadRoles().type).toBe('[Role] Load Roles');
  });
});
