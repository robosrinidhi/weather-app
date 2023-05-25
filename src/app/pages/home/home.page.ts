import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  weatherData: any;
  currentCity: string = '';
  currentDate: Date = new Date();
  weatherIcon: string = '';
  temperatureUnit: 'celsius' | 'fahrenheit' = 'celsius';
  convertedTemperature: number = 0;
  temperature: number = 0;

  constructor(private weatherService: WeatherService) {
  }

  getWeather() {
    this.weatherService.getCurrentLocation()
      .then((location: any) => {
        console.log(location);
        this.weatherService.getCurrentWeatherByCoordinates(location.latitude, location.longitude)
          .subscribe((data: any) => {
            this.weatherData = data;
            console.log(this.weatherData);
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

}
