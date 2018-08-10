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
import { Plato } from '../../models/plato';
import {  GlobalsService } from '../../servicios/globals.service';

@Component({
  selector: 'app-perfil-restaurante',
  templateUrl: './perfil-restaurante.component.html',
  styleUrls: ['./perfil-restaurante.component.scss']
})
export class PerfilRestauranteComponent implements OnInit {
  getPlatos:any;
  images:any;
  getImagenes:any;
  items: any;
  platos: any;
  idNegocio:any;
  key:string;
  id:any;
  negocio: Negocio = new Negocio();
  submitted = false;
  dialogResult = '';
  constructor(private crudService: CrudService, public dialog : MatDialog,
  public router: Router, private ImageService : ImageService, public LoadService : LoadService,
  private globals:GlobalsService) {}

  ngOnInit() {
   // this.getImages();
   this.idNegocio = this.globals.getNegocio();
   console.log(this.idNegocio);
   this.getPlatos = this.globals.getPlatos();
   console.log('getPLatos',this.getPlatos);
   this.getImages = this.globals.getImagesNegocio();
   console.log('getImages',this.getImages)
   let platosList = []
    for ( var i in this.getPlatos){
      platosList.push({idPlato:i,nombre:this.getPlatos[i].nombre,cantidad:this.getPlatos[i].cantidad,
      und_medida:this.getPlatos[i].und_medida, num_personas:this.getPlatos[i].num_personas, moneda:this.getPlatos[i].moneda,
      precio:this.getPlatos[i].precio, descripcion:this.getPlatos[i].descripcion})
    };
    let imagen = [];
    for ( var i in this.getImages){
      imagen.push({name:this.getImages[i].url,id:i});
      let idImagen = this.getImages[i].id;
    };
    if(imagen!=null){
      this.items = imagen;
    }else{
      this.items =  [{name:'/assets/img/404.jpg'}];
    }
    let habitacionesList = []
    this.platos = platosList;
  }
  getImages(){
    this.idNegocio=JSON.parse(sessionStorage.getItem('negocio'));
    this.id = this.idNegocio.key;
    /*if(sessionStorage.getItem(this.id) == null || sessionStorage.getItem(this.id) == undefined){
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
    }*/
  };
  /*
  getPlatosList(){
    this.idNegocio=JSON.parse(sessionStorage.getItem('negocio'));
    this.id = this.idNegocio.key;
    this.platos = this.crudService.getPlatosList(this.id)
    .then(function(snapshot){
      let plato = snapshot.val();
      console.log(plato);
      if(plato!=undefined){
        let platosObj = [];
        for ( var i in plato){
          platosObj.push({idPlato:i,nombre:plato[i].nombre, cantidad:plato[i].cantidad,
          und_medida:plato[i].und_medida, num_personas:plato[i].num_personas, moneda:plato[i].moneda,
          precio:plato[i].precio, descripcion:plato[i].descripcion
          });
        }
        console.log(platosObj);
        //guarda objeto en session identificado con el id del negocio
        sessionStorage.setItem('platosObj', JSON.stringify(platosObj));
      }else{
        console.log('objeto platos vacio');
      }
    }) 
    this.getPlatos = JSON.parse( sessionStorage.getItem('platosObj'));
    console.log(this.getPlatos);
  };*/
  perfilPlato(idPlato){
    for(var n in this.getPlatos){
      if(n == idPlato){
        this.globals.setPlatoDetail(this.getPlatos[n]);
        this.globals.setImagesNegocioChild(this.getPlatos[n].images)
        sessionStorage.setItem('idPlato', idPlato);
        this.router.navigate(['/perfil-eat']);
      }
    }
  };
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
    this.router.navigate(['/add-eat']); 
  };

  goUpload(){
    let keyNegocio = this.idNegocio.key;
    let keyCategoria = this.idNegocio.categoria;
    this.addImagen(keyNegocio,keyCategoria)
  };

  addImagen(key,categoria){
    sessionStorage.removeItem(key);
    localStorage.setItem('imagenIdPadre', key);
    localStorage.setItem('imagenCategoria', categoria);
	  localStorage.setItem('imagenIdHijo', '');
    this.router.navigate(['/upload']);
  };

  deletePlato(id){
    let idPadre = this.idNegocio.key;
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que desea eliminar la habitación.'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        this.crudService.deletePlato(id, idPadre);
        window.location.reload();
        sessionStorage.removeItem('platosObj');
        this.router.navigate(['/lenap']);
      }
    })
  }

  editPlato(key){
    console.log('editPlato')
    for(var n in this.getPlatos){
      if(n == key){
        this.globals.setEatEdit(this.getPlatos[n]);
        sessionStorage.setItem('idPlato', key);
        this.router.navigate(['/edit-eat']);
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
        this.ImageService.deleteImagenRestaurant(id, idPadre);
        let keyNegocio = this.idNegocio.key;
        sessionStorage.removeItem(keyNegocio);
        this.router.navigate(['/lenap']);
      }
    })
  }


}
