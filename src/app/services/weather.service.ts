import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseurl = 'https://api.openweathermap.org/data/2.5';
  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  getCurrentLocatioWeather(){
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position)=>{
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.getWeatherDataByCoordinates(lat, lon);
      });
    } else {
      alert('geolocation is not supported by your browser')
    }
  }
  getWeatherDataByCoordinates(lat: number, lon: number) {
    const url = `${this.baseurl}?lat=${lat}&lon=${lon}&appid=${environment.apiKey}`;
  }
  getWeather(city: string) {
    const url = `${this.baseurl}/weather?q=${city}&appid=${environment.apiKey}`;
    return <Observable<any>> this.http.get(url)
  }
}
