import { createAction, props } from '@ngrx/store';
import { ShowRole } from '../models/index';

export const loadRoles = createAction(
  '[Role] Load Roles'
);

export const loadRolesSuccess = createAction(
  '[Role] Load Roles Success',
  props<{ data: ShowRole[] }>()
);

export const loadRolesFailure = createAction(
  '[Role] Load Roles Failure',
  props<{ error: any }>()
);
