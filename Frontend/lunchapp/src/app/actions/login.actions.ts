import { createAction, props } from '@ngrx/store';
import { UserLoginDetail, PasswordRecover } from '../models/index';


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


export const logout= createAction(
  '[Login] Load Logout'
);


export const loadPasswordReset = createAction(
  '[Login] Load Password Reset',
  props<{ email: string }>()
);

export const loadPasswordRecovery = createAction(
  '[Login] Load Password Recover',
  props<{ data: PasswordRecover }>()
);

export const loadPasswordRecoverySuccess = createAction(
  '[Login] Load Password Recover Success',
  props<{ response: any }>()
);
