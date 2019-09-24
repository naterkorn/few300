import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as friendsActions from '../actions/friends.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { HolidayEntity } from '../reducers/holidays.reducer';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FriendEntity } from '../reducers/friends.reducer';
@Injectable()
export class HolidaysEffects {

  postFriend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(friendsActions.friendAdded),
      map(holiday => holiday.entity),
      switchMap((originalEntity) =>
        this.client.post<HolidayEntity>(environment.friendsUrl, { name: originalEntity.name })
          .pipe(
            map(response => friendsActions.friendAddedSuccess({ oldId: originalEntity.id, newEntity: response })),
            catchError(err => of(friendsActions.friendAddedFailure({ message: 'Could Not Add That', entity: originalEntity })))
          )
      ))
  );

  loadHolidayData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(friendsActions.loadFriendData),
      switchMap(() => this.client.get<{ friends: FriendEntity[] }>(environment.friendsUrl)
        .pipe(
          map(response => response.friends),
          map(holidays => friendsActions.loadFriendsSucceeded({ data: friends }))
        )
      )
    )
  );
  constructor(private actions$: Actions, private client: HttpClient) { }
}
