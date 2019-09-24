import { Component } from '@angular/core';
import { applicationStarted } from './actions/app.actions';
import { AppState } from './reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'few300';

  constructor(store: Store<AppState>) {
    store.dispatch(applicationStarted());
  }
}
