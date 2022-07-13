import { createAction, props } from '@ngrx/store';
import { ShowUser, CreateUser } from '../models/index';

export const loadUsers = createAction(
  '[User] Load Users'
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ data: ShowUser[] }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

export const deleteUser = createAction(
  '[User] delete User',
  props<{id: number}>()
);
export const deleteUserSuccess = createAction(
  '[User] delete User Success',
  props<{data:ShowUser}>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{id: number, data: ShowUser}>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{data: ShowUser}>()
);

export const createUser = createAction(
  '[User] create User',
  props<{data: CreateUser}>()
)

export const createUserSuccess = createAction(
  '[User] create User Success',
  props<{data: ShowUser}>()
);

export const createBulkUserSuccess = createAction(
  '[User] create Bulk User Success',
  props<{data: ShowUser[]}>(),
);


export const UploadRequestAction = createAction(
  '[File Upload Form] Request',
  props<{file: File}>()
);

export const UploadCancelAction = createAction(
  '[File Upload Form] Cancel',
);

export const UploadResetAction = createAction(
  '[File Upload Form] Reset',
);

export const UploadStartedAction = createAction(
  '[File Upload API] Started',
);

export const UploadFailureAction = createAction(
  '[File Upload API] Failure',
  props<{progress: number}>()
);

export const UploadProgressAction = createAction(
  '[File Upload API] Progress',
  props<{progress: number}>()
);

export const UploadCompletedAction = createAction(
  '[File Upload API] Success',
);


