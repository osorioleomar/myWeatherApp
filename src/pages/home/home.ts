import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { ForecastPage } from '../forecast/forecast';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	location: any;
	lat: any;
	long: any;
	weatherResult: any = {
		main:{
			temp:0,
		}
	}
	dateToday: any = new Date();

  	constructor(public navCtrl: NavController, public http:Http) {
  		this.getLocation().subscribe(response => {
  			this.location = response.loc.split(',');
  			this.lat = this.location[0];
  			this.long = this.location[1];
  			this.getWeather();
  		});
  	}

  	getLocation(){
  		return this.http.get('http://ipinfo.io/json').map(res => res.json());
  	}

  	getWeatherData(lat,long){
  		return this.http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + this.lat +'&lon=' + this.long + '&APPID=5f3b41fa06f914dbc5d8ce098679f045&units=metric').map(res => res.json());
  	}

  	getWeather(){
  		this.getWeatherData(this.lat,this.long).subscribe(response => {
  			this.weatherResult = response;
  		});
  	}

  	seeForecast(){
  		this.navCtrl.push(ForecastPage);
  	}

}
