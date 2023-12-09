import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HousingService } from '../services/housing.service';
import * as HousingActions from './housing.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class HousingEffects {
  loadHouses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HousingActions.loadHouses),
      mergeMap(() =>
        this.housingService.getHousingDetails().pipe(
          map(houses => HousingActions.loadHousesSuccess({ houses })),
          catchError(error => of(HousingActions.loadHousesFailure({ error })))
        )
      )
    )
  );

  updateComment$ = createEffect(() =>
  this.actions$.pipe(
    ofType(HousingActions.updateComment),
    mergeMap(action =>
      this.housingService.updateComment(action.reportId, action.commentId, action.comment).pipe(
        map(updatedComment => HousingActions.updateCommentSuccess({ reportId: action.reportId, comment: updatedComment })),
        catchError(error => of(HousingActions.updateCommentFailure({ error })))
      )
    )
  )
);


  constructor(private actions$: Actions, private housingService: HousingService) {}
}
