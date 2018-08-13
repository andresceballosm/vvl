import { Component, OnInit,Input, Output, EventEmitter, OnDestroy  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { CrudService } from '../../../servicios/crud.service';
import { ImageService } from '../../../servicios/image.service';
import { Router } from '@angular/router';
import { UICarouselModule } from 'ui-carousel';
import { LoadService } from '../../../servicios/load.service';
import {MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatDialog,MatCard,MatButton, MatCardTitle, MatListItem } from '@angular/material'

import { MyDialogComponent } from '../../../dialogos/my-dialog/my-dialog.component'
import { DialogoAlertaComponent } from '../../../dialogos/dialogo-alerta/dialogo-alerta.component';
import { Habitacion } from '../../../models/habitacion';
import { Sales } from '../../../models/sales';
import { GlobalsService } from '../../../servicios/globals.service';
import { Negocio} from '../../../models/negocio';

@Component({
  selector: 'app-perfil-habitacion',
  templateUrl: './perfil-habitacion.component.html',
  styleUrls: ['./perfil-habitacion.component.scss']
})
export class PerfilHabitacionComponent implements OnInit {

  images:any;
  getImagenes:any;
  itemsChild: any;
  habitaciones: any;
  getImages:any;
  //idNegocio:any;
  negocio: Negocio = new Negocio();
  sales: Sales = new Sales();
  key;
  showSpinner: boolean = true
  id:any;
  idHabitacion:any;
  idRoom:any;
  getImagesChild:any;
  salesList:any;
  salesObj:any;
  getSales:any;
  habitacionesObj:any;
  submitted = false;
  dialogResult = '';
  type = ['Fechas exactas','Cualquier fecha'];
    
  constructor(private crudService: CrudService, public dialog : MatDialog,
  public router: Router, private ImageService : ImageService, public LoadService : LoadService, 
  private globals:GlobalsService) { }

  ngOnInit() {
    this.idHabitacion = this.globals.getRoomDetail(); 
    console.log(this.idHabitacion);
    this.id = this.globals.getIdNegocioChild();
    this.getSales = this.globals.getSalesRoom();
    this.getImages = this.globals.getImagesNegocio();
    this.getImagesChild = this.globals.getImagesNegocioChild()
    let imagenChild = [];
    if( this.getImagesChild != null){
      for ( var i in  this.getImagesChild){
        imagenChild.push({nameChild:this.getImagesChild[i].url,idChild:i});
      }
      this.itemsChild = imagenChild;
    }else{
      this.itemsChild =  [{name:'/assets/img/404.jpg'}];
    }
    let salesObj = [];
    for ( var i in this.getSales){
      salesObj.push({key:i,fecha_inicio:this.getSales[i].fecha_inicio, fecha_fin:this.getSales[i].fecha_fin,
      percent:this.getSales[i].percent});
    }
     this.salesObj = salesObj;
    
    let habitaciones = new Array;
      habitaciones.push({idHabitacion:this.idHabitacion.idHabitacion,nombre:this.idHabitacion.nombre, servicios:this.idHabitacion.servicios,
      huespedes:this.idHabitacion.huespedes, banos_privados:this.idHabitacion.banos_privados, banos_publicos:this.idHabitacion.banos_publicos,
      camas_individuales:this.idHabitacion.camas_individuales, camas_matrimoniales:this.idHabitacion.camas_matrimoniales,
      camarotes:this.idHabitacion.camarotes, moneda:this.idHabitacion.moneda, precio_noche:this.idHabitacion.precio_noche,
      precio_mes:this.idHabitacion.precio_mes, hora_llegada:this.idHabitacion.hora_llegada,hora_salida:this.idHabitacion.hora_salida,
      cancelacion:this.idHabitacion.cancelacion,descripcion:this.idHabitacion.descripcion,reglas:this.idHabitacion.reglas});

    this.habitacionesObj = habitaciones;
    this.showSpinner = false;
    //this.getSalesList();
  };
  /*
  getImages(){

    
      let imagen = [];
      this.getImagenes = this.ImageService.getImage(this.id)
      .then(function(snapshot){
        let imagenes = snapshot.val();
        if(imagenes!=undefined){
          for ( var i in imagenes){
            imagen.push({name:imagenes[i].url,id:i});
            let idImagen = imagenes[i].id;
            //Guarda el id del Negocio
            sessionStorage.setItem('idImagen', JSON.stringify(idImagen))
          }
          //obtiene el id del negocio
          let idSessionImagen = JSON.parse(sessionStorage.getItem('idImagen'));
          //guarda objeto en session identificado con el id del negocio
          sessionStorage.setItem(idSessionImagen, JSON.stringify(imagen));
        }else{
          let imagen ='';
        }
      }).then(() => this.viewImagenes(imagen))
      .catch(() => this.viewImagenes(imagen))
  };
*/
/*
  getSalesList(){
    let salesObj = [];
    this.idRoom =this.id;
    console.log('idRoom',this.idRoom);
    this.salesList = this.crudService.getSalesList(this.idRoom)
    .then(function(snapshot){
      let temporada = snapshot.val();
      console.log(temporada);
        for ( var i in temporada){
          salesObj.push({key:i,fecha_inicio:temporada[i].fecha_inicio, fecha_fin:temporada[i].fecha_fin,
          percent:temporada[i].percent});
        }
        console.log(salesObj);
        //guarda objeto en session identificado con el id del negocio
        sessionStorage.setItem('platosObj', JSON.stringify(salesObj));
    }).then(() => this.getTemporadas(salesObj))
  };
  getTemporadas(temp){
    this.salesObj = temp;
  }*/

  goUpload(){
    //this.negocio = JSON.parse(sessionStorage.getItem('negocio'));
    this.addImagen();
  };

  addImagen(){
    let idNegocio = this.idHabitacion.idNegocio;
    let idHabitacion = this.id;
	  localStorage.setItem('imagenIdPadre', idNegocio);
    localStorage.setItem('imagenIdHijo', idHabitacion);
	  localStorage.setItem('imagenCategoria', 'habitacion');
    this.router.navigate(['/upload']);
  };
  deleteImagen(id){
    let idNegocio = this.idHabitacion.idNegocio;
    let idHabitacion = this.id;
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que desea eliminar la imagen.'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        this.ImageService.deleteImagenRoom(id,idNegocio,idHabitacion);
        let keyNegocio = this.habitacionesObj.key;
        sessionStorage.removeItem(keyNegocio);
        this.router.navigate(['/lenap'])
      }
    })
  }
  
  addSales(form: NgForm){
    let idNegocio = this.idHabitacion.idNegocio;
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que desea guardar esta promoción.'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
       this.sales.idRoomSales=this.id;
       this.crudService.insertSales(this.sales,idNegocio,this.id)
       form.resetForm();
       //this.getSalesList();
      }
    })
  }
  deleteSales(key){
    console.log(key);
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que desea eliminar esta promoción.'
    }); 
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        this.crudService.deleteTempAlta(key);
        this.router.navigate(['/perfil-hotel'])
      }
    })
  };
}
