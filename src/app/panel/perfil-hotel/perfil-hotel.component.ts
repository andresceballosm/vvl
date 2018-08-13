import { Component, OnInit,Input, Output, EventEmitter, OnDestroy  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { CrudService } from '../../servicios/crud.service';
import { ImageService } from '../../servicios/image.service';
import { Negocio} from '../../models/negocio';
import {Router } from '@angular/router';
import { UICarouselModule } from 'ui-carousel';
import {  LoadService } from '../../servicios/load.service';
import {MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatDialog,MatCard,MatButton, MatCardTitle, MatListItem } from '@angular/material'

import { MyDialogComponent } from '../../dialogos/my-dialog/my-dialog.component'
import { DialogoAlertaComponent } from '../../dialogos/dialogo-alerta/dialogo-alerta.component';
import { Habitacion } from '../../models/habitacion';
import {  GlobalsService } from '../../servicios/globals.service';
import { element } from 'protractor';

@Component({
  selector: 'app-perfil-hotel',
  templateUrl: './perfil-hotel.component.html',
  styleUrls: ['./perfil-hotel.component.scss']
})
export class PerfilHotelComponent implements OnInit {
  getHabitaciones:any;
  getHabitaciones1:any;
  roomEdit:any;
  getImages:any;
  getImages1:any;
  images:any;
  getImagenes:any;
  items: any;
  habitaciones: any;
  idNegocio:any;
  key:string;
  id:any;
  showSpinner: boolean = true
  negocio: Negocio = new Negocio();
  submitted = false;
  dialogResult = '';
  constructor(private crudService: CrudService, public dialog : MatDialog,
  public router: Router, private ImageService : ImageService, public LoadService : LoadService,private globals:GlobalsService) {
  
  }
  ngOnInit() {
    this.idNegocio= this.globals.getNegocio()
    this.getHabitaciones = this.globals.getRooms();
    this.getImages = this.globals.getImagesNegocio();
    let imagen = [];
    for ( var i in this.getImages){
      imagen.push({name:this.getImages[i].url,id:i});
      let idImagen = this.getImages[i].id;
    }
    if(imagen!=null){
      this.items = imagen;
    }else{
      this.items =  [{name:'/assets/img/404.jpg'}];
    }
    let habitacionesList = []
    for ( var i in this.getHabitaciones){
      habitacionesList.push({idHabitacion:i,nombre:this.getHabitaciones[i].nombre})
    }
    this.habitaciones = habitacionesList;
    this.showSpinner = false;
  };
  /*
  getImages(){
    this.LoadService.fireLoader()
    this.idNegocio=JSON.parse(sessionStorage.getItem('negocio'));
    this.id = this.idNegocio.key;
    if(sessionStorage.getItem(this.id) == null || sessionStorage.getItem(this.id) == undefined){
      let imagen = [];
      this.getImagenes = this.ImageService.getImage(this.id)
      .then(function(snapshot){
        let imagenes = snapshot.val();
        console.log(imagenes);
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
    }else{
       let imagen = JSON.parse(sessionStorage.getItem(this.id));
       this.viewImagenes(imagen);
    }
  };

  getHabitacionesList(){
    this.idNegocio=JSON.parse(sessionStorage.getItem('negocio'));
    this.id = this.idNegocio.key;
    this.habitaciones = this.crudService.getHabitacionesList(this.id)
    .then(function(snapshot){
      let habitacion = snapshot.val();
      if(habitacion!=undefined){
        let habitacionesObj = [];
        for ( var i in habitacion){
          habitacionesObj.push({idHabitacion:i,nombre:habitacion[i].nombre, servicios:habitacion[i].servicios,
          huespedes:habitacion[i].huespedes, banos_privados:habitacion[i].banos_privados, banos_publicos:habitacion[i].banos_publicos,
          camas_individuales:habitacion[i].camas_individuales, camas_matrimoniales:habitacion[i].camas_matrimoniales,
          camarotes:habitacion[i].camarotes, moneda:habitacion[i].moneda, precio_noche_tbaja:habitacion[i].precio_noche_tbaja,
          precio_noche_talta:habitacion[i].precio_noche_talta,
          precio_mes:habitacion[i].precio_mes, hora_llegada:habitacion[i].hora_llegada,hora_salida:habitacion[i].hora_salida,
          cancelacion:habitacion[i].cancelacion,descripcion:habitacion[i].descripcion,reglas:habitacion[i].reglas
          });
        }
        //guarda objeto en session identificado con el id del negocio
        sessionStorage.setItem('habitacionesObj', JSON.stringify(habitacionesObj));
      }else{
        console.log('objeto habitaciones vacio');
      }
    }) 
    this.getHabitaciones = JSON.parse( sessionStorage.getItem('habitacionesObj'));
  };
*/
  perfilHabitacion(idHabitacion){
    let habitacion = this.getHabitaciones
    for(var n in habitacion){
      if(n == idHabitacion){
        this.globals.setIdNegocioChild(idHabitacion);
        this.globals.setSalesRoom(habitacion[n].sales);
        this.globals.setRoomDetail(habitacion[n]);
        this.globals.setImagesNegocioChild(habitacion[n].images)
        this.router.navigate(['/perfil-habitacion']);
      }
    }
  };
    
  goAddSubNegocio(){
    let keyNegocio = this.idNegocio.key;
    sessionStorage.setItem('idSubnegocio', keyNegocio);
    this.router.navigate(['/add-room']);
  };

  goUpload(){
    let keyNegocio = this.idNegocio.key;
    let categoriaNegocio = this.idNegocio.categoria;
    this.addImagen(keyNegocio,categoriaNegocio)
  };

  addImagen(key,categoria){
    localStorage.setItem('imagenIdPadre', key);
    localStorage.setItem('imagenCategoria', categoria);
    localStorage.setItem('imagenIdHijo', '');
    this.router.navigate(['/upload']);
  };

  deleteHabitacion(id){
    let idPadre = this.idNegocio.key;
    console.log(idPadre,'idPadre');
    console.log(id);
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que desea eliminar la habitación.'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        this.crudService.deleteNegocio(id,idPadre);
        window.location.reload();
        this.router.navigate(['/lenap']);
      }
    })
  }

  editHabitacion(key){
    console.log(this.getHabitaciones);
    console.log(key);
    for(var n in this.getHabitaciones){
      if(n == key){
        this.globals.setRoomEdit(this.getHabitaciones[n]);
        sessionStorage.setItem('idHabitacion', key);
        this.router.navigate(['/edit-room']);
      }
    }
   /* this.getHabitaciones.forEach(element => {
      console.log(element);
      if(element==key){
        this.globals.setRoomEdit(element);
        this.router.navigate(['/edit-room']);
      }
    });*/
  };

  deleteImagen(id){
    let idPadre = this.idNegocio.key;
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que desea eliminar la imagen.'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        this.ImageService.deleteImagenHotel(id,idPadre);
        let keyNegocio = this.idNegocio.key;
        sessionStorage.removeItem(keyNegocio);
        this.router.navigate(['/lenap']);
      }
    })
  };
}
