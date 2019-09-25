import { props, createAction } from '@ngrx/store';
import { FriendEntity } from '../reducers/friends.reducer';

export const loadFriendData = createAction(
  '[gift-giving] load friends'
);

export const loadFriendsSuccess = createAction(
  '[gift-giving] load friends succeeded',
  props<{ data: FriendEntity[] }>()
);

export const loadFriendsFailure = createAction(
  '[gift-giving] load friends failed',
  props<{ msg: string }>()
);

let currentId = 3;

export const friendAdded = createAction(
  '[gift-giving] add friend',
  ({ name }: { name: string }) => ({
    entity: {
      id: (++currentId).toString(),
      name
    } as FriendEntity
  })
);

export const friendAddedSuccess = createAction(
  '[gift-giving] friend added success',
  props<{ oldId: string, newEntity: FriendEntity }>()
);

export const friendAddedFailure = createAction(
  '[gift-giving] friend added failure',
  props<{ message: string, entity: FriendEntity }>()
);
