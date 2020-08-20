import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mercado-pago',
  templateUrl: './mercado-pago.component.html',
  styleUrls: ['./mercado-pago.component.scss']
})
export class MercadoPagoComponent implements OnInit {
 

  
  temp: any
  ACCESS_TOKEN: "TEST-6440576212670764-060605-015efe5acbc817776e6dfbd400a2e7a8-3467227"
  
    constructor(
    public _DatosG: DatosService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._DatosG.activeLinkIndex = -1;
    
     // Crea un objeto de preferencia
    var preference = {
      "items": [
          {
              "id": "item-ID-1234",
              "title": "Mi producto",
              "currency_id": "ARS",
              "picture_url": "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
              "description": "Descripción del Item",
              "category_id": "art",
              "quantity": 1,
              "unit_price": 75.76
          }
      ],
      "payer": {
          "name": "Juan",
          "surname": "Lopez",
          "email": "a.sancheztaccone@email.com",
          "phone": {
              "area_code": "11",
              "number": "4444-4444"
          },
          "identification": {
              "type": "DNI",
              "number": "12345678"
          },
          "address": {
              "street_name": "Street",
              "street_number": 123,
              "zip_code": "5700"
          }
      },
      "back_urls": {
          "success": "https://www.success.com",
          "failure": "http://www.failure.com",
          "pending": "http://www.pending.com"
      },
      "auto_return": "approved",
      "payment_methods": {
          "excluded_payment_methods": [
              {
                  "id": "master"
              }
          ],
          "excluded_payment_types": [
              {
                  "id": "visa"
              }
          ],
          "installments": 12
      },
      "notification_url": "https://www.your-site.com/ipn",
      "external_reference": "Reference_1234",
      "expires": true
      //"expiration_date_from": "2016-02-01T12:00:00.000-04:00",
      //"expiration_date_to": "2016-02-28T12:00:00.000-04:00"
    }
  // Ejemplo 1:

  // SDK de Mercado Pago
  var require: any; // Problemas con el require!!!!
  const mercadopago = require ('mercadopago/index.js');

  // Agrega credenciales
  mercadopago.configure({
    access_token: 'ACCESS_TOKEN'
  });

 

  mercadopago.preferences.create(preference)
  .then(function(response){
  // Este valor reemplazará el string "$$init_point$$" en tu HTML
  this.temp = response.body.init_point
  }).catch(function(error){
    console.log(error);
  });
  }

  Comprar(){
    // this.UsuariosService.setCurso(this._DatosG.CookieId,this._DatosG.CursoId)
    this._snackBar.open("Curso Comprado", "Curso: " + this._DatosG.CursoId , {
      duration: 4000,
      });
    this._router.navigate(['/perfil', this._DatosG.CookieId])    
  }

}
