import { Component, OnInit,Input, Output, EventEmitter, OnDestroy  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { CrudService } from '../../servicios/crud.service';
import { ImageService } from '../../servicios/image.service';
import { Negocio} from '../../models/negocio';
import { Router } from '@angular/router';
import { UICarouselModule } from 'ui-carousel';
import {  LoadService } from '../../servicios/load.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatDialog,MatCard,MatButton, MatCardTitle, MatListItem } from '@angular/material'

import { MyDialogComponent } from '../../dialogos/my-dialog/my-dialog.component'
import { DialogoAlertaComponent } from '../../dialogos/dialogo-alerta/dialogo-alerta.component';
import { Experiencia } from '../../models/experiencia';
import {  GlobalsService } from '../../servicios/globals.service';

@Component({
  selector: 'app-perfil-experiencia',
  templateUrl: './perfil-experiencia.component.html',
  styleUrls: ['./perfil-experiencia.component.scss']
})
export class PerfilExperienciaComponent implements OnInit {
  getExperiencias:any;
  images:any;
  getImages:any;
  items: any;
  experiencias: any;
  idNegocio:any;
  key:string;
  id:any;
  negocio: Negocio = new Negocio();
  submitted = false;
  dialogResult = '';
  experienciaObj:any;

  constructor(private crudService: CrudService, public dialog : MatDialog,
    public router: Router, private ImageService : ImageService, public LoadService : LoadService,
    private globals:GlobalsService) { }

  ngOnInit() {
    this.getExperiencias = this.globals.getExperiences()
    this.idNegocio = this.globals.getNegocio();
    this.getImages = this.globals.getImagesNegocio();
    let experiencia = this.getExperiencias;
    let imagen = [];
    for ( var i in this.getImages){
      imagen.push({name:this.getImages[i].url,id:i});
      let idImagen = this.getImages[i].id;
    }
    if(imagen!=[]){
      this.items = imagen;
    }else{
      this.items =  [{name:'/assets/img/404.jpg'}];
    }
    let experienciasObj = []
    for ( var i in experiencia){
      experienciasObj.push({idExperiencia:i,nombre:experiencia[i].nombre, herramientas:experiencia[i].herramientas,
      edad_min:experiencia[i].edad_min, num_personas:experiencia[i].num_personas, moneda:experiencia[i].moneda,
      precio:experiencia[i].precio, descripcion:experiencia[i].descripcion, cancelacion:experiencia[i].cancelacion
      });
    }
    this.experiencias = experienciasObj;
    console.log(this.experiencias)
  }
  /*
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
  getExperienciasList(){
    this.idNegocio=JSON.parse(sessionStorage.getItem('negocio'));
    this.id = this.idNegocio.key;
    this.experiencias = this.crudService.getExperienciasList(this.id)
    .then(function(snapshot){
      let experiencia = snapshot.val();
      console.log(experiencia);
      if(experiencia!=undefined){
        let experienciasObj = [];
        for ( var i in experiencia){
          experienciasObj.push({idExperiencia:i,nombre:experiencia[i].nombre, herramientas:experiencia[i].herramientas,
          edad_min:experiencia[i].edad_min, num_personas:experiencia[i].num_personas, moneda:experiencia[i].moneda,
          precio:experiencia[i].precio, descripcion:experiencia[i].descripcion, cancelacion:experiencia[i].cancelacion
          });
        }
        console.log(experienciasObj);
        //guarda objeto en session identificado con el id del negocio
        sessionStorage.setItem('experienciasObj', JSON.stringify(experienciasObj));
      }else{
        console.log('objeto experiencia vacio');
      }
    }) 
    this.getExperiencias = JSON.parse( sessionStorage.getItem('experienciasObj'));
  };
  */
  perfilExperiencia(idExperiencia){
    let experiencia = this.getExperiencias;
    for(var n in experiencia){
      if(n == idExperiencia){
        this.globals.setExperienciaDetail(experiencia[n]);
        this.globals.setImagesNegocioChild(experiencia[n].images);
        this.globals.setIdNegocioChild(idExperiencia);
        this.router.navigate(['/perfil-exp']);
      }
    }
  }
  viewImagenes(imagen){
    if(imagen!=''){
      this.items = imagen;
    }else{
      this.items =  [{name:'/assets/img/404.jpg'}];
    }
    console.log(this.items);
    this.LoadService.stopLoader();
  };
  goAddSubNegocio(){
    let keyNegocio = this.idNegocio.key;
    sessionStorage.setItem('idSubnegocio', keyNegocio);
    this.router.navigate(['/add-experiencia']); 
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
    
  deleteExperiencia(id){
    let idPadre = this.idNegocio.key;
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que desea eliminar la habitación.'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        this.crudService.deleteExperienceChild(id,idPadre);
        window.location.reload();
        
        this.router.navigate(['/lenap']);
      }
    })
  }

  editExperiencia(key){
    for(var n in  this.getExperiencias){
      if(n == key){
        console.log('entra a exppp');
        this.globals.setExperienciaEdit(this.getExperiencias[n]);
        sessionStorage.setItem('idExperiencia', key);
        this.router.navigate(['/edit-experiencia']);
      }
    }
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
        this.ImageService.deleteImagenExperience(id, idPadre);
        let keyNegocio = this.idNegocio.key;
        sessionStorage.removeItem(keyNegocio);
        this.router.navigate(['/lenap']);
      }
    })
  }

}
