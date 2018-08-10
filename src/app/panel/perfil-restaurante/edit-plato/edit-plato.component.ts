import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from '../../../servicios/crud.service';
import { Plato } from '../../../models/plato';
import { MatDialog, MatCard, MatButton,MatCardTitle } from '@angular/material';
import { DialogoAlertaComponent } from '../../../dialogos/dialogo-alerta/dialogo-alerta.component';
import {Router } from '@angular/router';
import {  GlobalsService } from '../../../servicios/globals.service';


@Component({
  selector: 'app-edit-plato',
  templateUrl: './edit-plato.component.html',
  styleUrls: ['./edit-plato.component.scss']
})
export class EditPlatoComponent implements OnInit {
  plato: Plato = new Plato();
  submitted = false;
  dialogResult='';
  platoObj:any;
  key:string;
  numeros = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','+20','+30'];
  moneda = ['COP','USD'];
  typePlato = ['Entrada','Fuerte','Bebida sin alcohol','Bebida con alcohol','Postre'];
  undMedida = ['kg','gr','mg','Lt','ml','oz'];

  constructor(public router: Router,public dialog : MatDialog, private crudService: CrudService,
  private global:GlobalsService) { }

  ngOnInit() {
    this.platoObj = this.global.getEatEdit();
    this.plato.nombre = this.platoObj.nombre;
    this.plato.cantidad = this.platoObj.cantidad;
    this.plato.und_medida = this.platoObj.und_medida;
    this.plato.num_personas = this.platoObj.num_personas;
    this.plato.moneda = this.platoObj.moneda;
    this.plato.precio = this.platoObj.precio;
    this.plato.descripcion = this.platoObj.descripcion;
  }

  onSubmit(form: NgForm) {
    this.key = sessionStorage.getItem('idPlato');
    this.submitted = true;
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que todos los datos registrados son correctos.'
    }); 
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        this.editarPlato(this.plato,this.key);
      }
    })
  };
  editarPlato(Plato,key){
    let idNegocio = this.platoObj.idNegocio;
    this.crudService.updatePlato(Plato,key,idNegocio)
    this.router.navigate(['/lenap']);
  }
  

}
