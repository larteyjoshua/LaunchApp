import { ShowFeedback } from './../models/index';
import { createAction, props } from '@ngrx/store';

export const loadFeedbacks = createAction(
  '[Feedback] Load Feedbacks'
);

export const loadFeedbacksSuccess = createAction(
  '[Feedback] Load Feedbacks Success',
  props<{ data: ShowFeedback[] }>()
);

export const loadFeedbacksFailure = createAction(
  '[Feedback] Load Feedbacks Failure',
  props<{ error: any }>()
);
