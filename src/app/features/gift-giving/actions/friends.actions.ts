import { props, createAction } from '@ngrx/store';
import { FriendEntity } from '../reducers/friends.reducer';

let currentId = 3;

export const loadFriendData = createAction(
  '[gift-giving] load friends'
);

export const loadFriendsSucceeded = createAction(
  '[gift-giving] load friends succeeded'
);

export const friendAdded = createAction(
  '[gift-giving] add friend',
  ({ name }: { name: string }) => ({
    entity: {
      id: (++currentId).toString(),
      name
    } as FriendEntity
  })
);
