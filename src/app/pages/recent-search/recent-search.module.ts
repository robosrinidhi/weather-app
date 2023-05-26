import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentSearchPageRoutingModule } from './recent-search-routing.module';

import { RecentSearchPage } from './recent-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentSearchPageRoutingModule
  ],
  declarations: [RecentSearchPage]
})
export class RecentSearchPageModule {}
