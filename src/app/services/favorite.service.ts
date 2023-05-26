import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites: string[] = [];

  constructor() { }

  getFavoriteCities() {
    return this.favorites;
  }

  addFavoriteCity(city: string) {
    this.favorites.push(city);
  }

  removeFavoriteCity(city: string) {
    const index = this.favorites.indexOf(city);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    }
  }
}
