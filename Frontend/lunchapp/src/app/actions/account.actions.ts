import { createAction, props } from '@ngrx/store';
import { ShowAccount } from '../models/index';

export const loadAccounts = createAction(
  '[Account] Load Accounts'
);

export const loadAccountsSuccess = createAction(
  '[Account] Load Accounts Success',
  props<{ data: ShowAccount[] }>()
);

export const loadAccountsFailure = createAction(
  '[Account] Load Accounts Failure',
  props<{ error: any }>()
);
