import { createAction, props } from '@ngrx/store';
import { House } from '../models/house.model';

//import { Comment } from '../models/comment.model';

export const loadHouses = createAction('[Housing] Load Houses');
export const loadHousesSuccess = createAction('[Housing] Load Houses Success', props<{ houses: House[] }>());
export const loadHousesFailure = createAction('[Housing] Load Houses Failure', props<{ error: any }>());

export const addHouse = createAction('[Housing] Add House', props<{ house: any }>());
export const addHouseSuccess = createAction('[Housing] Add House Success', props<{ house: any }>());
export const addHouseFailure = createAction('[Housing] Add House Failure', props<{ error: any }>());

export const deleteHouse = createAction('[Housing] Delete House', props<{ id: string }>());
export const deleteHouseSuccess = createAction('[Housing] Delete House Success', props<{ id: string }>());
export const deleteHouseFailure = createAction('[Housing] Delete House Failure', props<{ error: any }>());

export const addCommentToReport = createAction(
  '[Housing] Add Comment To Report',
  props<{ facilityReportId: string, comment: string }>()
);

export const addCommentToReportSuccess = createAction(
  '[Housing] Add Comment To Report Success',
  props<{ facilityReportId: string, updatedReport: { _id: string, comments: string[] }, commentDetails: { commentId: string, description: string, createdBy: string, timestamp: string } }>()
);

export const addCommentToReportFailure = createAction(
  '[Housing] Add Comment To Report Failure',
  props<{ error: any }>()
);



