import { Component, OnInit } from '@angular/core';
import { checkCookieService } from 'src/app/services/checkCookie.service';
import { PathService } from 'src/app/services/Path.Service';

@Component({
  selector: 'app-CerrarSesion',
  templateUrl: './CerrarSesion.component.html',
  styleUrls: ['./CerrarSesion.component.scss']
})
export class CerrarSesionComponent implements OnInit {

  constructor(
    private _Path: PathService,    
    private checkCookieService: checkCookieService
  ) { }

  ngOnInit(): void {
    
    this._Path.DesLoggearse()
        
    // Borro la Cookie, deslogeo al usuario    
    this.checkCookieService.BorrarCookie()  
    console.log("Cookie Borrada")    


  }

}
