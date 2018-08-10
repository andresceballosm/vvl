import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from '../../../servicios/crud.service';
import { Experiencia } from '../../../models/experiencia';
import { DialogoAlertaComponent } from '../../../dialogos/dialogo-alerta/dialogo-alerta.component';
import { MatDialog, MatCard, MatButton,MatCardTitle } from '@angular/material';
import {Router } from '@angular/router';
import {  GlobalsService } from '../../../servicios/globals.service';

@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.scss']
})
export class EditExperienciaComponent implements OnInit {
  key:any;
  dialogResult='';
  experienciaObj:any;
  submitted = false;
  experiencia: Experiencia = new Experiencia();
  numeros = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','+20','+30'];
  cancelacion=['Flexible','Mesurado', 'Rigido','Rigido 30 dias',
  'Rigido 60 dias', 'Estancias largas', 'No aplica'];
  moneda = ['COP','USD'];
  constructor(public router: Router,public dialog : MatDialog, private crudService: CrudService, private globals:GlobalsService) { }

  ngOnInit(){
    this.experienciaObj = this.globals.getExperienciaEdit();
    console.log(this.experienciaObj);
    this.experiencia.nombre = this.experienciaObj.nombre;
    this.experiencia.precio = this.experienciaObj.precio;
    this.experiencia.moneda = this.experienciaObj.moneda;
    this.experiencia.num_personas = this.experienciaObj.num_personas;
    this.experiencia.herramientas = this.experienciaObj.herramientas;
    this.experiencia.edad_min = this.experienciaObj.edad_min;
    this.experiencia.cancelacion = this.experienciaObj.cancelacion;
    this.experiencia.descripcion = this.experienciaObj.descripcion;
    this.experiencia.reglas = this.experienciaObj.reglas;
  };

  onSubmit(form: NgForm) {
    this.key=sessionStorage.getItem('idExperiencia');
    this.submitted = true;
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que todos los datos registrados son correctos.'
    }); 
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        this.editarNegocio(this.experiencia,this.key);
      }
    })
  };

  editarNegocio(Experiencia,key){
    let idNegocio = this.experienciaObj.idNegocio;
    this.crudService.updateExperiencia(Experiencia,key,idNegocio)
    this.router.navigate(['/lenap']);
    sessionStorage.removeItem('experiencia');
  }

}
