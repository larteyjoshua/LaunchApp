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

export const updateOrder = createAction(
  '[Order] Update Order',
  props<{id: number, data: ShowOrder}>()
);

export const updateOrderSuccess = createAction(
  '[Order] Update Order Success',
  props<{data: ShowOrder}>()
);

export const deleteOrder = createAction(
  '[Order] delete Order',
  props<{id: number}>()
);

export const deleteOrderSuccess = createAction(
  '[Order] delete Order Success',
  props<{data:ShowOrder}>()
);
