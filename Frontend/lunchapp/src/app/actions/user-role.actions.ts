import { createAction, props } from '@ngrx/store';
import { UserRole } from '../models/index';

export const loadUserRoles = createAction(
  '[UserRole] Load UserRoles'
);

export const loadUserRolesSuccess = createAction(
  '[UserRole] Load UserRoles Success',
  props<{ data: UserRole[] }>()
);

export const loadUserRolesFailure = createAction(
  '[UserRole] Load UserRoles Failure',
  props<{ error: any }>()
);

export const deleteUserRole = createAction(
  '[User] delete UserRole',
  props<{user_id: number}>()
);

export const deleteUserRoleSuccess = createAction(
  '[UserRole] delete UserRole Success',
  props<{data:UserRole}>()
);

export const updateUserRole = createAction(
  '[UserRole] Update UserRole',
  props<{id: number, data: UserRole}>()
);

export const updateUserRoleSuccess = createAction(
  '[UserRole] Update UserRole Success',
  props<{data: UserRole}>()
);

export const createUserRole = createAction(
  '[UserRole] create UserRole',
  props<{data: UserRole}>()
)
export const createUserRoleSuccess = createAction(
  '[UserRole] create UserRole Success',
  props<{data: UserRole}>()
);
