import { Injectable } from '@angular/core';
import { WsService } from './ws.Service';
import * as shajs from 'sha.js'
import { DatosService } from './datos.service';


@Injectable()
export class AuthService {
  public user: string = "";
  private auth: string = "";
  private objectCalled: any;


  public constructor(private ws: WsService,private _DatosG: DatosService) { }

  private URL_LOGIN = "URL_LOGIN";
  private URL_REGISTRAR = "URL_REGISTRAR";

  https = [
    { name: "URL_LOGIN", url: "user/login", httpOperation: "post" },
    { name: "URL_REGISTRAR", url: "user/registrar", httpOperation: "post" },
  ]

  public setAuth(user: string, pass: string) {
    this.user = user;
    this.auth = 'Basic ' + btoa(user + ':' + pass);
    this._DatosG.DataAuth = this.auth
  }

  public login(username: string, password: string, objectCalled?: any) {
    
    let pass = shajs('sha256').update(password).digest('hex');
    let body = { "usuario": username.toLowerCase(), "password": pass };
    this.setAuth(username, password);
    this.objectCalled = objectCalled;

    this.ws.httpFunction(this.URL_LOGIN, this, body, "", false, this.https, this.auth);    
  }

  public Registrar(username: string, password: string, firstName: string, lastName: string, direccion: string, email: String, objectCalled?: any) {
    let pass = shajs('sha256').update(password).digest('hex');
    let body = { 
      "username": username.toLowerCase(), 
      "password": pass,            
      "firstName": firstName,
      "lastName": lastName,
      "direccion": direccion,
      "email": email
    };  

    this.auth = "1" // mando cualquier cosa. Total No necesita
    this.objectCalled = objectCalled;

    this.ws.httpFunction(this.URL_REGISTRAR, this, body, "", false, this.https, this.auth);    
  }

  private loggedOK(extraObj: any) {
    console.log("loggedOk", extraObj);
  }
  private RegistroOk(extraObj: any){
    console.log("RegistroOk", extraObj);
  }

  responseOk(urlResource: string, http: string, data: any, ws: any) {
    switch (ws.name) {
      case this.URL_LOGIN:
        this.loggedOK(data);
        if (this.objectCalled) {
          this.objectCalled.responseOk(urlResource, http, data, ws);
        }
        break
    case this.URL_REGISTRAR:
        this.RegistroOk(data);
        if (this.objectCalled) {
          this.objectCalled.responseOk(data);
        }
        break
      
    }
    return
  }
  responseError(urlResource: string, httpOperation: string, data: any, ws: any) {
    switch (ws.name) {
      case this.URL_LOGIN:
        if (this.objectCalled) {
          this.objectCalled.responseError(urlResource, httpOperation, data, ws);
        }
        break;
      case this.URL_REGISTRAR:          
          if (this.objectCalled) {
            this.objectCalled.responseError(data);
          }
          break       
    }
    return
  }
}