import { createAction, props } from '@ngrx/store';
import { ShowAdmin, CreateAdmin } from '../models/index';

export const loadAdmins = createAction(
  '[Admin] Load Admins'
);

export const loadAdminsSuccess = createAction(
  '[Admin] Load Admins Success',
  props<{ data: ShowAdmin[] }>()
);

export const loadAdminsFailure = createAction(
  '[Admin] Load Admins Failure',
  props<{ adminError: any }>()
);

export const deleteAdmin = createAction(
  '[Admin] delete Admin',
  props<{id: number}>()
);

export const deleteAdminSuccess = createAction(
  '[Admin] delete Admin Success',
  props<{data:ShowAdmin}>()
);

export const updateAdmin = createAction(
  '[Admin] Update Admin',
  props<{id: number, data: ShowAdmin}>()
);

export const updateAdminSuccess = createAction(
  '[Admin] Update Admin Success',
  props<{data: ShowAdmin}>()
);

export const createAdmin = createAction(
  '[Admin] create Admin',
  props<{data: CreateAdmin}>()
)
export const createAdminSuccess = createAction(
  '[Admin] create Admin Success',
  props<{data: ShowAdmin}>()
);
