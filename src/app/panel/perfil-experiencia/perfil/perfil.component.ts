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
import { Experiencia } from '../../../models/experiencia';
import { GlobalsService } from '../../../servicios/globals.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  images:any;
  getImagenes:any;
  itemsChild: any;
  experiencia: any;
  idNegocio:any;
  key:string;
  negocio:any;
  getImagesChild:any;
  id:any;
  idExperiencia:any;
  experienciasObj:any;
  submitted = false;
  dialogResult = '';
  constructor( private crudService: CrudService, public dialog : MatDialog,
    public router: Router, private ImageService : ImageService, public LoadService : LoadService, 
    private globals:GlobalsService ) { }

  ngOnInit() {
    this.experienciasObj = this.globals.getExperienciaDetail()//JSON.parse( sessionStorage.getItem('experiencia'));
    this.getImagesChild = this.globals.getImagesNegocioChild()
    let experiencia = [];
    experiencia.push({idExperiencia:this.experienciasObj.experienciasObj,nombre:this.experienciasObj.nombre, num_personas:this.experienciasObj.num_personas,
    moneda:this.experienciasObj.moneda, precio:this.experienciasObj.precio, herramientas:this.experienciasObj.herramientas,
    edad_min:this.experienciasObj .edad_min, cancelacion:this.experienciasObj.cancelacion,
    descripcion:this.experienciasObj.descripcion, reglas:this.experienciasObj.reglas});  
    this.experiencia = experiencia;
    let imagenChild = [];
    if( this.getImagesChild != null){
      for ( var i in  this.getImagesChild){
        imagenChild.push({nameChild:this.getImagesChild[i].url,idChild:i});
      }
      this.itemsChild = imagenChild;
    }else{
      this.itemsChild =  [{name:'/assets/img/404.jpg'}];
    }
    
  }
 /*
  getImages(){
    let experiencias = new Array;
    this.idExperiencia = this.globals.getExperienciaDetail();
    this.getImagesChild = this.globals.getImagesNegocioChild()
    experiencias.push({idExperiencia:this.idExperiencia.idExperiencia,nombre:this.idExperiencia.nombre, num_personas:this.idExperiencia.num_personas,
    moneda:this.idExperiencia.moneda, precio:this.idExperiencia.precio, herramientas:this.idExperiencia.herramientas,
    edad_min:this.idExperiencia.edad_min, cancelacion:this.idExperiencia.cancelacion,
    descripcion:this.idExperiencia.descripcion, reglas:this.idExperiencia.reglas});
    
    this.experienciasObj = experiencias;
    this.id = this.idExperiencia.idExperiencia;
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
*/
  goUpload(){
    this.negocio = this.globals.getNegocio();
    console.log(this.negocio);
    let idPadre = this.negocio.key
    let keyExperiencia = sessionStorage.getItem('idExperiencia');
    this.addImagen(keyExperiencia,idPadre);
  };

  addImagen(key,idPadre){
    sessionStorage.removeItem(key);
    localStorage.setItem('imagenIdPadre', idPadre);
    localStorage.setItem('imagenIdHijo', key);
	  localStorage.setItem('imagenCategoria', 'experienciaChild');
    this.router.navigate(['/upload']);
  };
  deleteImagen(id){
    this.negocio = this.globals.getNegocio();
    let idNegocio = this.negocio.idNegocio;
    let idPlato = sessionStorage.getItem('idExperiencia');
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que desea eliminar la imagen.'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        this.ImageService.deleteImagenPlato(id,idNegocio,idPlato);
        this.router.navigate(['/lenap'])
      }
    })
  }

}
