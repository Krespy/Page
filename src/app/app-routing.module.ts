import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AuthGuard } from './guards/auth.guard';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { CerrarSesionComponent } from './components/CerrarSesion/CerrarSesion.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DiabetesComponent } from './components/diabetes/diabetes.component';
import { MercadoPagoComponent } from './components/mercado-pago/mercado-pago.component';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FrontPageComponent
  },
  {
    path: 'iniciar-sesion',
    component: LoginComponent,
    canDeactivate: [AuthGuard]
  },
  {
    path: 'perfil', // Si no entra con usuario que vaya a la main
    component: PerfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil/:id',
    component: PerfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Cerrar-sesion',
    component: CerrarSesionComponent      
  },
  {
    path: 'registrarme',
    component: RegistroComponent
  },
  {
    path: 'Curso/:curso',
    component: DiabetesComponent
  },
  {
    path: 'Compra',
    component: MercadoPagoComponent
  }
    // children: [ // Cuando es Hijo, muestra al padre y debajo (en router-outlet) al hijo, si fuera un link separado borra todo el padre y muestra solo el otro
    //   {
    //     path: ':id', 
    //     component: ContactDetailComponent
    //   }
    // ]  
   
  // { // esto es para que todo el resto lo lleve a inicio
  //   path: '**', 
  //   redirectTo: '' 
  // }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes,{
    enableTracing: true, // desactivar al terminar la pagina
    //scrollPositionRestoration: 'enabled', // por el momento lo saco
    //onSameUrlNavigation: 'reload' // al refrescar que cargue la misma pagina
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
