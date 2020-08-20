import { Component, OnInit } from '@angular/core';
import { MatRadioChange} from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DatosService } from 'src/app/services/datos.service';
import { Datos } from 'src/app/Common/DatosCursos';
import { CursosService } from 'src/app/services/cursos.service';


@Component({
  selector: 'CDiabetes',
  templateUrl: './diabetes.component.html',
  styleUrls: ['./diabetes.component.scss']
})
export class DiabetesComponent implements OnInit {

  constructor(         
    public CursosService: CursosService,
    private _snackBar: MatSnackBar,
    public _DatosG: DatosService
    ) { }

    // Buscar en Cursos Disponibles y Traer Datos del curso
    Loading = true
    curso: any   
    TempParteX: Datos[] = []
    tempok: boolean
    tempTot: boolean    
    NotaRta: string
    NotaRtaTemp: number    

    cursoCompleto: boolean = false // Se usa para habilitar el examen
    cursoAprobado: boolean = false // se usa para dar por finalizado el curso, aprobado el examen
    hour: number = 0
    minutes: number = 0
    seconds: number = 0

    TimeOut: boolean

    Preguntas: any

    tempBoolean: boolean = false
    EmpezarTest: boolean = false      
    
  
      ngOnInit(): void {    
        this.Loading = true
        this.CargarCurso()
      this.CursosService.GetCursoId(this._DatosG.DataAuth, this) // aca tengo todo el curso toda la estructura
     
      
      
      // Funcion CheckStatus
       // this.checkStatus(this.curso.secciones[0]);    
      // this.checkStatus(this.Parte2,this.secciones[1]);    
      // this.checkStatus(this.Parte3,this.secciones[2]);    
      // this.checkStatus(this.Parte4,this.secciones[3]);    
      // this.checkStatus(this.Parte5,this.secciones[4]);   
      // this.EndCurso(); // chequea si esta todo finalizado o no // al cargar desde la base de datos deberia ser asi
      }

    CargarCurso(){
      this.CursosService.GetCursoId(this._DatosG.DataAuth, this) // aca tengo todo el curso toda la estructura       
      // Funcion Add Times
      for(let i = 0; i< this.curso.secciones.length; i++)
      {
         // Agrega el tiempo de la suma de partes a la seccion
        for (let j = 0; j < this.curso.secciones[i].partes.length; j++) {
          if (this.curso.secciones[i].partes[j].duration != ""){ 
          this.seconds += parseInt(this.curso.secciones[i].partes[j].duration[4],10)
          this.seconds += parseInt(this.curso.secciones[i].partes[j].duration[3],10) * 10
          this.minutes += parseInt(this.curso.secciones[i].partes[j].duration[1],10) 
          this.minutes += parseInt(this.curso.secciones[i].partes[j].duration[0],10) * 10
          if (this.seconds >= 60 ) {
            this.minutes += 1
            this.seconds -= 60
        
          }
          if (this.minutes >= 60) {
            this.hour +=1
            this.minutes -=60
          }      
          }
        }          
        // esto hacerlo en la base de datos
        this.curso.secciones[i].time = this.hour.toString().padStart(2,"0")+":"+this.minutes.toString().padStart(2,"0")+":"+this.seconds.toString().padStart(2,"0")      
        this.seconds = 0
        this.minutes = 0
        this.hour = 0
      }
    }

