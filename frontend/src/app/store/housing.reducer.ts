import { createReducer, on } from '@ngrx/store';
import { loadHouses, loadHousesSuccess, loadHousesFailure, addHouseSuccess, deleteHouseSuccess, addCommentToReportSuccess, addCommentToReportFailure } from './housing.actions';
import { House } from '../models/house.model';


export interface State {
  houses: House[];
  error: any;
}

export const initialState: State = {
  houses: [],
  error: null
};

export const reducer = createReducer(
  initialState,
  on(loadHouses, state => ({ ...state })),
  on(loadHousesSuccess, (state, { houses }) => ({ ...state, houses })),
  on(loadHousesFailure, (state, { error }) => ({ ...state, error })),
  on(addHouseSuccess, (state, { house }) => ({
    ...state,
    houses: [...state.houses, house.house]
  })),
  on(deleteHouseSuccess, (state, { id }) => ({
    ...state,
    houses: state.houses.filter(house => house._id !== id)
  })),

  on(addCommentToReportSuccess, (state, { facilityReportId, updatedReport, commentDetails }) => ({
    ...state,
    houses: state.houses.map(house => {
      const reportIndex = house.facilityReports.findIndex(report => report._id === facilityReportId);
      if (reportIndex !== -1) {
        const updatedFacilityReports = [...house.facilityReports];
        const updatedReportWithComments = {
          ...updatedFacilityReports[reportIndex],
          comments: updatedFacilityReports[reportIndex].comments.map(commentId => {
            if (commentId._id === commentDetails.commentId) {
              return {
                _id: commentDetails.commentId,
                description: commentDetails.description,
                createdBy: commentDetails.createdBy,
                timestamp: commentDetails.timestamp,
                __v: 0
              };
            }
            return commentId;
          })
        };
        updatedFacilityReports[reportIndex] = updatedReportWithComments;
        return { ...house, facilityReports: updatedFacilityReports };
      }
      return house;
    }),
    error: null
  })),


  on(addCommentToReportFailure, (state, { error }) => ({
    ...state,
    error: error
  }))

);
