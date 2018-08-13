import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { MapsComponent } from '../../maps/maps.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { LoginComponent } from '../../login/login.component';
import { RegisterComponent } from '../../register/register.component';
import { UpdatePassComponent } from '../../update-pass/update-pass.component';
import { EditHabitacionComponent } from '../../panel/perfil-hotel/edit-habitacion/edit-habitacion.component';
import { Register2Component } from '../../register2/register2.component';
import { PanelComponent } from '../../panel/panel.component';
import { AddNegocioComponent } from '../../panel/add-negocio/add-negocio.component';
import { CrudService } from '../../servicios/crud.service';
import { EditNegocioComponent } from '../../panel/edit-negocio/edit-negocio.component';
import { EditPlatoComponent } from '../../panel/perfil-restaurante/edit-plato/edit-plato.component';
import { UploadComponent } from '../../upload/upload.component';
import { PerfilHotelComponent } from '../../panel/perfil-hotel/perfil-hotel.component';
import { PerfilRestauranteComponent } from '../../panel/perfil-restaurante/perfil-restaurante.component';
import { PerfilExperienciaComponent } from '../../panel/perfil-experiencia/perfil-experiencia.component';
import { AddExperienciaComponent } from '../../panel/perfil-experiencia/add-experiencia/add-experiencia.component';
import { EditExperienciaComponent } from '../../panel/perfil-experiencia/edit-experiencia/edit-experiencia.component';
import { PerfilComponent } from '../../panel/perfil-experiencia/perfil/perfil.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { UICarouselModule } from 'ui-carousel';
import {  LoadService } from '../../servicios/load.service';
import { MyDialogComponent } from '../../dialogos/my-dialog/my-dialog.component';
import { DialogoAlertaComponent } from '../../dialogos/dialogo-alerta/dialogo-alerta.component';
import { AddSubnegocioComponent } from '../../panel/add-subnegocio/add-subnegocio.component';
import { AddPlatoComponent } from '../../panel/perfil-restaurante/add-plato/add-plato.component';
import { PerfilHabitacionComponent } from '../../panel/perfil-hotel/perfil-habitacion/perfil-habitacion.component';
import { PerfilPlatoComponent } from '../../panel/perfil-restaurante/perfil-plato/perfil-plato.component';
import { AgmCoreModule } from '@agm/core';
import {FlashMessagesModule} from 'angular2-flash-messages/module';
import { AddHabitacionComponent } from '../../panel/perfil-hotel/add-habitacion/add-habitacion.component';
import { TemporadasComponent } from '../../panel/temporadas/temporadas.component';
import { HotelComponent } from '../../dashboard/hotel/hotel.component';
import { RestauranteComponent } from '../../dashboard/restaurante/restaurante.component';
import { ExperienciaComponent } from '../../dashboard/experiencia/experiencia.component';
import { HabitacionComponent } from '../../dashboard/hotel/habitacion/habitacion.component';
import { ReservaComponent } from '../../panel/reserva/reserva.component';
import { ClientReservasComponent } from '../../client-reservas/client-reservas.component';
import * as moment from 'moment';
import { ListhotelesComponent } from '../../listhoteles/listhoteles.component';
import { PerfilhotelComponent } from '../../listhoteles/perfilhotel/perfilhotel.component';
import { PerfilroomComponent } from '../../listhoteles/perfilhotel/perfilroom/perfilroom.component';
import {
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatCardModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatListModule,
  MatGridListModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatToolbarModule
} from '@angular/material';

const googleMapsCore = AgmCoreModule.forRoot({
  apiKey: 'AIzaSyArZM9nYrIcMpr6L1yMN-M9eC-Dk6e9wH8'
})

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatRadioModule,
    MatExpansionModule,
    MatGridListModule, 
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,   
    MatToolbarModule,
    MatMenuModule,
    Ng2CarouselamosModule,
    UICarouselModule,
    googleMapsCore
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    MapsComponent,
    UpgradeComponent,
    RegisterComponent,
    LoginComponent,
    UpdatePassComponent,
    Register2Component,
    PanelComponent,
    AddNegocioComponent,
    EditNegocioComponent,
    UploadComponent,
    PerfilHotelComponent,
    MyDialogComponent,
    DialogoAlertaComponent,
    AddSubnegocioComponent,
    AddHabitacionComponent, 
    PerfilHabitacionComponent,
    PerfilRestauranteComponent,
    EditHabitacionComponent,
    AddPlatoComponent,
    EditPlatoComponent,
    PerfilPlatoComponent,
    PerfilExperienciaComponent,
    AddExperienciaComponent,
    EditExperienciaComponent,
    PerfilComponent,
    HotelComponent,
    TemporadasComponent,
    RestauranteComponent,
    ExperienciaComponent,
    HabitacionComponent,
    ReservaComponent,
    ClientReservasComponent,
    ListhotelesComponent,
    PerfilhotelComponent,
    PerfilroomComponent
  ],
  entryComponents: [
      MyDialogComponent,
      DialogoAlertaComponent
    ]
})

export class AdminLayoutModule {}
