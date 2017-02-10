import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/Rx';

/*
  Generated class for the Forecast page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forecast',
  templateUrl: 'forecast.html'
})
export class ForecastPage {

	location: any;
	lat: any;
	long: any;
	weatherResult: any;

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
  		return this.http.get('http://api.openweathermap.org/data/2.5/forecast?lat=' + this.lat +'&lon=' + this.long + '&APPID=5f3b41fa06f914dbc5d8ce098679f045&units=metric').map(res => res.json());
  	}

  	getWeather(){
  		this.getWeatherData(this.lat,this.long).subscribe(response => {
  			this.weatherResult = response.list;
  			console.log(this.weatherResult);
  		});
  	}

}
