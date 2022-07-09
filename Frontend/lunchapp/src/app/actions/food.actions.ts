import { ShowFood } from './../models/index';
import { createAction, props } from '@ngrx/store';

export const loadFoods = createAction(
  '[Food] Load Foods'
);

export const loadFoodsSuccess = createAction(
  '[Food] Load Foods Success',
  props<{ data: ShowFood[] }>()
);

export const loadFoodsFailure = createAction(
  '[Food] Load Foods Failure',
  props<{ error: any }>()
);
