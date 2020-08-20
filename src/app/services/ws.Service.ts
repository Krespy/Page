import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { DatosService } from './datos.service';
import { retry } from 'rxjs/operators';


@Injectable()
export class WsService{
    private auth: string;
    private retry: number = 0;
    public allowCache: boolean = false; 
    private cache: any = [];

    public setAuthCredentials(auth: string){
        this.auth = auth; 
    }

    constructor(
        private http: HttpClient,
        private _DatosG: DatosService
        ) { 
    }


    public environmentServer(): String{
        let server: string = this._DatosG.UrlServidor
        return server; //environment.server;
    }
    
    public httpOptions(ws: any, authCredentials: String): HttpHeaders{
        let ContentType: string = "application/json";
        let httpHeaders: HttpHeaders;
        if(!ws || !ws.ContentType){
            return new HttpHeaders ({
                'Content-Type': ContentType,
                'Authorization': authCredentials.toString()
              });   
        }
        if(ws.ContentType && ws.ContentType != ""){
            if(ws.ContentType != "*"){
                ContentType = ws.ContentType;
                 httpHeaders = new HttpHeaders ({
                    'Content-Type': ContentType,
                    'Authorization': authCredentials.toString()
                  });                
            }else{
                httpHeaders = new HttpHeaders ({
                    'Authorization': authCredentials.toString()
                  });                 
            }
        }
        
        return httpHeaders;
    }

    public findWs(wsName: string, https: any ){
        wsName = wsName.toUpperCase();
        for(let element of https){
            if(wsName == element.name.toUpperCase() ){
                return element;
            }
        }
        return null; 
    }


    getCache(url: string, body: any): any{
        let bodyStringfy = JSON.stringify(body)
        for(let cache of this.cache){
            if(cache.url == url){
                if(bodyStringfy === cache.bodyStringfy){
                    //Consultar el tiempo
                    return cache;    
                }
            }
        }
        return undefined;
    }

    setCache(url: string, body: any, data: any){
        if(this.allowCache == false){
            return; 
        }
        
        let bodyStringfy: string = JSON.stringify(body)
        let cacheNew: any = {"url": url, "body": body, "data": data, "date": new Date(),"bodyStringfy": bodyStringfy };
        this.cache.push(cacheNew);
    }
    
    httpFunction(httpName:string, component: any, body?: any, parameters?: any, getString?:boolean, httpsList?: any, authCredentials?: String){
        let element = this.findWs(httpName, httpsList);
        if(!element){
            console.error("No se encontro el wsName=", httpName);
            return;
        }
        if(httpName == "URL_CURSOS_ID")
            {
                element.url = "cursos/" + this._DatosG.CursoId
            }
        if(!authCredentials){
            authCredentials = this.auth;
        }

        let url = element.url; 
        //replace parameters
        if(parameters){
            for(let parameter of parameters){
                url = url.replace( "%" + parameter.key + "%", parameter.value);
            }
        }
        if(getString){
            let urlApi = this.environmentServer();
            url = urlApi + url; 
            return  url;           
        }

        let cacheReturn = undefined;
        if(element.cache != undefined && element.cache == true){
            cacheReturn = this.getCache(url,body)
        }
        if(cacheReturn == undefined){
            this.httpFunctionCustom(component, element.httpOperation, url, body, element,authCredentials );
        }else{
            console.warn("ResponseOk - Cache");
            this.responseOk(component,url,element.httpOperation.toLowerCase(),cacheReturn.data,element,body,true);
        }
    }


    httpFunctionCustom(component: any, httpOperation: string, urlResource: string, body: any, ws?:any, authCredentials?: String) {
        let urlApi = this._DatosG.UrlServidor
        let url = urlApi + urlResource;

        //console.warn("httpFunction: " + httpOperation + " " + urlResource + " ==> " + url);
        //console.warn("body:", body);        
        //environment.server
        
        switch(httpOperation.toLowerCase()){
            case "get":
                this.httpGet(ws,url,authCredentials).subscribe(data => {this.responseOk(component,urlResource,httpOperation, data, ws, {});}, error=>{this.responseError(component,urlResource,httpOperation, error, ws);});
            break;
            case "post":
                this.httpPost(ws, url, body,authCredentials).subscribe(data => {this.responseOk(component,urlResource,httpOperation, data, ws, body);}, error=>{this.responseError(component,urlResource,httpOperation, error,ws);});
            break;
            case "put":
                this.httpPut(ws, url, body,authCredentials).subscribe(data => {this.responseOk(component,urlResource,httpOperation, data, ws,body);}, error=>{this.responseError(component,urlResource,httpOperation, error,ws);});
            break;
            case "delete":
                this.httpDelete(ws, url,authCredentials).subscribe(data => {this.responseOk(component,urlResource,httpOperation, data, ws,{});}, error=>{this.responseError(component,urlResource,httpOperation, error,ws);});
            break;                        
        }
    }

    public httpPostFind (url:string, body:any, authCredentials: string ): Observable<any> {
        let headers: HttpHeaders = this.httpOptions(undefined,authCredentials);
        return this.http
               .post(url, body, {headers})
    }
  

    
    private httpGet (ws: any, url:string,authCredentials: String): Observable<{}> {
        let headers: HttpHeaders = this.httpOptions(ws, authCredentials);
        return this.http
               .get(url, {headers})
               .pipe(
                    retry(this.retry),
                    // catchError(this.handleError)
               )
    }    
    private httpPost (ws: any, url:string, body:any, authCredentials: String): Observable<{}> {
        let headers: HttpHeaders = this.httpOptions(ws, authCredentials);
        return this.http
               .post(url, body, {headers})
               .pipe(
                    retry(this.retry),
               )
    }     
    private httpPut (ws: any, url:string, body:any, authCredentials: String): Observable<{}> {
        let headers: HttpHeaders = this.httpOptions(ws, authCredentials);
        return this.http
               .put(url, body, {headers})
               .pipe(
                    retry(this.retry),
               )
    }    
    private httpDelete (ws: any, url:string, authCredentials: String): Observable<{}> {
        let headers: HttpHeaders = this.httpOptions(ws, authCredentials);
        return this.http
               .delete(url, {headers})
               .pipe(
                    retry(this.retry),
               )
    }   


    private responseOk(component:any, urlResource: string,httpOperation: string, data:any, ws?: any, body?:any, getCache?:boolean){
        console.warn("responseOk - WsService: " + urlResource, data);
        if(ws.cache !=undefined && ws.cache == true && getCache ==undefined ){
            this.setCache(urlResource,body,data);
        }
        component.responseOk(urlResource,httpOperation, data, ws);
    }

    private responseError(component:any, urlResource: string,httpOperation: string, data:any, ws?: any){
        let dataError = '';
        let dataMessage = '';
        let dataException = '';
        console.warn("ResponseError - WsService: " + urlResource, data);
        if(data){
            if(data.message){
                dataMessage = data.message;
            }
            if(data.error){
                dataError = data.error;
            }
            if(data.exception){
                dataException = data.exception;
            }
        }
        component.responseError(urlResource, httpOperation, data, ws);        
    }
    
}