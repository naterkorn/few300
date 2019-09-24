import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as appActions from '../../../actions/app.actions';
import * as sortFilterActions from '../actions/sort-filter.actions';
import { loadHolidayData } from '../actions/holidays.actions';
import { loadFriendData } from '../actions/friends.actions';


@Injectable()
export class AppEffects {

  applicationStartedStuff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => sortFilterActions.loadSavedPrefs())
    ), { dispatch: true }
  );

  onAppStartLoadHolidays$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => loadHolidayData())
    ), { dispatch: true });

  onAppStartLoadFriends$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => loadFriendData())
    ), { dispatch: true });

  constructor(private actions$: Actions) { }
}
