import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from '../../../servicios/crud.service';
import { Habitacion } from '../../../models/habitacion';
import { MatDialog, MatCard, MatButton,MatCardTitle } from '@angular/material';
import { DialogoAlertaComponent } from '../../../dialogos/dialogo-alerta/dialogo-alerta.component';
import {Router } from '@angular/router';
import { PerfilHotelComponent } from '../perfil-hotel.component';
import {  GlobalsService } from '../../../servicios/globals.service';


@Component({
  selector: 'app-edit-habitacion',
  templateUrl: './edit-habitacion.component.html',
  styleUrls: ['./edit-habitacion.component.scss']
})
export class EditHabitacionComponent implements OnInit {
  habitacion: Habitacion = new Habitacion();
  submitted = false;
  dialogResult='';
  habitacionObj:any;
  key:string;

  servicios = ['aire acondicionado','calafacción','jabón higienico','shampoo','papel higienico','sábanas','agua caliente','cocina','lavadora','plancha','secado de cabello','toallas','wifi','desayuno','almuerzo','cena','TV'];

  type = ['Negocio'];

  numeros = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','+20','+30'];

  moneda = ['COP','USD'];

  cancelacion=['Flexible','Mesurado', 'Rigido','Rigido 30 dias',
               'Rigido 60 dias', 'Estancias largas', 'No aplica']                

  constructor(public router: Router,public dialog : MatDialog, private crudService: CrudService, private global:GlobalsService) { }

  ngOnInit() {
    this.habitacionObj = this.global.getRoomEdit();
    console.log(this.habitacionObj);
    this.habitacion.nombre = this.habitacionObj.nombre;
    this.habitacion.servicios = this.habitacionObj.servicios;
    this.habitacion.huespedes = this.habitacionObj.huespedes;
    this.habitacion.banos_privados = this.habitacionObj.banos_privados;
    this.habitacion.banos_publicos = this.habitacionObj.banos_publicos;
    this.habitacion.camas_individuales = this.habitacionObj.camas_individuales;
    this.habitacion.camas_matrimoniales = this.habitacionObj.camas_matrimoniales;
    this.habitacion.camarotes = this.habitacionObj.camarotes;
    this.habitacion.precio_noche_tbaja = this.habitacionObj.precio_noche_tbaja;
    this.habitacion.precio_noche_talta = this.habitacionObj.precio_noche_talta;
    this.habitacion.moneda = this.habitacionObj.moneda;
    this.habitacion.hora_llegada = this.habitacionObj.hora_llegada;
    this.habitacion.hora_salida = this.habitacionObj.hora_salida;
    this.habitacion.cancelacion = this.habitacionObj.cancelacion;
    this.habitacion.descripcion = this.habitacionObj.descripcion;
    this.habitacion.reglas = this.habitacionObj.reglas;
  }

  onSubmit(form: NgForm) {
    this.key = sessionStorage.getItem('idHabitacion');
    console.log(this.key);
    this.submitted = true;
    console.log(this.habitacion);
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que todos los datos registrados son correctos.'
    }); 
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        this.editarNegocio(this.habitacion,this.key);
      }
    })
  };

  editarNegocio(Habitacion,key){
    let idNegocio = this.habitacionObj.idNegocio;
    this.crudService.updateHabitacion(Habitacion,key,idNegocio)
    this.router.navigate(['/lenap']);
  }

}
