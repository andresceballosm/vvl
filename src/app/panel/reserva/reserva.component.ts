import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../servicios/crud.service';
import { Reserva } from '../../models/reserva';
import { DialogoAlertaComponent } from '../../dialogos/dialogo-alerta/dialogo-alerta.component';
import { MatDialog,MatCard,MatButton,MatCardTitle } from '@angular/material'

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {
  reserva:any;
  idReserva:any;
  load:boolean=true;
  reservacion:any;
  reservas: Reserva = new Reserva();
  dialogResult='';
  constructor( private crudService: CrudService,public dialog : MatDialog ) { }

  ngOnInit() {
    this.reserva = JSON.parse(sessionStorage.getItem('reservas'));
    console.log(this.reserva);
    this.idReserva = sessionStorage.getItem('idReserva');
    console.log(this.idReserva);
    this.load = false;
  }
  setEstadoReserva(key){
    console.log(key);
    let reservas = this.reserva;
    for (var r in reservas){
      if(this.idReserva == reservas[r].key){
        reservas[r].estado = 'pendiente pago';
        this.reservacion = reservas[r];
      }
    }
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que desea aceptar la reservación.'
    }); 
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        this.crudService.updateReserva(key,this.reservacion)
      }
    })
  }
  rechazarReserva(key){
    console.log(key);
    let reservas = this.reserva;
    for (var r in reservas){
      if(this.idReserva == reservas[r].key){
        reservas[r].estado = 'rechazada';
        this.reservacion = reservas[r];
      }
    }
    console.log(this.reservacion);
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que desea rechazar la reservación.'
    }); 
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        this.crudService.updateReserva(key,this.reservacion)
      }
    })
  }

}
