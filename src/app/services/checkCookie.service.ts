import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DatosService } from './datos.service';

@Injectable({
  providedIn: 'root'
})
export class checkCookieService {    
    private cookieName: string = this._DatosG.CookieNombre
    private CookieAceppted: string = this._DatosG.CookieOkPage

    constructor(
        private cookieService: CookieService,
        private _DatosG: DatosService
    ){}

    CheckAceptarCookies(){
        if(this.cookieService.check(this.CookieAceppted)){                               
            return true 
            }
        return false        
    }

    AceptarCookies()
    {
        this.cookieService.set(this.CookieAceppted, "El Usuario acepto la Cookie para poder navegar")        
    }
    
    BorrarCookieAceptada(){ // Esta funcion no la llama nadie, es de prueba
        return this.cookieService.delete(this.CookieAceppted) // El nombre de la cookie
    }

    BorrarCookie(){
        return this.cookieService.delete(this.cookieName) // El nombre de la cookie
    }

    ObtenerCookie(){
        let tempstring: string
        tempstring = this.cookieService.get(this.cookieName)
        this._DatosG.CookieId = Number(tempstring.substring(0 ,tempstring.indexOf("?")))
        this._DatosG.DataAuth = tempstring.substring(tempstring.indexOf("?") + 1,tempstring.length) 
    }

    GrabarCookie(cookieValue: string){
        this.cookieService.set(this.cookieName, cookieValue + "?" + this._DatosG.DataAuth,30)
        this._DatosG.CookieId = Number(cookieValue)
        console.log("Cookie id: " + this._DatosG.CookieId + " Agregada")                  
    }

    check(): boolean
    {   
        if(this.cookieService.check(this.cookieName)){
            this.ObtenerCookie()            
            console.log("Cookie Cargada - Id: " + this._DatosG.CookieId)
            return true
        }
        else
        {
            console.log("No hay cookie")
            return false
        }
    }
}
