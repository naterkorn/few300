import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/friends.actions';

export interface FriendEntity {
  id: string;
  name: string;
}

export interface FriendsState extends EntityState<FriendEntity> {

}

export const adapter = createEntityAdapter<FriendEntity>();

const { selectAll } = adapter.getSelectors();
export const selectFriendsArray = selectAll;

const initialState = adapter.getInitialState();

const reducerFunction = createReducer(
  initialState,
  on(actions.friendAdded, (state, action) => adapter.addOne(action.entity, state)),
  on(actions.loadFriendsSuccess, (state, action) => adapter.addAll(action.data, state)),
  on(actions.friendAddedSuccess, (state, action) => {
    const tempState = adapter.removeOne(action.oldId, state);
    return adapter.addOne(action.newEntity, tempState);
  }),
  on(actions.friendAddedFailure, (state, action) => adapter.removeOne(action.entity.id, state))
);

export function reducer(state: FriendsState = initialState, action: Action) {
  return reducerFunction(state, action);
}
