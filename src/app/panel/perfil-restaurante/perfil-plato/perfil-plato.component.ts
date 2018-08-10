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
import { GlobalsService } from '../../../servicios/globals.service';

@Component({
  selector: 'app-perfil-plato',
  templateUrl: './perfil-plato.component.html',
  styleUrls: ['./perfil-plato.component.scss']
})
export class PerfilPlatoComponent implements OnInit {
  idPlato:any;
  negocio:any;
  images:any;
  getImagenes:any;
  itemsChild: any;
  platos: any;
  idNegocio:any;
  key:string;
  id:any;
  platosObj:any;
  getImagesChild:any;
  submitted = false;
  dialogResult = '';

  constructor(private crudService: CrudService, public dialog : MatDialog,
    public router: Router, private ImageService : ImageService, public LoadService : LoadService, 
    private globals:GlobalsService) { }

  ngOnInit() {
    this.getImages();
  }
  getImages(){
    let platos = new Array;
    this.idPlato = this.globals.getPlatoDetail();
    this.getImagesChild = this.globals.getImagesNegocioChild();
    this.id = sessionStorage.getItem('idPlato');
    this.getImages = this.globals.getImagesNegocio();
    let imagenChild = [];
    if( this.getImagesChild != null){
      for ( var i in  this.getImagesChild){
        imagenChild.push({nameChild:this.getImagesChild[i].url,idChild:i});
      }
      this.itemsChild = imagenChild;
    }else{
      this.itemsChild =  [{name:'/assets/img/404.jpg'}];
    }
      platos.push({nombre:this.idPlato.nombre, cantidad:this.idPlato.cantidad,
      und_medida:this.idPlato.und_medida, num_personas:this.idPlato.num_personas, moneda:this.idPlato.moneda,
      precio:this.idPlato.precio, descripcion:this.idPlato.descripcion})
    this.platosObj = platos;

    /*
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
    this.viewImagenes(imagen);*/
  };

  
  goUpload(){
    let idPadre = this.idPlato.idNegocio;
    let keyPlato = this.id;
    this.addImagen(keyPlato,idPadre);
  };

  addImagen(key,idPadre){
    sessionStorage.removeItem(key);
    localStorage.setItem('imagenIdHijo', key);
    localStorage.setItem('imagenIdPadre', idPadre);
    localStorage.setItem('imagenCategoria', 'plato');
    this.router.navigate(['/upload']);
  };
  deleteImagen(id){
    let idNegocio = this.idPlato.idNegocio;
    let idExperienciaChild = this.id;
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que desea eliminar la imagen.'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        this.ImageService.deleteImagenExperienceChild(id,idNegocio,idExperienciaChild);
        let keyNegocio = this.idPlato.key;
        sessionStorage.removeItem(keyNegocio);
        this.router.navigate(['/lenap']);;
      }
    })
  }

}
