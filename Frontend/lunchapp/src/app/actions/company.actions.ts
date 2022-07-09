import { createAction, props } from '@ngrx/store';
import { ShowCompany } from '../models/index';

export const loadCompanys = createAction(
  '[Company] Load Companys'
);

export const loadCompanysSuccess = createAction(
  '[Company] Load Companys Success',
  props<{ data: ShowCompany[] }>()
);

export const loadCompanysFailure = createAction(
  '[Company] Load Companys Failure',
  props<{ error: any }>()
);
