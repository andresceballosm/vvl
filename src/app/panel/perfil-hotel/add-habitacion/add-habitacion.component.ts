import { Component, OnInit,Inject,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from '../../../servicios/crud.service';
import { Habitacion } from '../../../models/habitacion';
import { MyDialogComponent } from '../../../dialogos/my-dialog/my-dialog.component'
import { DialogoAlertaComponent } from '../../../dialogos/dialogo-alerta/dialogo-alerta.component';
import { MatDialog, MatCard, MatButton,MatCardTitle } from '@angular/material';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-add-habitacion',
  templateUrl: './add-habitacion.component.html',
  styleUrls: ['./add-habitacion.component.scss']
})
export class AddHabitacionComponent implements OnInit {
  habitacion: Habitacion = new Habitacion();
  submitted = false;
  dialogResult='';

  servicios = ['aire acondicionado','calafacción','jabón higienico','shampoo','papel higienico','sábanas','agua caliente','cocina','lavadora','plancha','secado de cabello','toallas','wifi','desayuno','almuerzo','cena','TV'];

  type = ['Negocio'];

  numeros = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','+20','+30'];

  moneda = ['COP','USD'];

  cancelacion=['Flexible','Mesurado', 'Rigido','Rigido 30 dias',
               'Rigido 60 dias', 'Estancias largas', 'No aplica']                

  constructor(public router: Router,public dialog : MatDialog, private crudService: CrudService, @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    this.submitted = true;
    this.habitacion.type = "subnegocio";
    this.habitacion.idNegocio = sessionStorage.getItem('idSubnegocio');
    console.log(this.habitacion);
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que todos los datos registrados son correctos.'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        this.onSubmitAddHabitacion();
        form.resetForm();
        window.location.reload();
      }
    })
  }
  onSubmitAddHabitacion(){
    let keyPadre = this.habitacion.idNegocio;
    this.crudService.insertHabitacion(this.habitacion,keyPadre);
    window.location.reload();
    this.router.navigate(['/lenap']);
  };

}
