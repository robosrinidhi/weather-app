import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import cities from 'src/app/data/cityname';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  showSearchBar: boolean = false;
  searchTerm: string = '';
  searchResults: any;
  weatherData: any;
  currentCity: string = '';
  currentDate: Date = new Date();
  weatherIcon: string = '';
  temperatureUnit: 'celsius' | 'fahrenheit' = 'celsius';
  convertedTemperature: number = 0;
  temperature: number = 0;
  isFavorite: boolean = false;

  constructor(
    private weatherService: WeatherService,
    private favoriteService: FavoriteService
    ) { }

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
    if (!this.showSearchBar) {
      this.searchTerm = '';
    }
  }

  handleInput(event: any) {
    this.searchResults = Object.values(cities).filter((v) => isNaN(Number(v)))
    const query = event.target.value.toLowerCase();
    this.searchResults = this.searchResults.filter((d: any) => {
      return d.toLowerCase().indexOf(query) !== -1
    });
  }

  addToFavorites(){
    this.isFavorite = true;
    this.favoriteService.addFavoriteCity(this.weatherData);
  }
  weatherLocation(event: any) {
    this.weatherService.getWeather(event.target.innerHTML).subscribe((data: any) => {
      this.weatherData = data;
      this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherData?.weather[0].icon}.png`;
      this.temperature = data.main.temp;
      this.convertTemperature();
      this.toggleSearchBar();
      this.currentCity = event.target.innerHTML;

      this.isFavorite = false;

      this.favoriteService.getFavoriteCities().forEach((data)=>{
        if(this.currentCity === data){
          this.isFavorite = true;
        }
        this.isFavorite = false;
      })
      console.log(this.isFavorite);
    });
  }

  getWeather() {
    this.weatherService.getCurrentLocation()
      .then((location: any) => {
        console.log(location);
        this.weatherService.getCurrentWeatherByCoordinates(location.latitude, location.longitude)
          .subscribe((data: any) => {
            this.weatherData = data;
            this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherData?.weather[0].icon}.png`;
            this.temperature = data.main.temp;
            this.convertTemperature();
          });
        this.weatherService.getCurrentCity(location.latitude, location.longitude)
          .subscribe((city: string) => {
            this.currentCity = city;
          });
      })
      .catch((error: string) => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.getWeather();
    this.searchResults = Object.values(cities).filter((v) => isNaN(Number(v)));
  }

  onTemperatureUnitChange() {
    this.convertTemperature();
  }

  convertTemperature() {
    if (this.temperatureUnit === 'celsius') {
      this.convertedTemperature = Math.round(this.temperature - 273.15);
    } else {
      this.convertedTemperature = Math.round((this.temperature - 273.15) * 9 / 5 + 32);
    }
  }

  convertAnyTemperature(temprature: number) {
    let newTemperature;
    if (this.temperatureUnit === 'celsius') {
      newTemperature = Math.round(temprature - 273.15);
    } else {
      newTemperature = Math.round((temprature - 273.15) * 9 / 5 + 32);
    }
    return newTemperature;
  }

}
