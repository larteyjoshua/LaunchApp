
import { createAction, props } from '@ngrx/store';

export const displaySuccess = createAction(
  '[Response] Display Success',
  props<{ response: any }>()
);


export const displayFailure = createAction(
  '[Response] Display Failure',
  props<{ response: any }>()
);
