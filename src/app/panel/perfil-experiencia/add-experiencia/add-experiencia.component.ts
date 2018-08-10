import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from '../../../servicios/crud.service';
import { Experiencia } from '../../../models/experiencia';
import { DialogoAlertaComponent } from '../../../dialogos/dialogo-alerta/dialogo-alerta.component';
import { MatDialog, MatCard, MatButton,MatCardTitle } from '@angular/material';
import {Router } from '@angular/router';

@Component({
  selector: 'app-add-experiencia',
  templateUrl: './add-experiencia.component.html',
  styleUrls: ['./add-experiencia.component.scss']
})
export class AddExperienciaComponent implements OnInit {

  dialogResult='';
  submitted = false;
  experiencia: Experiencia = new Experiencia();
  numeros = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','+20','+30'];
  cancelacion=['Flexible','Mesurado', 'Rigido','Rigido 30 dias',
  'Rigido 60 dias', 'Estancias largas', 'No aplica'];
  moneda = ['COP','USD'];
   
  constructor( public router: Router,public dialog : MatDialog, private crudService: CrudService ) { }  
  ngOnInit() {
  }
  onSubmit(form: NgForm){
    this.submitted = true;
    this.experiencia.type = "subnegocio";
    this.experiencia.idNegocio = sessionStorage.getItem('idSubnegocio');
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que todos los datos registrados son correctos.'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        this.onSubmitAddExperiencia();
        form.resetForm();
        window.location.reload();
      }
    })
  }
  onSubmitAddExperiencia(){
    let keyPadre = this.experiencia.idNegocio;
    this.crudService.insertExperiencia(this.experiencia,keyPadre);
    window.location.reload();
    this.router.navigate(['/lenap']);
  };


}
