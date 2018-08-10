import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from '../../../servicios/crud.service';
import { Plato } from '../../../models/plato';
import { DialogoAlertaComponent } from '../../../dialogos/dialogo-alerta/dialogo-alerta.component';
import { MatDialog, MatCard, MatButton,MatCardTitle } from '@angular/material';
import {Router } from '@angular/router';

@Component({
  selector: 'app-add-plato',
  templateUrl: './add-plato.component.html',
  styleUrls: ['./add-plato.component.scss']
})
export class AddPlatoComponent implements OnInit {
  dialogResult='';
  submitted = false;
  plato: Plato = new Plato();
  numeros = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','+20','+30'];
  moneda = ['COP','USD'];
  typePlato = ['Entrada','Fuerte','Bebida sin alcohol','Bebida con alcohol','Postre'];
  undMedida = ['kg','gr','mg','Lt','ml','oz'];
  constructor(public router: Router,public dialog : MatDialog, private crudService: CrudService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm){
    this.submitted = true;
    this.plato.type = "subnegocio";
    this.plato.idNegocio = sessionStorage.getItem('idSubnegocio');
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que todos los datos registrados son correctos.'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        this.onSubmitAddPlato();
        form.resetForm();
        window.location.reload();
      }
    })
  };
  onSubmitAddPlato(){
    let keyPadre = this.plato.idNegocio;
    this.crudService.insertPlato(this.plato,keyPadre);
    window.location.reload();
    this.router.navigate(['/lenap']);
  };

}
