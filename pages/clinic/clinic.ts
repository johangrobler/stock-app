import { Component } from '@angular/core';

import { NavController ,NavParams,AlertController} from 'ionic-angular';

@Component({
  selector: 'page-clinic',
  templateUrl: 'clinic.html'
})
export class ClinicPage {
  public clinic;
  constructor(public navCtrl: NavController, public params:NavParams,public alertCtrl: AlertController) {
    this.clinic = params.get('clinic');
    console.log(JSON.stringify(this.clinic));
  }
  takeMeThere(){
      let alert = this.alertCtrl.create({
          title: 'Ionic View',
          subTitle: 'Plugin not enabled',
          buttons: ['OK']
        });
        alert.present();
  }

}
