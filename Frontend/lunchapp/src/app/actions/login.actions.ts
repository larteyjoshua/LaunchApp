import { createAction, props } from '@ngrx/store';
import { UserLoginDetail } from '../models/index';


export const loadLogins = createAction(
  '[Login] Load Logins',
  props<{data:UserLoginDetail}>()
);

export const loadLoginsSuccess = createAction(
  '[Login] Load Logins Success',
  props<{ token: any }>()
);

export const loadLoginsFailure = createAction(
  '[Login] Load Logins Failure',
  props<{ error: any }>()
);
