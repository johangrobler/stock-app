import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation  } from 'ionic-native';
import { ApiService } from '../../services/api';
/*
  Generated class for the StockTakes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-stock-takes',
  providers:[ApiService],
  templateUrl: 'stock-takes.html'
})
export class StockTakesPage {
  public stock_takes;

  constructor( private api: ApiService,public navCtrl: NavController) {
      if(localStorage.getItem('stock_takes')){
        this.stock_takes = JSON.parse(localStorage.getItem('stock_takes'));
    }

  }

 ionViewDidLoad() {
    this.loadNearistClinic();
  }
  loadNearistClinic(){
    Geolocation.getCurrentPosition().then((resp) => { 
      this.getNearistClinics(resp.coords);
    }).catch((error) => {
       
    });

  }

  getNearistClinics(coords){
      this.api.get('stock_takes?latitude='+coords.latitude+'&longitude='+coords.longitude ).subscribe(data => {  
        
         this.stock_takes= data;  

         localStorage.setItem('stock_takes',JSON.stringify(data));
     });
  }
}
