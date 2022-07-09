import { createAction, props } from '@ngrx/store';
import { ShowOrder } from '../models/index';

export const loadOrders = createAction(
  '[Order] Load Orders'
);

export const loadOrdersSuccess = createAction(
  '[Order] Load Orders Success',
  props<{ data: ShowOrder[] }>()
);

export const loadOrdersFailure = createAction(
  '[Order] Load Orders Failure',
  props<{ error: any }>()
);
