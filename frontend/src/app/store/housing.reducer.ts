import { createReducer, on } from '@ngrx/store';
import * as HousingActions from './housing.actions';
import { House } from '../models/house.model';
import { FacilityReport } from '../models/facility-report.model';
import { Comment } from '../models/comment.model';

export interface HousingState {
  houses: House[];
  reports: FacilityReport[];
  comments: Comment[];
}

export const initialState: HousingState = {
  houses: [],
  reports: [],
  comments: [],

};

export const housingReducer = createReducer(
  initialState,
  on(HousingActions.loadHousesSuccess, (state, { houses }) => ({ ...state, houses })),
  on(HousingActions.loadFacilityReportsSuccess, (state, { reports }) => ({ ...state, reports })),
  on(HousingActions.updateCommentSuccess, (state, { reportId, comment }) => {

    return { ...state };
  }),
);
