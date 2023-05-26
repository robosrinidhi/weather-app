import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentSearchPage } from './recent-search.page';

describe('RecentSearchPage', () => {
  let component: RecentSearchPage;
  let fixture: ComponentFixture<RecentSearchPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecentSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
