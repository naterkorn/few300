import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FriendEntity } from '../../../reducers/friends.reducer';

@Component({
  selector: 'app-friends-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  @Input() friends: FriendEntity[] = [];
  constructor() { }

  ngOnInit() {
  }

}
