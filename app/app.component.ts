import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native'; 
import { StockPage }  from '../pages/stock/stock';
import { StartPage }  from '../pages/start/start';
import { StockTakesPage }  from '../pages/stock-takes/stock-takes';
import { ClinicsPage }  from '../pages/clinics/clinics';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = StockPage;

  pages: Array<{title: string, component: any ,icon: string, desc:string}>;

  public user;

  constructor(public platform: Platform,public events: Events) {
    if(window.localStorage.getItem('stock_user')){
      this.user = JSON.parse(window.localStorage.getItem('stock_user')); 
    }
    events.subscribe('user:update', (userEventData) => {
       console.log(JSON.stringify('USER CHANGED:'+userEventData));
       this.user = JSON.parse(window.localStorage.getItem('stock_user'));    
    });
    
    if(localStorage.getItem('stock_token')){ 
      this.rootPage =StockPage;
    } else {
      this.rootPage =StartPage;
    }

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Clinic Stock', component: StockPage ,icon:'pin', desc:'Take stock' },
      { title: 'Stock Takes', component: StockTakesPage ,icon:'done-all', desc:'Stock take history'},
      { title: 'Clinics', component: ClinicsPage ,icon:'medkit', desc:'Nearist clinics'},
      { title: 'Logout', component: StartPage, icon:'person', desc:'Login as user' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      StatusBar.backgroundColorByName('lightGray');
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
