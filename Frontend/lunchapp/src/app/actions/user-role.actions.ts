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
