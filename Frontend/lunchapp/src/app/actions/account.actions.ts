import { createAction, props } from '@ngrx/store';
import { ShowCost } from '../models/index';


export const loadCosts = createAction(
  '[Cost] Load Cost'
);

export const loadCostsSuccess = createAction(
  '[Cost] Load Cost Success',
  props<{ data: ShowCost[] }>()
);
