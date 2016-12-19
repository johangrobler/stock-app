import {Injectable} from "@angular/core"; 
import {Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';  
import 'rxjs/Rx';   
@Injectable()
export class ApiService {  
 
  //private api='http://localhost:3000/api/';
  private api='https://mezzanine-stock.herokuapp.com/api/';
  private options;

  constructor(private http: Http ) {   

    let token ='';    
    if(localStorage.getItem('stock_token')){
        token  =  localStorage.getItem('stock_token');
    } 
    let headers = new Headers({ 
        'Content-Type': 'application/json', 
        'Authorization': 'Token token="'+ token +'"'
    }); 
    this.options = new RequestOptions({ headers: headers });      
  }

  post(resource,data){ 
    let body = JSON.stringify(data); 
    let url = this.api+resource;
    return this.http.post(url, body, this.options).map(res => res.json()) 
  }
  get(url){
    return this.http.get(this.api+url, this.options).map(res => res.json()) 
  }

  patch(resource,data){ 
    let body = JSON.stringify(data); 
    let url = this.api+resource;
    return this.http.patch(url, body, this.options)
  }
  delete(resource){ 
    let url = this.api+resource;
    return this.http.delete(url, this.options)
  }
 login(mobile,pin){ 
    let body = JSON.stringify({mobile:mobile,pin:pin}); 
    let url = this.api+'users';
    return this.http.post(url, body, this.options).map(res => res.json()) 
  }

 sendPin(mobile){  
    let url = this.api+'users/'+mobile;
    return this.http.get(url,  this.options).map(res => res.json()) 
  }
}