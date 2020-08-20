import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DatosService } from 'src/app/services/datos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import { checkCookieService } from 'src/app/services/checkCookie.service';
import { PathService } from 'src/app/services/Path.Service';

@Component({
  selector: 'CardCursos',
  templateUrl: './card-cursos.component.html',
  styleUrls: ['./card-cursos.component.scss']
})
export class CardCursosComponent implements OnInit {  
  @Input() modo: string; // FrontPage o Perfil
  @Output() propagar = new EventEmitter<string>();

  cursos: any
  Loading = true
  page_size: number = 4
  page_number: number = 1
  pageSizeOptions = [2, 4, 8, 16]

  constructor(
    public _DatosG: DatosService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _path: PathService,
    private checkCookieService: checkCookieService,
    private CursosService: CursosService
  ) { }

  BotonText: string = ""
 
  ngOnInit(): void {    
    this.Loading = true
    this.ConseguirCursos()
  }

  handlePage(e: PageEvent){
    this.Loading = true
    this.page_number = e.pageIndex + 1
    this.page_size = e.pageSize
    this.ConseguirCursos() //-----------------------> Necesito hacer esto, pero me deja funcionar el paginator, no actualiza el star index.
  }
 

  Boton(id: number, nombre: string)
  {
    // Accion del boton del curso  
    // Accion de comprar
    if(this.modo == "FrontPage")
    {
      if(!this._DatosG.logeado){
        // Si no esta logeado.
          this._snackBar.open("Por favor: ", "inicie sesión", {
            duration: 4000,
          });
          this._router.navigate(['/iniciar-sesion'])              
      }
      else {
        // SI esta logeado.
          this._DatosG.CursoId = id // Selecciona el curso a comprar
          this._router.navigate(['/Compra',"curso?" + id]) 
          this._snackBar.open("Eligio el curso nro: " + id.toString(), nombre, {
              duration: 4000,
            });
          }   
    }
    else if (this.modo == "Perfil")
    {
      // Accion de Ingresar
      console.log("Se selecciono el curso Nro: " + id)   
      this._DatosG.CursoId = id         
      this._router.navigate(['/Curso',id]) // Selecciona el curso a mostrar
      this._snackBar.open("Selecciono el curso nro:", id.toString(), {
        duration: 4000,
      });
    }    
  }
  responseOk(a,b,data,d){
    this.cursos = data
    console.log("Cursos OK - Array cargado - largo: " + data.content.length)   
    this.Loading = false
    this.propagar.emit("Cargado");
  }

  responseError(){
    console.log("Cursos No cargados. Error") 
    this.Loading = false
    this.propagar.emit("Cargado");
  }

  ConseguirCursos(){
    if(!this.checkCookieService.check()){
      this._path.DesLoggearse()
    } 
    if(this.modo == "FrontPage")
    {                 
      if(this._DatosG.logeado)
        {                
          this.CursosService.GetCursos("Resto",this._DatosG.DataAuth,this.page_number, this.page_size, this)
          console.log("GetCursosResto - Usuario Loggeado en front page")
        }
      else
        {          
          this.CursosService.GetCursos("Cursos",this._DatosG.DataAuth,this.page_number, this.page_size, this)
          console.log("GetCursos - sin usuario en front page")
        } 
      this.BotonText = "Adquirir"
    }
    else if (this.modo == "Perfil")
    {           
      this.CursosService.GetCursos("User",this._DatosG.DataAuth,this.page_number, this.page_size, this)
      this.BotonText = "Ingresar"
    }    
    return
  }
}