import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService  {
//implements InMemoryDbService
  constructor() { }
  createDb(){
    let Users = [     
        { id: 1,
          "name": "Alejandro Sanchez",
          "username": "Ale",
          "email": "Alejandro@Smartways.com.ar",
          "clave": "123",
          "tipo": "Admin",
          "cursos": [
              {"id": 0},
              {"id": 1},
              {"id": 2},
              {"id": 3},
              {"id": 4},
              {"id": 5},
              {"id": 6},
              {"id": 7},
              {"id": 8}
          ]
        },
        {
          id: 2,
          "name": "Maria Luisa Soria",
          "username": "MLS",
          "email": "abc@gmail.com",
          "clave": "123",
          "tipo": "Admin",
          "cursos": [
              {"id": 0},
              {"id": 1},
              {"id": 2},
              {"id": 3},
              {"id": 4},
              {"id": 5},
              {"id": 6},
              {"id": 7},
              {"id": 8}
          ]
        },
        {
          id: 3,
          "name": "Ejemplo 1",
          "username": "Bat",
          "email": "Sincere@april.biz",
          "clave": "1",
          "tipo": "Cliente",
          "cursos": [
              {"id": 1},
              {"id": 2},
              {"id": 3}
          ]
        },
        {
          id: 4,
          "name": "Ejemplo 2",
          "username": "Cat",
          "email": "Sincere@april.biz",
          "clave": "1",
          "tipo": "Cliente",
          "cursos": [
              {"id": 5},
              {"id": 8},
              {"id": 0}
          ]
        }        
    ];
  
      // imagenes Foto : 750x600, o todas iguales.!
    let CursosPresentacion = [
      {        
        id: 0,
        icono: "https://material.angular.io/assets/img/examples/shiba1.jpg",
        nombre: "Diabetes",
        subnombre: "Capacitacion Geronte",
        foto: "https://material.angular.io/assets/img/examples/shiba2.jpg",
        descripcion: "Curso de actualizacion para personas afines",        
        precio: "2,22"
      },
      { id: 1, icono: "https://material.angular.io/assets/img/examples/shiba1.jpg", nombre: "Curso 1", subnombre: "Capacitacion Geronte", foto: "https://www.pololine.com/wp-content/uploads/2019/01/winnerlafamilia-750x600.jpg", descripcion: "Curso de actualizacion para personas afines",precio: "2,22"},
      { id: 2, icono: "https://material.angular.io/assets/img/examples/shiba1.jpg", nombre: "Curso 2", subnombre: "Capacitacion Geronte", foto: "https://www.gamba.fm/wp-content/uploads/2019/03/yuyamika-750x600.jpg", descripcion: "Curso de actualizacion para personas afines",precio: "2,22"},
      { id: 3, icono: "https://material.angular.io/assets/img/examples/shiba1.jpg", nombre: "Curso 3", subnombre: "Capacitacion Geronte", foto: "https://estaciondelvalle963.com.ar/wp-content/uploads/2019/11/IWSHIL7SIFHP5FYZGIOCBWNRCA-750x600.jpg", descripcion: "Curso de actualizacion para personas afines",precio: "2,22"},
      { id: 4, icono: "https://material.angular.io/assets/img/examples/shiba1.jpg", nombre: "Curso 4", subnombre: "Capacitacion Geronte", foto: "https://www.saavedraonline.com.ar/wp-content/uploads/2018/11/linea-76-750x600.jpg", descripcion: "Curso de actualizacion para personas afines",precio: "2,22"},
      { id: 5, icono: "https://material.angular.io/assets/img/examples/shiba1.jpg", nombre: "Curso 5", subnombre: "Capacitacion Geronte", foto: "https://www.circuitogastronomico.com/wp-content/uploads/2019/09/la-comanda-1-750x600.jpg", descripcion: "Curso de actualizacion para personas afines",precio: "2,22"},
      { id: 6, icono: "https://material.angular.io/assets/img/examples/shiba1.jpg", nombre: "Curso 6", subnombre: "Capacitacion Geronte", foto: "https://laprimicia.com.ar/wp-content/uploads/2019/07/WhatsApp-Image-2019-07-14-at-13.46.58-750x600.jpeg", descripcion: "Curso de actualizacion para personas afines",precio: "2,22"},
      { id: 7, icono: "https://material.angular.io/assets/img/examples/shiba1.jpg", nombre: "Curso 7", subnombre: "Capacitacion Geronte", foto: "https://img.europapress.es/fotoweb/fotonoticia_20111010191412_1024.jpg", descripcion: "Curso de actualizacion para personas afines",precio: "2,22"},
      { id: 8, icono: "https://material.angular.io/assets/img/examples/shiba1.jpg", nombre: "Curso 8", subnombre: "Capacitacion Geronte", foto: "https://cryptomagazine.co/wp-content/uploads/2020/01/blockchain-para-confirmar-la-calidad-del-aceite-de-oliva-750x600.jpg", descripcion: "Curso de actualizacion para personas afines",precio: "2,22"}
    ];

    let CursosSecciones = [
        {
          cursoId: 0,
          nombre: "Seccion 1",
          "active": Boolean,            
          "completed": Boolean,
          time: "0:00"
        },
        {
          cursoId: 0,
          nombre: "Seccion 2",
          "active": Boolean,            
          "completed": Boolean,
          time: "0:00"
        },
        {
          cursoId: 0,
          nombre: "Seccion 3",
          "active": Boolean,            
          "completed": Boolean,
          time: "0:00"
        },
        {
          cursoId: 0,
          nombre: "Seccion 4",
          "active": Boolean,            
          "completed": Boolean,
          time: "0:00"
        },
        {
          cursoId: 0,
          nombre: "Seccion 5",
          "active": Boolean,            
          "completed": Boolean,
          time: "0:00"           
        }
      ];

      let CursoPartes = [
          { cursoId: 0, SeccionId: 0, titulo: 'Definición', abierto: false, tipo: "audio", src: "assets/SampleAudio2.mp3", completed: false, duration: "01:20", links: []},
          { cursoId: 0, SeccionId: 0, titulo: 'Clasificación', abierto: false, tipo: "video", src: "assets/Sample2.mp4", completed: false, duration: "01:20", links: []},
          { cursoId: 0, SeccionId: 0, titulo: 'Factores de Riesgo', abierto: false, tipo: "video", src: "assets/Sample2.mp4", completed: true, duration: "01:20", links: []},
          { cursoId: 0, SeccionId: 0, titulo: 'Función de la insulina', abierto: false, tipo: "video", src: "assets/Sample2.mp4", completed: true, duration: "01:20", links: []},
          { cursoId: 0, SeccionId: 0, titulo: 'Material Teorico', abierto: false, tipo: "Descargas", src: "", completed: true, duration: "", links: [{referencia: "texto1",url: "http://www.google.com.ar"},{referencia:"texto2",url: "http://www.smartways.com.ar"}]},
          { cursoId: 0, SeccionId: 0, titulo: 'Resumen', abierto: false, tipo: "audio", src: "assets/SampleAudio2.mp3", completed: true, duration: "02:20", links: []},
          
          { cursoId: 0, SeccionId: 1, titulo: 'HemoglucoTest', abierto: false, tipo: "audio", src: "assets/SampleAudio2.mp3", completed: true, duration: "01:20", links: []},
          { cursoId: 0, SeccionId: 1, titulo: 'Registro de valores', abierto: false, tipo: "video", src: "assets/Sample2.mp4", completed: true, duration: "01:20", links: []},
          { cursoId: 0, SeccionId: 1, titulo: 'Hiperglucemia', abierto: false, tipo: "video", src: "assets/Sample2.mp4", completed: true, duration: "01:20", links: []},
          { cursoId: 0, SeccionId: 1, titulo: 'Hipoglucemia', abierto: false, tipo: "video", src: "assets/Sample2.mp4", completed: true, duration: "01:20", links: []},
          { cursoId: 0, SeccionId: 1, titulo: 'Signos y síntomas de cada uno', abierto: false, tipo: "video", src: "assets/Sample2.mp4", completed: true, duration: "01:20", links: []},
          { cursoId: 0, SeccionId: 1, titulo: 'Material Teorico', abierto: false, tipo: "Descargas", src: "", completed: true, duration: "", links: [{referencia: "texto1",url: "asdasd"},{referencia:"texto2",url: "asasdasdasd"}]},
          { cursoId: 0, SeccionId: 1, titulo: 'Resumen', abierto: false, tipo: "audio", src: "assets/SampleAudio2.mp3", completed: true, duration: "02:20", links: []},

          { cursoId: 0, SeccionId: 2, titulo: 'Complicaciones de la enfermedad', abierto: false, tipo: "audio", src: "assets/SampleAudio2.mp3", completed: true, duration: "01:20", links: []},
          { cursoId: 0, SeccionId: 2, titulo: 'Material Teorico', abierto: false, tipo: "Descargas", src: "", completed: true, duration: "", links: [{referencia: "texto1",url: "asdasd"},{referencia:"texto2",url: "asasdasdasd"}]},
          { cursoId: 0, SeccionId: 2, titulo: 'Resumen', abierto: false, tipo: "audio", src: "assets/SampleAudio2.mp3", completed: true, duration: "02:20", links: []},

          { cursoId: 0, SeccionId: 3, titulo: 'Cuidados de la piel, boca y uñas', abierto: false, tipo: "audio", src: "assets/SampleAudio2.mp3", completed: true, duration: "01:20", links: []},
          { cursoId: 0, SeccionId: 3, titulo: 'Observación diaria', abierto: false, tipo: "video", src: "assets/Sample2.mp4", completed: true, duration: "01:20", links: []},
          { cursoId: 0, SeccionId: 3, titulo: 'Material Teorico', abierto: false, tipo: "Descargas", src: "", completed: true, duration: "", links: [{referencia: "texto1",url: "asdasd"},{referencia:"texto2",url: "asasdasdasd"}]},
          { cursoId: 0, SeccionId: 3, titulo: 'Resumen', abierto: false, tipo: "audio", src: "assets/SampleAudio2.mp3", completed: true, duration: "02:20", links: []},

          { cursoId: 0, SeccionId: 4, titulo: 'Alimentación del Am Diabético', abierto: false, tipo: "audio", src: "assets/SampleAudio2.mp3", completed: true, duration: "01:20", links: []},
          { cursoId: 0, SeccionId: 4, titulo: 'Material Teorico', abierto: false, tipo: "Descargas", src: "", completed: true, duration: "", links: [{referencia: "texto1",url: "asdasd"},{referencia:"texto2",url: "asasdasdasd"}]},
          { cursoId: 0, SeccionId: 4, titulo: 'Resumen', abierto: false, tipo: "audio", src: "assets/SampleAudio2.mp3", completed: true, duration: "02:20", links: []}
      ]

      let CursoPreguntas = [
          {
           Pregunta: "¿Cuantas manzanas son dos docenas? :",
           Op1: "3",
           Op2: "12",
           Op3: "6",
           Op4: "24",
           Seleccion: 0,
           rta: 4,
          },
          {
            Pregunta: "Si tengo tres bananas, me como dos y luego compro cinco. ¿Cuantas tengo? :",
            Op1: "5",
            Op2: "6",
            Op3: "7",
            Op4: "8",
            Seleccion: 0,
            rta: 2,
           },
           {
            Pregunta: "¿Que organo del cuerpo humano se encarga de producir insulina? :",
            Op1: "Corazón",
            Op2: "Higado",
            Op3: "Pancreas",
            Op4: "Cerebro",
            Seleccion: 0,
            rta: 3,
           },
           {
            Pregunta: "¿Que organo del cuerpo humano se encarga de bombear sangre? :",
            Op1: "Corazón",
            Op2: "Higado",
            Op3: "Pancreas",
            Op4: "Cerebro",
            Seleccion: 0,
            rta: 1,
           },
           {
            Pregunta: "¿Una falla hepatica esta relacionada con el daño de que organo? :",
            Op1: "Corazón",
            Op2: "Higado",
            Op3: "Pancreas",
            Op4: "Cerebro",
            Seleccion: 0,
            rta: 2,
           },
           {
            Pregunta: "¿Que parte del cuerpo humano estudian los Neurologos? :",
            Op1: "Corazón",
            Op2: "Higado",
            Op3: "Pancreas",
            Op4: "Cerebro",
            Seleccion: 0,
            rta: 4,
           }
        ];

        let CursoExamen = [{
        NotaRta: 0,
        notaAprobacion: 7,
        ExamenTime: 3600
        }];      


    return {Users,CursosPresentacion, CursosSecciones, CursoExamen, CursoPreguntas, CursoPartes};
 
    // /api/heroes/1
    // /api/crises/1
   }

     
  
}
