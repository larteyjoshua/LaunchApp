import { ShowFood } from './../models/index';
import { createAction, props } from '@ngrx/store';
import { CreateFood } from '../models/index';

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

export const deleteFood = createAction(
  '[Food] delete Food',
  props<{id: number}>()
);
export const deleteFoodSuccess = createAction(
  '[Food] delete Food Success',
  props<{data:ShowFood}>()
);

export const updateFood = createAction(
  '[Food] Update Food',
  props<{data: FormData}>()
);

export const updateFoodSuccess = createAction(
  '[Food] Update Food Success',
  props<{data: ShowFood}>()
);

export const createFood = createAction(
  '[Food] create Food',
  props<{data: FormData}>()
)

export const createFoodSuccess = createAction(
  '[Food] create Food Success',
  props<{data: ShowFood}>()
);
