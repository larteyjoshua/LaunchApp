
import { createAction, props } from '@ngrx/store';

export const deplaySuccess = createAction(
  '[Response] Display Success',
  props<{ response: any }>()
);


export const deplayFailure = createAction(
  '[Response] Display Failure',
  props<{ response: any }>()
);
