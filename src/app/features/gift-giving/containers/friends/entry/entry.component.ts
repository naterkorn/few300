import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GiftGivingState } from '../../../reducers';
import { friendAdded } from '../../../actions/friends.actions';

@Component({
  selector: 'app-friends-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
  }

  addItem(friendNameEl: HTMLInputElement) {
    const name = friendNameEl.value;
    this.store.dispatch(friendAdded({ name }));
    friendNameEl.value = '';
    friendNameEl.focus();
  }
}
