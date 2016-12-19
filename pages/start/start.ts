import { Component } from '@angular/core';
import { NavController ,AlertController,Events,LoadingController} from 'ionic-angular';
import { ApiService } from '../../services/api';
import { StockPage }  from '../stock/stock';
/*
  Generated class for the Start page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-start',
  providers: [ApiService],
  templateUrl: 'start.html'
})
export class StartPage {
  public mobile;
  public pin; 
  public user; 
  public verify_pin;
  constructor(public loadingCtrl: LoadingController, public events: Events,public navCtrl: NavController,private api: ApiService,public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    localStorage.clear();
  }
  login(){
    
    this.api.login(this.mobile,this.pin).subscribe(data => {  
        if(data && data.token){
          localStorage.setItem('stock_token',data.token);
          localStorage.setItem('stock_user',JSON.stringify(data));
          this.navCtrl.setRoot(StockPage);
          this.events.publish('user:update', data);
      } else{
            let alert = this.alertCtrl.create({
              title: 'Login',
              subTitle: 'Please check your pin code '  ,
              buttons: ['OK']
            });
            alert.present();
        }

     },error=>{
          console.log(JSON.stringify(error)); 
     });
  }
  
  checkNumber(){

    let loader = this.loadingCtrl.create({
      content: "Checking mobile number",
      duration: 10000
    });
    
    loader.present();

    this.api.sendPin(this.mobile).subscribe(data => {  
      loader.dismiss();
      if(data.pin){
        this.verify_pin=data.pin;
      } else {
          let alert = this.alertCtrl.create({
              title: 'User not found',
              subTitle: 'You have not been added to the system. Please contact support '  ,
              buttons: ['OK']
            });
            alert.present();
      }
        console.log(JSON.stringify(data)); 
    });
  }
  resend(){
    this.verify_pin=null;
  }
}
