import { createAction, props } from '@ngrx/store';
import { CreateRider, ShowRider } from '../models/index';


export const loadRiders = createAction(
  '[Rider] Load Riders'
);

export const loadRidersSuccess = createAction(
  '[Rider] Load Riders Success',
  props<{ data: ShowRider[] }>()
);

export const loadRidersFailure = createAction(
  '[Rider] Load Riders Failure',
  props<{ error: any }>()
);

export const deleteRider = createAction(
  '[Rider] delete Rider',
  props<{id: number}>()
);

export const deleteRiderSuccess = createAction(
  '[Rider] delete Rider Success',
  props<{data:ShowRider}>()
);

export const updateRider = createAction(
  '[Rider] Update Rider',
  props<{id: number, data: ShowRider}>()
);

export const updateRiderSuccess = createAction(
  '[Rider] Update Rider Success',
  props<{data: ShowRider}>()
);

export const createRider = createAction(
  '[Rider] create Rider',
  props<{data: CreateRider}>()
)
export const createRiderSuccess = createAction(
  '[Rider] create Rider Success',
  props<{data: ShowRider}>()
);
