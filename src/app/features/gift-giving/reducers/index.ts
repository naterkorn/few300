export const featureName = 'giftGiving';
import * as fromHolidays from './holidays.reducer';
import * as fromUiHints from './ui-hints.reducer';
import { HolidayListItem } from '../models';
import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';

export interface GiftGivingState {
  holidays: fromHolidays.HolidayState;
  uiHints: fromUiHints.UiHintsState;
}

export const reducers: ActionReducerMap<GiftGivingState> = {
  holidays: fromHolidays.reducer,
  uiHints: fromUiHints.reducer
};

// Feature Selector
const selectFeature = createFeatureSelector<GiftGivingState>(featureName);

// Selector Per Branch (e.g., one for 'holidays')
const selectHolidaysBranch = createSelector(selectFeature, state => state.holidays);
const selectUiHintsBranch = createSelector(selectFeature, state => state.uiHints);

// 'Helpers'
const selectHolidayArray = createSelector(selectHolidaysBranch, fromHolidays.selectHolidayArray);
export const selectShowAllHolidays = createSelector(selectUiHintsBranch, uiHintsState => uiHintsState.showAll);
export const selectSortingHolidaysBy = createSelector(selectUiHintsBranch, uiHintsState => uiHintsState.sortHolidaysBy);

// Then what your components need.;
export const selectHolidaysLoaded = createSelector(selectUiHintsBranch, uiHintsState => uiHintsState.holidaysLoaded);

// - we need one that returns a HolidayListItem[] for our holidaylist component.

const selectHolidayListItemsUnfiltered = createSelector(selectHolidayArray, holidays =>
  holidays.map(holiday => ({
    id: holiday.id,
    date: holiday.date,
    name: holiday.name,
    past: new Date(holiday.date) < new Date(),
    isTemporary: holiday.id.startsWith('T')
  } as HolidayListItem))
);

const selectHolidayListSorted = createSelector(selectHolidayListItemsUnfiltered, selectSortingHolidaysBy,
  // This sorting method will place uppercase letters ahead of lowercase letters when
  // sorting by name whoops lol, should really do a .toUpper() or some such.
  (list, by) => {
    return [...list.sort((lhs, rhs) => {
      if (lhs[by] < rhs[by]) {
        // TODO: Make this case-insensitive
        return -1;
      }
      if (lhs[by] > rhs[by]) {
        return 1;
      }
      return 0;
    })];
  }
);
export const selectHolidayListItems = createSelector(selectShowAllHolidays, selectHolidayListSorted, (all, holidays) =>
  holidays.filter(h => all ? true : !h.past)
);
