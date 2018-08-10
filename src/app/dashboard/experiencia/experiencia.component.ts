import { Component,  Output, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as Chartist from 'chartist';
import { CrudService } from '../../servicios/crud.service';
import { Negocio} from '../../models/negocio';
import { Router } from '@angular/router';
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
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.scss']
})
export class ExperienciaComponent implements OnInit {
  negocios:any;
  id:any;
  experiencias:any;
  getExperiencias:any;
  idNegocio:any;
  getImagenes:any;
  experienciasImg:any;
  showSpinner : boolean = true;
  loadExperiencias : boolean = false;
  items: any;
  imagesExperiencias:any;
  constructor( private crudService: CrudService, public dialog : MatDialog,
    public router: Router, private ImageService : ImageService, public LoadService : LoadService,private globals:GlobalsService) { }

  ngOnInit() {
    this.showSpinner=true;
    this.LoadService.fireLoader()
    this.getImages();
    this.getExperiencias = JSON.parse( sessionStorage.getItem('experienciasObj'));
    console.log('getHabitaciones',this.getExperiencias)
    this.showSpinner=false;
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

  viewImagenExperiencias(){
    console.log('id2',this.id);
    let imageExperiencias = [];
    this.imagesExperiencias = this.ImageService.getImagePadre(this.id)
    .then(function(snapshot){
       let imagesExperiencias = snapshot.val();
       for(var r in imagesExperiencias){
         imageExperiencias.push({url:imagesExperiencias[r].url,id:imagesExperiencias[r].id})
       }
    }).then(() => this.viewImagenesExperiencias(imageExperiencias))
  }
  viewImagenesExperiencias(img){
    if(img!=''){
      this.experienciasImg = img;
    }else{
      this.experienciasImg =  [{name:'/assets/img/404.jpg'}];
    }
    console.log('experienciasImg',this.experienciasImg);
    this.loadExperiencias=true;
  }
  viewImagenes(imagen){
    if(imagen!=''){
      this.items = imagen;
    }else{
      this.items =  [{name:'/assets/img/404.jpg'}];
  }
    console.log('items',this.items);
    this.viewImagenExperiencias()
  };
}

