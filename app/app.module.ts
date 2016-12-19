import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component'; 
import { StockPage }  from '../pages/stock/stock';
import { StartPage }  from '../pages/start/start';
import { StockTakesPage }  from '../pages/stock-takes/stock-takes';
import { ClinicsPage }  from '../pages/clinics/clinics';
import { ClinicPage }  from '../pages/clinic/clinic';

@NgModule({
  declarations: [
    MyApp,
    StockPage,
    StartPage,
    StockTakesPage,
    ClinicsPage,
    ClinicPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StockPage,
    StartPage,
    StockTakesPage,
    ClinicsPage,
    ClinicPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
