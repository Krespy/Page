// Modulos Angular 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiabetesComponent } from './components/diabetes/diabetes.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CerrarSesionComponent } from './components/CerrarSesion/CerrarSesion.component';
import { RegistroComponent } from './components/registro/registro.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MercadoPagoComponent } from './components/mercado-pago/mercado-pago.component';

// Modulos Material
// ng add @angular/material
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule} from '@angular/material/radio';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';

// Modulos externos
// npm install ngx-device-detector --save
// npm install ngx-countdown --save
// npm install ngx-cookie-service
// npm install --save angular-in-memory-web-api // Fack Backend
// npm install ngx-infinite-scroll --save (A implementar a futuro)
// npm install ngx-spinner --save
// npm install mercadopago --save
// npm install @types/node // para el require
// npm i -D @types/webpack-env // para el require?
// Test 2 -> npm install ngx-paypal --save

import { DeviceDetectorModule } from 'ngx-device-detector';
import { CountdownModule } from 'ngx-countdown';
import { PaginatePipe } from './pipes/paginate.pipe';
import { BusquedaPipe } from './pipes/busqueda.pipe';
import { CustomMatPaginatorIntl } from './paginator-es';
import { CardCursosComponent } from './components/card-cursos/card-cursos.component';
import { CookieService } from 'ngx-cookie-service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api'; //   
import { BackendService } from './services/backend.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthService } from './services/auth.services';
import { WsService } from './services/ws.Service';
import { SpinnerComponent } from './components/spinner/spinner.component';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FrontPageComponent,
    DiabetesComponent,
    PerfilComponent,
    CerrarSesionComponent,
    RegistroComponent,
    PaginatePipe,
    CarouselComponent,
    MercadoPagoComponent,
    BusquedaPipe,
    CardCursosComponent,
    SpinnerComponent,
  ],
  imports: [ 
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    MatCheckboxModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatSnackBarModule,
    MatGridListModule,
    MatPaginatorModule,
    MatChipsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DeviceDetectorModule,
    CountdownModule,
    //InMemoryWebApiModule.forRoot(BackendService),
    NgxSpinnerModule
  ],
  providers: [CookieService,
    AuthService,
      {
      provide: MatPaginatorIntl, 
      useClass: CustomMatPaginatorIntl      
    },  
    WsService],  
  bootstrap: [AppComponent]
})
export class AppModule { }