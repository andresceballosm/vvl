import { Component,  Output, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as Chartist from 'chartist';
import { TempAlta } from '../../models/tempAlta';
import { Negocio } from '../../models/negocio';
import { MatDialog, MatCard, MatButton, MatCardTitle } from '@angular/material'
import { Router } from '@angular/router';
import { DialogoAlertaComponent } from '../../dialogos/dialogo-alerta/dialogo-alerta.component';
import { CrudService } from '../../servicios/crud.service';


@Component({
  selector: 'app-temporadas',
  templateUrl: './temporadas.component.html',
  styleUrls: ['./temporadas.component.scss']
})
export class TemporadasComponent implements OnInit {
  tempAlta: TempAlta = new TempAlta();
  negocio: Negocio = new Negocio();
  submitted = false;
  dialogResult = '';
  emailUsuario:any;
  constructor(public dialog : MatDialog, private crudService: CrudService,
    public router: Router) { }

  ngOnInit() {
    this.emailUsuario = localStorage.getItem('user');
  }
  onSubmitAddTempAlta(){
    this.crudService.insertTempAlta(this.tempAlta);
  };

  onSubmitTemp(form: NgForm) {
    this.submitted = true;
    this.tempAlta.adminTemp = this.emailUsuario;  
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que todos los datos registrados son correctos.'
    }); 
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        this.onSubmitAddTempAlta();
        form.resetForm();
      }
    })
    //form.resetForm();
  };

}
