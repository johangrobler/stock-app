import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation  } from 'ionic-native';
import { ApiService } from '../../services/api';
import { ClinicPage }  from '../clinic/clinic';

/*
  Loads nearist clinics 
  ---------------------
  1. Get users Geolocation: loadNearistClinic();
  2. Do get request with coordinates: getNearistClinic()

*/
@Component({
  selector: 'page-clinics',
  providers:[ApiService],
  templateUrl: 'clinics.html'
})
export class ClinicsPage {
  public clinics=[];
  constructor(public navCtrl: NavController,private api: ApiService) {


    if(localStorage.getItem('clinics')){
        this.clinics = JSON.parse(localStorage.getItem('clinics'));
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
      this.api.get('clinics?latitude='+coords.latitude+'&longitude='+coords.longitude ).subscribe(data => {  
         this.clinics= data;  
         localStorage.setItem('clinics',JSON.stringify(data));
     });
  }
  openClinic(clinic){
    this.navCtrl.push(ClinicPage,{clinic:clinic});
  }
}
