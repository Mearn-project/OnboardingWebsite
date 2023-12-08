import { createAction, props } from '@ngrx/store';
import { House } from '../models/house.model';
import { FacilityReport } from '../models/facility-report.model';
import { Comment } from '../models/comment.model';

export const loadHouses = createAction('[Housing] Load Houses');
export const loadHousesSuccess = createAction(
  '[Housing API] Load Houses Success',
  props<{ houses: House[] }>()
);
export const loadHousesFailure = createAction(
  '[Housing API] Load Houses Failure',
  props<{ error: any }>()
);

export const addHouse = createAction(
  '[Housing] Add House',
  props<{ house: House }>()
);
export const deleteHouse = createAction(
  '[Housing] Delete House',
  props<{ houseId: string }>()
);

export const loadFacilityReports = createAction(
  '[Housing] Load Facility Reports',
  props<{ houseId: string }>()
);
export const loadFacilityReportsSuccess = createAction(
  '[Housing API] Load Facility Reports Success',
  props<{ reports: FacilityReport[] }>()
);
export const loadFacilityReportsFailure = createAction(
  '[Housing API] Load Facility Reports Failure',
  props<{ error: any }>()
);

export const addCommentToReport = createAction(
  '[Housing] Add Comment To Report',
  props<{ reportId: string; comment: Comment }>()
);

export const updateComment = createAction(
  '[Housing] Update Comment',
  props<{ reportId: string; commentId: string; comment: Comment }>()
);
export const updateCommentSuccess = createAction(
  '[Housing API] Update Comment Success',
  props<{ reportId: string; comment: Comment }>()
);
export const updateCommentFailure = createAction(
  '[Housing API] Update Comment Failure',
  props<{ error: any }>()
);
