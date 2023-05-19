import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    weatherData: any;
    city: string = '';
  constructor(private weatherService: WeatherService) { }

  getWeather(){
    if(this.city) {
      this.weatherService.getWeather(this.city).subscribe((data)=>{
        this.weatherData = data;
      });
    }
  }

  ngOnInit() {
  }

}
