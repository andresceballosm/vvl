import { Component, OnInit } from '@angular/core';
import {AuthService } from '../servicios/auth.service'
import { Reserva } from '../models/reserva';
import { Router } from '@angular/router';
import { CrudService } from '../servicios/crud.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public isLogin: boolean;
  public nombreUsuario: string;
  public emailUsuario: string;
  public fotoUsuario: string;
  public phoneUsuario: string;
  reservas: Reserva = new Reserva();
  getReservas:any;
  constructor(public authService: AuthService, public router : Router, public crudService:CrudService) { }

  ngOnInit() {
    this.getReservasList();
    this.authService.getAuth().subscribe( auth => {
      if (auth) {
        this.isLogin = true;
        this.nombreUsuario = auth.displayName;
        this.emailUsuario = auth.email;
        this.fotoUsuario = auth.photoURL;
        this.phoneUsuario = auth.phoneNumber;
      } else {
        this.isLogin = false;
      }
    });
  }
  getReservasList(){
    let adminReserva= localStorage.getItem('user');
    let reservasList = [];
    this.getReservas = this.crudService.getReservasClientList(adminReserva)
    .then(function(snapshot){
      let reservas = snapshot.val();
      for ( var r in reservas){
        reservasList.push({key:r,idNegocioreserva:reservas[r].idNegocioreserva,adminReserva:reservas[r].adminReserva,
        fecha_inicio:reservas[r].fecha_inicio,fecha_fin:reservas[r].fecha_fin,precio:reservas[r].precio,
        moneda:reservas[r].moneda,cliente:reservas[r].cliente,estado:reservas[r].estado,negocio:reservas[r].negocio,
        subnegocio:reservas[r].subnegocio, cancelacion:reservas[r].cancelacion})
      }
    }).then(() =>this.viewReservas(reservasList))
  };

  viewReservas(reservas){
    this.reservas = reservas;
    sessionStorage.setItem('reservas', JSON.stringify(reservas))
    console.log(this.reservas);
  }
  goReservas(key){
    sessionStorage.setItem('idReserva',key);
    this.router.navigate(['/reservaclient'])
  }
}
