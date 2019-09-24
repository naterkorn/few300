import { Component, OnInit } from '@angular/core';
import { FriendEntity } from '../../reducers/friends.reducer';
import { Observable } from 'rxjs';
import { GiftGivingState, selectFriendsList } from '../../reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends$: Observable<FriendEntity[]>;
  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
    this.friends$ = this.store.select(selectFriendsList);
  }
}