    //  checkStatus(ak: Datos[],aj: Secciones){              
    //       this.tempok = false
    //       for (let j=0; j < ak.length; j++)
    //       { 
    //           if(ak[j].completed == true)
    //           {
    //             this.tempok = true
    //           }
    //           else
    //           {
    //             this.tempok = false;
    //             break;                
    //           }
    //       }          
    //       if (this.tempok == true)
    //       {
    //         aj.completed = true
    //       }
    //       else{
    //         aj.completed = false
    //       }
    //       this.EndCurso();               
    //  } 

    
     EndCurso(){
      for(let i = 0; i< this.curso.secciones.length; i++){
        if(this.curso.secciones[i].completed == true)
        {
            this.tempTot=true
        }
        else
        {
            this.tempTot=false
            break;
        }        
      }
      if (this.tempTot==true)
      {
        this.cursoCompleto=true        
      }
      else
      {
      this.cursoCompleto=false
      }
     }

      
    ended(i: number, h: number){   
      // Recibe i = Partes // j = seccion
      
      this.TempParteX=this.curso.secciones[h].partes
      this.TempParteX[i].completed = true 
      this.TempParteX[i].abierto = false
  
      // Si todos estan checked => checked seccion
      this.tempBoolean = false
      for (let a of this.TempParteX)
      {    
        if ( a.completed == true) {
          this.tempBoolean = true;
        }
        else {
          this.tempBoolean = false;
          this.cursoCompleto = false;
          break;
        }
      }
      if(this.tempBoolean ==true){

        // Esto hacerlo en la base de datos
        this.curso.secciones[h].completed=true;
        this.curso.secciones[h].active =false;        
      }
      this.EndCurso(); // chequea si todas las secciones estan ok para habilitar examen
    }
    comenzarTest(){      
      //
      this.EmpezarTest =true
      this.TimeOut = false
    }
    TimerEvent($event){
      if($event.left === 0){
        this.TimeOut = true        
        for ( let i = 0; i < this.curso.Preguntas.length ; i++) {       
          if(this.curso.Preguntas[i].Seleccion == 0)
          {
            this.curso.Preguntas[i].Seleccion = 5;            
          }
        }
        // granar las selecciones asi.
        this.finalizarExamen()
        //Se acabo el Test, tomar acciones
      }
    }

    onChange(mrChange: MatRadioChange,i:number) {      
      this.curso.Preguntas[i].Seleccion = mrChange.value; // Graba en la estructura que respuesta eligieron al momento de hacer el examen
      // Esto tiene que ser a la tabla!!!!
   } 
   
   Nota(): string { // Calcula la nota del examen
     this.NotaRta = ""
    this.NotaRtaTemp = 0;
    for(let i = 0; i<this.curso.Preguntas.length ; i++)
    {
      if(this.curso.Preguntas[i].Seleccion == this.curso.Preguntas[i].rta)
        {
          this.NotaRtaTemp +=1;
        }
    }
    this.NotaRtaTemp = (this.NotaRtaTemp / this.curso.Preguntas.length) * 10    
    if ((this.NotaRtaTemp % 1) != 0) // si tiene decimales poner precision, sino no el % 1 da 0 solo si es entero, o sea 
    {
      this.NotaRta = this.NotaRtaTemp.toPrecision(3)
    }        
    else{
      this.NotaRta = this.NotaRtaTemp.toString()
    }
    
     return this.NotaRta
   }

   finalizarExamen(){ // Finaliza el examen antes del tiempo comprobando que no falten respuestas por responder y da la nota.
    // Falta definir que hacer si aprueba o no.     
     this.tempok = true
     for ( let i = 0; i < this.curso.Preguntas.length ; i++) {       
       if(this.curso.Preguntas[i].Seleccion == 0)
       {
         this.tempok = false
         break;
       }
     }

     if(this.tempok == false)
      {
        this._snackBar.open("Hay preguntas sin responder ","Revise",{
          duration: 4000,
        });
      }

      else
      {
        this._snackBar.open("Examen completo! ","Nota: "+this.Nota(),{
          duration: 6000,
        });
        if(this.NotaRtaTemp >= this.curso.notaAprobacion)
        {
          // Examen Aprobado
          this.cursoAprobado = true
          this.EmpezarTest = false
          this.NotaRta = this.NotaRta + " - Aprobado"
        }
        else{
          // Examen Reprobado.
          // que hacemos?

          this.cursoAprobado = true
          this.EmpezarTest = false
          this.NotaRta = this.NotaRta + " - No aprobado"
        }
      }
      // Grabar Nota del examen en Tabla 
      // this.curso.NotaRta = this.NotaRta



   }

   responseOk(a,b,data,d){
    this.curso = data
    console.log("Cursos OK - Array cargado" + data)   
    this.Loading = false
  }

  responseError(){
    console.log("Cursos No cargados. Error") 
    this.Loading = false
  }
  }
  
  