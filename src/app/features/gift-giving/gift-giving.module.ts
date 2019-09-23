import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftGivingComponent } from './gift-giving.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { HolidaysComponent } from './containers/holidays/holidays.component';
import { FriendsComponent } from './containers/friends/friends.component';
import { reducers, featureName } from './reducers';
import { StoreModule } from '@ngrx/store';
import { ListComponent } from './containers/holidays/list/list.component';
import { EntryComponent } from './containers/holidays/entry/entry.component';
import { SortFilterComponent } from './containers/holidays/sort-filter/sort-filter.component';

const routes: Routes = [
  {
    path: 'gifts',
    component: GiftGivingComponent,
    children: [
      {
        path: 'holidays',
        component: HolidaysComponent
      },
      {
        path: 'friends',
        component: FriendsComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: '**',
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    GiftGivingComponent,
    DashboardComponent,
    HolidaysComponent,
    FriendsComponent,
    ListComponent,
    EntryComponent,
    SortFilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureName, reducers)
  ]
})
export class GiftGivingModule { }
