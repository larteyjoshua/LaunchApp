import { createAction, props } from '@ngrx/store';
import { ShowCompany, CreateCompany } from '../models/index';

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


export const deleteCompany = createAction(
  '[Company] delete Company',
  props<{id: number}>()
);

export const deleteCompanySuccess = createAction(
  '[Company] delete Company Success',
  props<{data:ShowCompany}>()
);

export const updateCompany = createAction(
  '[Company] Update Company',
  props<{id: number, data: ShowCompany}>()
);

export const updateCompanySuccess = createAction(
  '[Company] Update Company Success',
  props<{data: ShowCompany}>()
);

export const createCompany = createAction(
  '[Company] create Company',
  props<{data: CreateCompany}>()
)
export const createCompanySuccess = createAction(
  '[Company] create Company Success',
  props<{data: ShowCompany}>()
);
