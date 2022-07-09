import { createAction, props } from '@ngrx/store';
import { ShowRider } from '../models/index';


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
