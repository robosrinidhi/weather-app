import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit, OnChanges {
  favoriteCity:Array<string> = [];
  favoriteCityWeatherArray:any = [];

  constructor(
    private favoriteService: FavoriteService,
    public alertController: AlertController
  ) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      subHeader: 'Are you sure want to remove all the favorites?',
      buttons: [  
        {
          text: 'NO',
          role: 'cancel',
        },
        {
        text: 'Yes',
        role: 'confirm',
        handler: () => {
          this.favoriteService.removeAllFavoriteCities();
          this.favoriteCity = [];
          this.favoriteCityWeatherArray = [];
        },
      }
    ],
    });

    await alert.present();
  }

  ngOnInit() {
    this.favoriteCity = [...this.favoriteService.getFavoriteCities()];
    this.favoriteCityWeatherArray = [...this.favoriteService.getFavoriteCityWeather()];
  }


  ionViewDidEnter(){
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

}
