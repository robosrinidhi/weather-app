import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseurl = 'https://api.openweathermap.org/data/2.5/weather';
  private reverseGeocodingUrl = 'https://api.openweathermap.org/geo/1.0/reverse';

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }
    
    getCurrentLocation(): Promise<any> {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              });
            },
            (error) => {
              reject('Error getting location');
            }
          );
        } else {
          reject('Geolocation is not supported');
        }
      });
    }    
    getCurrentCity(latitude: number, longitude: number): Observable<string> {
      const url = `${this.reverseGeocodingUrl}?lat=${latitude}&lon=${longitude}&limit=1&appid=${environment.apiKey}`;
      return this.http.get<any[]>(url).pipe(
        map((response: any) => {
          if (response.length > 0) {
            return response[0].name;
          }
          return '';
        })
      );
    }
  getCurrentWeatherByCoordinates(latitude: number, longitude: number): Observable<any> {
    const url = `${this.baseurl}?lat=${latitude}&lon=${longitude}&APPID=${environment.apiKey}`;
    return this.http.get(url);
  }
  getWeather(city: string) {
    const url = `${this.baseurl}?q=${city}&APPID=${environment.apiKey}`;
    return <Observable<any>> this.http.get(url)
  }
}
