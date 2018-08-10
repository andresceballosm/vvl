import { Component,  Output, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as Chartist from 'chartist';
import { CrudService } from '../../servicios/crud.service';
import { Negocio} from '../../models/negocio';
import { Router,NavigationEnd } from '@angular/router';
import { ImageService } from '../../servicios/image.service';
import { ISubscription } from 'rxjs/Subscription';
import { MyDialogComponent } from '../../dialogos/my-dialog/my-dialog.component'
import { DialogoAlertaComponent } from '../../dialogos/dialogo-alerta/dialogo-alerta.component';
import { Habitacion } from '../../models/habitacion';
import { MatDialog, MatCard, MatButton, MatCardTitle } from '@angular/material'
import { GlobalsService } from '../../servicios/globals.service';
import { UICarouselModule } from 'ui-carousel';
import {  LoadService } from '../../servicios/load.service';
import {MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  isPopState = false;
  negocios:any;
  id:any;
  habitaciones:any;
  getHabitaciones:any;
  idNegocio:any;
  getImagenes:any;
  roomsImg:any;
  showSpinner : boolean = true;
  loadRooms : boolean = false;
  items: any;
  imagesRooms:any;

  constructor( private crudService: CrudService, public dialog : MatDialog,
    public router: Router, private ImageService : ImageService, public LoadService : LoadService,private globals:GlobalsService) { }

  ngOnInit() {
    this.LoadService.fireLoader()
    this.getImages();
    this.getHabitaciones = JSON.parse( sessionStorage.getItem('habitacionesObj'));
    this.LoadService.stopLoader();
  }

  getImages(){
    this.idNegocio=JSON.parse(sessionStorage.getItem('negocio'));
    this.id = this.idNegocio.key;
    if(sessionStorage.getItem(this.id) == null || sessionStorage.getItem(this.id) == undefined){
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
    }else{
       let imagen = JSON.parse(sessionStorage.getItem(this.id));
       this.viewImagenes(imagen);
    }
  };

  viewImagenRooms(){
    let imageRooms = [];
    this.imagesRooms = this.ImageService.getImagePadre(this.id)
    .then(function(snapshot){
       let imagesRooms = snapshot.val();
       for(var r in imagesRooms){
         imageRooms.push({url:imagesRooms[r].url,id:imagesRooms[r].id})
       }
    }).then(() => this.viewImagenesRooms(imageRooms))
  }
  viewImagenesRooms(img){
    if(img!=''){
      this.roomsImg = img;
    }else{
      this.roomsImg =  [{name:'/assets/img/404.jpg'}];
    }
    this.loadRooms=true;
    this.showSpinner=false;
  }
  viewImagenes(imagen){
    if(imagen!=''){
      this.items = imagen;
    }else{
      this.items =  [{name:'/assets/img/404.jpg'}];
  }
    this.viewImagenRooms()
  };
  perfilHabitacion(key){
    let habitacionesList = this.getHabitaciones;
    console.log('habitacionesList',habitacionesList);
    let imageRoom = this.roomsImg;
    let roomList = [];
    let roomImg = [];
    for ( var h in habitacionesList){
      if( habitacionesList[h].idHabitacion==key){
        roomList.push({idHabitacion:habitacionesList[h].idHabitacion,nombre:habitacionesList[h].nombre, servicios:habitacionesList[h].servicios,
          huespedes:habitacionesList[h].huespedes, banos_privados:habitacionesList[h].banos_privados, banos_publicos:habitacionesList[h].banos_publicos,
          camas_individuales:habitacionesList[h].camas_individuales, camas_matrimoniales:habitacionesList[h].camas_matrimoniales,
          camarotes:habitacionesList[h].camarotes, moneda:habitacionesList[h].moneda, precio_noche_tbaja:habitacionesList[h].precio_noche_tbaja,
          precio_noche_talta:habitacionesList[h].precio_noche_talta,
          precio_mes:habitacionesList[h].precio_mes, hora_llegada:habitacionesList[h].hora_llegada,hora_salida:habitacionesList[h].hora_salida,
          cancelacion:habitacionesList[h].cancelacion,descripcion:habitacionesList[h].descripcion,reglas:habitacionesList[h].reglas})
      }
    }
    for ( var f in imageRoom ){
      if(imageRoom[f].id == key){
        roomImg.push({id:imageRoom[f].id, url:imageRoom[f].url})
      }
    }
    sessionStorage.setItem('habitacion', JSON.stringify(roomList));
    sessionStorage.setItem('roomImages', JSON.stringify(roomImg));
    this.router.navigate(['/habitacion'])
  }
}
