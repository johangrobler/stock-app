import { Component } from '@angular/core';
import { NavController,Platform ,AlertController,LoadingController } from 'ionic-angular';
import { ApiService } from '../../services/api';
import { Geolocation , BarcodeScanner } from 'ionic-native';


/*
  Generated class for the Stock page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-stock',
  providers:[ApiService],
  templateUrl: 'stock.html'
})
export class StockPage {
  public stock;
  public stocks=[];
  public clinic={name:'',address:'',distance:''};


  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private api: ApiService,
    public platform: Platform,
    public alertCtrl: AlertController) {}
    public coords;
  ionViewDidLoad() {
    this.loadNearistClinic();
  }
  loadNearistClinic(){
    Geolocation.getCurrentPosition().then((resp) => { 
      this.coords = resp.coords;
      this.getNearistClinics(resp.coords);
    }).catch((error) => {
       
    });

  }

  getNearistClinics(coords){
      this.api.get('clinics?latitude='+coords.latitude+'&longitude='+coords.longitude ).subscribe(data => {  
         this.clinic = data[0]; 
         this.loadStock(data[0].id)
     });
  }
  loadStock(id){ 
      this.api.get('stocks?clinic_id='+id ).subscribe(data => {  
         this.stocks = data;
     });
  }
  scan(){
    if(this.platform.is('cordova')){

      BarcodeScanner.scan().then((barcodeData) => { 
        this.findProduct(barcodeData.text);
                
          }, (err) => { 
          });
      } else {
        this.findProduct('this.stocks[0].barcode');
      } 
    }
   findProduct(barcode){
     this.stocks.forEach((stock,index)=>{
       if(stock.barcode==barcode){
         this.stock = stock; 
         stock.background='red'; 
       }
     });
     if(!this.stock){
        let alert = this.alertCtrl.create({
          title: 'Incorrect Product',
          subTitle: 'Product is not part of the stock',
          buttons: ['OK']
        });
        alert.present();
     }

   }
   outOfStock(stock){
     this.stock = stock;
     this.stock.quantity=0;

   }


   sendQuantity(stock){ 

    if(stock.quantity >=0 ){
    } else { 
       let alert = this.alertCtrl.create({
          title: 'Quantity!',
          subTitle: 'Please enter quantity for ' +stock.product_name,
          buttons: ['OK']
        });
      alert.present();
      return false;
    }

    let loader = this.loadingCtrl.create({
      content: "Send quantity to server",
      duration: 5000
    });
    loader.present();
     
  //   Geolocation.getCurrentPosition().then((resp) => { 
      
        stock.latitude=this.coords.latitude;
        stock.longitude=this.coords.longitude;
        
        this.api.post('stock_takes', stock ).subscribe(data => {  
            this.stock=null;
            loader.dismiss();
         });    

    //  }).catch((error) => {
    //    console.log('Error getting location', error);
    //  });

   }
}
