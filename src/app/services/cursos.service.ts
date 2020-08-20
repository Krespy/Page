import { Injectable } from '@angular/core';
import { WsService } from './ws.Service';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  public user: string = "";
  private auth: string = "";
  private objectCalled: any;

  constructor(private ws: WsService,    
  ) { }
   
    private URL_CURSOS = "URL_CURSOS"; // FrontPage Sin usuario
    private URL_CURSOS_RESTO = "URL_CURSOS_RESTO"; // FrontPage con usuario
    private URL_USER_CURSOS = "URL_USER_CURSOS"; // Perfil
    private URL_CURSOS_ID = "URL_CURSOS_ID"; // Curso Elegido

  https = [
    { name: "URL_USER_CURSOS", url: "user/cursos/paginate", httpOperation: "post" },
    { name: "URL_CURSOS", url: "cursos/paginate", httpOperation: "post" },
    { name: "URL_CURSOS_RESTO", url: "user/cursosnoinscriptos/paginate", httpOperation: "post" },
    { name: "URL_CURSOS_ID", url: "cursos/", httpOperation: "get" },
  ]
  
  public GetCursoId(auth, objectCalled?: any){
    let url = this.URL_CURSOS_ID  
    let body = ""
    this.auth = auth
    console.log("Auth: " + this.auth)  
    console.log("Url: " + url)  
    
    this.objectCalled = objectCalled;
    this.ws.httpFunction(url, this, body, "", false, this.https, this.auth);    
  }

  public GetCursos(modo, auth, page, size, objectCalled?: any){
    let url = ""    
    let body = {
      "page": page-1,
      "size": size
  }    
    switch (modo){
    case  "User": url = this.URL_USER_CURSOS
          this.auth = auth
          break;
    case "Cursos": url = this.URL_CURSOS
          this.auth = 'Basic ' + btoa("Admin" + ':' + "AdminCursos.!");
          break;
    case "Resto": url = this.URL_CURSOS_RESTO
          this.auth = auth
          break;
    }

  console.log("Auth: " + this.auth)  
  console.log("Url: " + url)  
  console.log("Pagina: "+ (page-1))
  console.log("Size: "+ size)
  
  this.objectCalled = objectCalled;
  this.ws.httpFunction(url, this, body, "", false, this.https, this.auth);    
  }

  responseOk(urlResource: string, http: string, data: any, ws: any) {
    console.log("loggedOk", data);
    this.objectCalled.responseOk(urlResource, http, data, ws);    
  }

  responseError(urlResource: string, httpOperation: string, data: any, ws: any) {
    console.log("Error en cursos")
    console.log("Data: "+ data)
    this.objectCalled.responseError(urlResource, httpOperation, data, ws);
  }

}
