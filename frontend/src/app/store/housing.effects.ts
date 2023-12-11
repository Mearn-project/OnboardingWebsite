import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { HousingService } from '../services/housing.service';
import { loadHouses, loadHousesSuccess, loadHousesFailure, addHouse, addHouseSuccess, addHouseFailure, deleteHouse, deleteHouseSuccess, deleteHouseFailure, addCommentToReport, addCommentToReportSuccess, addCommentToReportFailure } from './housing.actions';

@Injectable()
export class HousingEffects {
  loadHouses$ = createEffect(() => this.actions$.pipe(
    ofType(loadHouses),
    mergeMap(() => this.housingService.getHousingDetails()
      .pipe(
        tap(() => console.log('Effect: loadHouses')),
        map(houses => loadHousesSuccess({ houses })),
        catchError(error => {
          console.error('Error loading houses:', error);
          return of(loadHousesFailure({ error }));
        })
      ))
  ));

  addHouse$ = createEffect(() => this.actions$.pipe(
    ofType(addHouse),
    mergeMap(action => this.housingService.addHouse(action.house)
      .pipe(
        map(house => addHouseSuccess({ house })),
        catchError(error => of(addHouseFailure({ error })))
      ))
  ));

  deleteHouse$ = createEffect(() => this.actions$.pipe(
    ofType(deleteHouse),
    mergeMap(action => this.housingService.deleteHouse(action.id)
      .pipe(
        map(() => deleteHouseSuccess({ id: action.id })),
        catchError(error => of(deleteHouseFailure({ error })))
      ))
  ));

  addCommentToReport$ = createEffect(() => this.actions$.pipe(
    ofType(addCommentToReport),
    mergeMap(action =>
      this.housingService.addCommentToReport(action.facilityReportId, action.comment)
        .pipe(
          map(response => addCommentToReportSuccess({
            facilityReportId: action.facilityReportId,
            updatedReport: response.report,
            commentDetails: {
              commentId: response.report.comments[response.report.comments.length - 1],
              description: action.comment,
              createdBy: response.report.createdBy,
              timestamp: response.report.timestamp
            }
          })),
          catchError(error => of(addCommentToReportFailure({ error })))
        )
    )
  ));



  constructor(
    private actions$: Actions,
    private housingService: HousingService
  ) {}
}
