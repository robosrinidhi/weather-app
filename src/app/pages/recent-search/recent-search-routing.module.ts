import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecentSearchPage } from './recent-search.page';

const routes: Routes = [
  {
    path: '',
    component: RecentSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecentSearchPageRoutingModule {}
