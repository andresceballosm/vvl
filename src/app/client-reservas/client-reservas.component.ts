import { Component, OnInit } from '@angular/core';
import { CrudService } from '../servicios/crud.service';
import { Reserva } from '../models/reserva';
import {FlashMessagesService} from 'angular2-flash-messages/module';
import { DialogoAlertaComponent } from '../dialogos/dialogo-alerta/dialogo-alerta.component';
import { MatDialog, MatCard, MatButton, MatCardTitle, MatDatepicker } from '@angular/material'

@Component({
  selector: 'app-client-reservas',
  templateUrl: './client-reservas.component.html',
  styleUrls: ['./client-reservas.component.scss']
})
export class ClientReservasComponent implements OnInit {
  reserva:any;
  idReserva:any;
  load:boolean=true;
  reservacion:any;
  cancelacion:any;
  fecha_inicio;
  responseCancel:any;
  responseCancelError:any;
  now;
  estado:any;
  dialogResult='';
  reservas: Reserva = new Reserva();
  constructor( private crudService: CrudService,public dialog : MatDialog) { }

  ngOnInit() {
    this.now = new Date();
    this.reserva = JSON.parse(sessionStorage.getItem('reservas'));
    this.idReserva = sessionStorage.getItem('idReserva');
    this.load = false;
  }
  setEstadoReserva(key){
    var MILISENGUNDOS_POR_DIA = 1000 * 60 * 60 * 24;
    function diferenciaEntreDiasEnDias(a, b){
      var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

      return Math.floor((utc2 - utc1) / MILISENGUNDOS_POR_DIA);
    }
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que desea cancelar su reservación.'
    }); 
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        let reservas = this.reserva;
        for (var r in reservas){
          if(this.idReserva == reservas[r].key){
            this.reservacion = reservas[r];
            this.fecha_inicio = new Date(reservas[r].fecha_inicio);
            this.cancelacion = reservas[r].cancelacion;
            this.estado =  reservas[r].estado;
          }
        }
        let dias = diferenciaEntreDiasEnDias(this.now,this.fecha_inicio);
        if(this.estado != 'pendiente'){
          console.log('entro aaa');
          if(this.cancelacion == 'Flexible'){
            if ( dias >= 1){
              for (var r in reservas){
                reservas[r].estado = 'cancelada';
              }
              this.crudService.updateReserva(key,this.reservacion)
              .then(
                (success) => {
                  this.responseCancel = 'La cancelación fue exitosa, en un periodo de tres dias habiles sera reembolzado el monto respectivo a la politica de devolución de cancelación flexible.'
                })
            }else{
              this.responseCancelError = 'No es posible realizar la cancelación de la reservación ya que la fecha de ingreso es en menos de 24 horas.'
            }
          }else if (this.cancelacion == 'Mesurado'){
            console.log('entro a mesurado');
            if ( dias >= 2){
              for (var r in reservas){
                reservas[r].estado = 'cancelada';
              }
              console.log(this.reservacion);
              this.crudService.updateReserva(key,this.reservacion)
              .then(
                (success) => {
                  this.responseCancel = 'La cancelación fue exitosa, en un periodo de tres dias habiles sera reembolzado el monto respectivo a la politica de devolución de cancelación flexible.'
                })
            }else{
              this.responseCancelError = 'No es posible realizar la cancelación de la reservación ya que la fecha de ingreso es en menos de 48 horas.'
            }
          }else if (this.cancelacion == 'Rigido'){
            if ( dias >= 3){
              for (var r in reservas){
                reservas[r].estado = 'cancelada';
              }
              this.crudService.updateReserva(key,this.reservacion)
              .then(
                (success) => {
                  this.responseCancel = 'La cancelación fue exitosa, en un periodo de tres dias habiles sera reembolzado el monto respectivo a la politica de devolución de cancelación flexible.'
                })
            }else{
              this.responseCancelError = 'No es posible realizar la cancelación de la reservación ya que la fecha de ingreso es en menos de 48 horas.'
            }
          }else if (this.cancelacion == 'Rigido 30 dias'){
            if ( dias >= 30){
              for (var r in reservas){
                reservas[r].estado = 'cancelada';
              }
              this.crudService.updateReserva(key,this.reservacion)
              .then(
                (success) => {
                  this.responseCancel = 'La cancelación fue exitosa, en un periodo de tres dias habiles sera reembolzado el monto respectivo a la politica de devolución de cancelación flexible.'
                })
            }else{
              this.responseCancelError = 'No es posible realizar la cancelación de la reservación ya que la fecha de ingreso es en menos de 30 días.'
            }
          }else if (this.cancelacion == 'Rigido 60 dias'){
            if ( dias >= 60){
              for (var r in reservas){
                reservas[r].estado = 'cancelada';
              }
              this.crudService.updateReserva(key,this.reservacion)
              .then(
                (success) => {
                  this.responseCancel = 'La cancelación fue exitosa, en un periodo de tres dias habiles sera reembolzado el monto respectivo a la politica de devolución de cancelación flexible.'
                })
            }else{
              this.responseCancelError = 'No es posible realizar la cancelación de la reservación ya que la fecha de ingreso es en menos de 60 días'
            }
          }else if (this.cancelacion == 'Estancias largas'){
            if ( dias >= 30){
              for (var r in reservas){
                reservas[r].estado = 'cancelada';
              }
              this.crudService.updateReserva(key,this.reservacion)
              .then(
                (success) => {
                  this.responseCancel = 'La cancelación fue exitosa, en un periodo de tres dias habiles sera reembolzado el monto respectivo a la politica de devolución de cancelación flexible.'
                })
            }else{
              this.responseCancelError = 'No es posible realizar la cancelación de la reservación ya que la fecha de ingreso es en menos de 30 días.'
            }
          }else if (this.cancelacion == 'No aplica'){
            this.responseCancelError = 'No aplican las cancelaciones para esta reservación'
          }
      }else{
        for (var r in reservas){
          reservas[r].estado = 'cancelada';
        }
        this.crudService.updateReserva(key,this.reservacion)
      }
     }
    })
  }


}
