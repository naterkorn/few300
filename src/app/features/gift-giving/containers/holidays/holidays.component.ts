import { Component, OnInit } from '@angular/core';
import { GiftGivingState, selectHolidayListItems, selectHolidaysLoaded } from '../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HolidayListItem } from '../../models/holiday-list-item';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {

  holidaysLoaded$: Observable<boolean>;
  holidays$: Observable<HolidayListItem[]>;

  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
    this.holidays$ = this.store.select(selectHolidayListItems);
    this.holidaysLoaded$ = this.store.select(selectHolidaysLoaded);
  }
}
