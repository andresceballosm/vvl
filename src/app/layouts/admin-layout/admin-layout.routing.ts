import { Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard'

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { MapsComponent } from '../../maps/maps.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { LoginComponent } from '../../login/login.component';
import { RegisterComponent } from '../../register/register.component';
import { UpdatePassComponent } from '../../update-pass/update-pass.component';
import { Register2Component } from '../../register2/register2.component';
import { PanelComponent } from '../../panel/panel.component';
import { AddNegocioComponent } from '../..//panel/add-negocio/add-negocio.component';
import { EditNegocioComponent } from '../../panel/edit-negocio/edit-negocio.component';
import { UploadComponent } from '../../upload/upload.component';
import { PerfilHotelComponent } from '../../panel/perfil-hotel/perfil-hotel.component';
import { AddSubnegocioComponent } from '../../panel/add-subnegocio/add-subnegocio.component';
import { AddHabitacionComponent } from '../../panel/perfil-hotel/add-habitacion/add-habitacion.component';
import { AddPlatoComponent } from '../../panel/perfil-restaurante/add-plato/add-plato.component';
import { PerfilHabitacionComponent } from '../../panel/perfil-hotel/perfil-habitacion/perfil-habitacion.component';
import { EditHabitacionComponent } from '../../panel/perfil-hotel/edit-habitacion/edit-habitacion.component';
import { MyDialogComponent } from '../../dialogos/my-dialog/my-dialog.component';
import { PerfilRestauranteComponent } from '../../panel/perfil-restaurante/perfil-restaurante.component';
import { EditPlatoComponent } from '../../panel/perfil-restaurante/edit-plato/edit-plato.component';
import { PerfilPlatoComponent } from '../../panel/perfil-restaurante/perfil-plato/perfil-plato.component';

import { PerfilExperienciaComponent } from '../../panel/perfil-experiencia/perfil-experiencia.component';
import { AddExperienciaComponent } from '../../panel/perfil-experiencia/add-experiencia/add-experiencia.component';
import { EditExperienciaComponent } from '../../panel/perfil-experiencia/edit-experiencia/edit-experiencia.component';
import { PerfilComponent } from '../../panel/perfil-experiencia/perfil/perfil.component';
import { HotelComponent } from '../../dashboard/hotel/hotel.component';
import { TemporadasComponent } from '../../panel/temporadas/temporadas.component';
import { RestauranteComponent } from '../../dashboard/restaurante/restaurante.component';
import { ExperienciaComponent } from '../../dashboard/experiencia/experiencia.component';
import { HabitacionComponent } from '../../dashboard/hotel/habitacion/habitacion.component';
import { ReservaComponent } from '../../panel/reserva/reserva.component';
import { ClientReservasComponent } from '../../client-reservas/client-reservas.component';
import { ListhotelesComponent } from '../../listhoteles/listhoteles.component';
import { PerfilhotelComponent } from '../../listhoteles/perfilhotel/perfilhotel.component';
import { PerfilroomComponent } from '../../listhoteles/perfilhotel/perfilroom/perfilroom.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent, canActivate:[AuthGuard] },
    { path: 'table-list',     component: TableListComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'register',       component: RegisterComponent},
    { path: 'login',          component: LoginComponent},
    { path: 'update-pass',    component: UpdatePassComponent},
    { path: 'register2',      component: Register2Component},
    { path: 'lenap',          component: PanelComponent,  canActivate:[AuthGuard]},
    { path: 'add-bs',         component: AddNegocioComponent,  canActivate:[AuthGuard]},
    { path: 'edit-bs',         component: EditNegocioComponent,  canActivate:[AuthGuard]},
    { path: 'upload',         component: UploadComponent,  canActivate:[AuthGuard]},
    { path: 'perfil-hotel',    component: PerfilHotelComponent,  canActivate:[AuthGuard]}, 
    { path: 'add-room',    component: AddHabitacionComponent,  canActivate:[AuthGuard]}, 
    { path: 'perfil-habitacion',    component: PerfilHabitacionComponent,  canActivate:[AuthGuard]}, 
    { path: 'perfil-restaurante',    component: PerfilRestauranteComponent,  canActivate:[AuthGuard]}, 
    { path: 'perfil-eat',    component: PerfilPlatoComponent,  canActivate:[AuthGuard]}, 
    { path: 'edit-room',    component: EditHabitacionComponent,  canActivate:[AuthGuard]}, 
    { path: 'add-eat',    component: AddPlatoComponent,  canActivate:[AuthGuard]}, 
    { path: 'edit-eat',    component: EditPlatoComponent,  canActivate:[AuthGuard]},
    { path: 'perfil-experiencia',    component: PerfilExperienciaComponent,  canActivate:[AuthGuard]}, 
    { path: 'edit-experiencia',    component: EditExperienciaComponent,  canActivate:[AuthGuard]}, 
    { path: 'add-experiencia',    component: AddExperienciaComponent,  canActivate:[AuthGuard]}, 
    { path: 'perfil-exp',    component: PerfilComponent,  canActivate:[AuthGuard]},
    { path: 'hotel',    component: HotelComponent}, 
    { path: 'restaurante',    component: RestauranteComponent}, 
    { path: 'experiencia',    component: ExperienciaComponent}, 
    { path: 'tempAlta',    component: TemporadasComponent},
    { path: 'habitacion',    component: PerfilroomComponent},
    { path: 'reserva',    component: ReservaComponent, canActivate:[AuthGuard]},
    { path: 'reservaclient',    component: ClientReservasComponent, canActivate:[AuthGuard]},
    { path: 'hotels',    component: ListhotelesComponent},
    { path: 'pf-hotel',    component: PerfilhotelComponent},
    
];
