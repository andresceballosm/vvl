import { Component,  Output, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as Chartist from 'chartist';
import { CrudService } from '../../servicios/crud.service';
import { Negocio} from '../../models/negocio';
import { Router } from '@angular/router';
import { ImageService } from '../../servicios/image.service';
import { ISubscription } from 'rxjs/Subscription';
import { MyDialogComponent } from '../../dialogos/my-dialog/my-dialog.component'
import { DialogoAlertaComponent } from '../../dialogos/dialogo-alerta/dialogo-alerta.component';
import { Plato } from '../../models/plato';
import { MatDialog, MatCard, MatButton, MatCardTitle } from '@angular/material'
import { GlobalsService } from '../../servicios/globals.service';
import { UICarouselModule } from 'ui-carousel';
import {  LoadService } from '../../servicios/load.service';
import {MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.scss']
})
export class RestauranteComponent implements OnInit {
  negocios:any;
  id:any;
  eats:any;
  getEats:any;
  idNegocio:any;
  getImagenes:any;
  eatsImg:any;
  showSpinner : boolean = true;
  loadEats : boolean = false;
  items: any;
  imagesEats:any;
  constructor(private crudService: CrudService, public dialog : MatDialog,
    public router: Router, private ImageService : ImageService, public LoadService : LoadService,private globals:GlobalsService) { }

    ngOnInit() {
      this.showSpinner=true;
      this.LoadService.fireLoader()
      this.getImages();
      this.getEats = JSON.parse( sessionStorage.getItem('eatsObj'));
      console.log('getEats',this.getEats)
      this.showSpinner=false;
      this.LoadService.stopLoader();
    }
  
    getImages(){
      this.idNegocio=JSON.parse(sessionStorage.getItem('negocio'));
      this.id = this.idNegocio.key;
        console.log('id2',this.id);
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
  
    viewImagenEats(){
      console.log('id2',this.id);
      let imageEats = [];
      this.imagesEats = this.ImageService.getImagePadre(this.id)
      .then(function(snapshot){
         let imagesRooms = snapshot.val();
         for(var r in imagesRooms){
           imageEats.push({url:imagesRooms[r].url,id:imagesRooms[r].id})
         }
      }).then(() => this.viewImagenesEats(imageEats))
    }
    viewImagenesEats(img){
      if(img!=''){
        this.eatsImg = img;
      }else{
        this.eatsImg =  [{name:'/assets/img/404.jpg'}];
      }
      console.log('eatImg',this.eatsImg);
      this.loadEats=true;
    }
    viewImagenes(imagen){
      if(imagen!=''){
        this.items = imagen;
      }else{
        this.items =  [{name:'/assets/img/404.jpg'}];
    }
      console.log('items',this.items);
      this.viewImagenEats()
    };
  }
  
