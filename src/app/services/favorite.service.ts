import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites: string[] = [];
  private favoriteCities: string[] = [];
  constructor() { }

  getFavoriteCities() {
    return this.favoriteCities;
  }
  getFavoriteCityWeather(){
    return this.favorites;
  }
  
  addFavoriteCity(favoriteCityWeatherData: any) {
    if(!this.favorites.includes(favoriteCityWeatherData)){
      this.favorites.push(favoriteCityWeatherData);
      this.favoriteCities.push(favoriteCityWeatherData.name);
    }
    console.log(this.favorites);
  }

  removeFavoriteCity(city: string) {
    const index = this.favorites.indexOf(city);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    }
  }

  removeAllFavoriteCities(){
    this.favoriteCities = [];
    this.favorites = [];
  }
}
