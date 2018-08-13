import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import {FlashMessagesModule} from 'angular2-flash-messages/module';
import {FlashMessagesService} from 'angular2-flash-messages/module';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { environment} from '../environments/environment';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { MapsComponent } from './maps/maps.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { UICarouselModule } from 'ui-carousel';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { AuthService } from './servicios/auth.service';
import { CrudService } from './servicios/crud.service';
import { AuthGuard } from './guards/auth.guard';
import { UpdatePassComponent } from './update-pass/update-pass.component';
import { Register2Component } from './register2/register2.component';
import { PanelComponent } from './panel/panel.component';
import { AddNegocioComponent } from './panel/add-negocio/add-negocio.component';
import { EditNegocioComponent } from './panel/edit-negocio/edit-negocio.component';
import { UploadComponent } from './upload/upload.component';
import { UploadService } from './servicios/upload.service';
import { ImageService } from './servicios/image.service';
import { PerfilHotelComponent } from './panel/perfil-hotel/perfil-hotel.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {  LoadService } from './servicios/load.service';
import {  GlobalsService } from './servicios/globals.service';

import { MatDialogModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FlashMessagesModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    UICarouselModule,
    Ng2CarouselamosModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  providers: [AuthService, FlashMessagesService, AuthGuard, CrudService, UploadService, ImageService, LoadService, GlobalsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
