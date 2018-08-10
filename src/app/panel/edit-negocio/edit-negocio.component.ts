import { Component, OnInit,Input, Inject, Output, EventEmitter,ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from '../../servicios/crud.service';
import { Negocio} from '../../models/negocio';
import {PanelComponent} from '../panel.component';
import {Router } from '@angular/router';
import { MyDialogComponent } from '../../dialogos/my-dialog/my-dialog.component'
import { DialogoAlertaComponent } from '../../dialogos/dialogo-alerta/dialogo-alerta.component';
import { MatDialog } from '@angular/material'
import { MatCard } from '@angular/material'
import { MatButton } from '@angular/material'
import { MatCardTitle } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import {} from  ' @ types / googlemaps ' ;
import { DOCUMENT } from '@angular/platform-browser';

declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable: boolean;
}

@Component({
  selector: 'app-edit-negocio',
  templateUrl: './edit-negocio.component.html',
  styleUrls: ['./edit-negocio.component.scss']
})
export class EditNegocioComponent implements OnInit {
//  @Input()element:Negocio
  idNegocio:any;
  key:string;
  negocio: Negocio = new Negocio();
  submitted = false;
  latVar: number;
  lngVar: number;
  dialogResult='';

  posicion = ['NO', 'SI'];
  subHotel = ['Hotel','Hotel Campestre', 'Hostal',
            'Casa', 'Casa campestre', 'Cabaña', 'Otro'];

  subRestaurante = ['Americano', 'Café y postres', 'Comida rápida','Criollo','Francés','Italiano',
                    'Mar','Mediterranea', 'Mexicano', 'Peruano', 'Otro'];

  subExperiencia = ['Cultural','Extremo','Gastronómico', 'Romántico','Senderismo', 
                     'Tour', 'Otro'];        
                    
  cancelacion=['Flexible','Mesurado', 'Rigido','Rigido 30 dias',
                      'Rigido 60 dias', 'Estancias largas', 'No aplica'] 
  constructor(public dialog : MatDialog, private crudService: CrudService,  public router: Router,
    @Inject(DOCUMENT) private document: any ) { }

  ngDoCheck() {
    let latitude = sessionStorage.getItem('lat');
    let longitude = sessionStorage.getItem('lng');
    this.negocio.latitude = +latitude;
    this.negocio.longitude = +longitude;  
  };
  ngOnInit() {
    /*if(sessionStorage.getItem('reLoad')==null){
      sessionStorage.setItem('reLoad', 'true');
      window.location.reload();
    }*/
    this.idNegocio=JSON.parse(sessionStorage.getItem('negocio'));
    for (var i = 0; i < this.idNegocio.length; i++) {
      var key=this.idNegocio;
      console.log(key)
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latVar = this.idNegocio.latitude; //position.coords.latitude;
        this.lngVar = this.idNegocio.longitude;//position.coords.longitude;
        let lat = this.latVar.toString();
        let lng = this.lngVar.toString();
        sessionStorage.setItem('lat', lat);
        sessionStorage.setItem('lng', lng);
      });
    } else {
      this.latVar = this.idNegocio.latitude;
      this.lngVar = this.idNegocio.longitude;
      this.negocio.latitude = this.latVar; 
      this.negocio.longitude = this.lngVar;
    }

    //LLena los campos con valores por defecto
    this.negocio.nombre = this.idNegocio.nombre;
    console.log(this.idNegocio.subcategoriah);
    if(this.idNegocio.subcategoriae!=undefined){
      this.negocio.subcategoriae = this.idNegocio.subcategoriae;
    }
    if(this.idNegocio.subcategoriah!=undefined){
      this.negocio.subcategoriah = this.idNegocio.subcategoriah;
    }
    if(this.idNegocio.subcategoriar!=undefined){
      this.negocio.subcategoriar = this.idNegocio.subcategoriar;
    };
    this.negocio.administrador = this.idNegocio.administrador;
    this.negocio.direccion = this.idNegocio.direccion;
    this.negocio.latitude = this.idNegocio.latitude;
    this.negocio.longitude = this.idNegocio.longitude;
    this.negocio.mascotas = this.idNegocio.mascotas;
    this.negocio.categoria = this.idNegocio.categoria
  }

  viewPosition(){
    var myLatlng = new google.maps.LatLng(this.latVar,this.lngVar);
    var mapOptions = {
        zoom: 17,
        center: myLatlng,
        scrollwheel: true, //we disable de scroll over the map, it is a really annoing when you scroll through page
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        title: "VVL!",
        draggable: true,
    });
    google.maps.event.addListener(marker, "dragend", function() { 
      let lat = marker.getPosition().lat().toString();
      let lng = marker.getPosition().lng().toString(); 

      sessionStorage.setItem('lat', lat);
      sessionStorage.setItem('lng', lng);
    }); 
    marker.setMap(map); 
  };

  editarNegocio(){
    console.log(this.negocio.categoria);
    if(this.negocio.categoria == 'Hotel'){
      this.crudService.updateHotel(this.negocio,this.key)
    }else if(this.negocio.categoria == 'Restaurante'){
      this.crudService.updateRestaurant(this.negocio,this.key)
    }else if(this.negocio.categoria == 'Experiencia'){
      this.crudService.updateExperiencie(this.negocio,this.key)
    }
  }

  onSubmit(form: NgForm) {
    this.idNegocio=JSON.parse(sessionStorage.getItem('negocio'));
    this.key=this.idNegocio.key;
    this.submitted = true;
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que todos los datos registrados son correctos.'
    }); 
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        this.editarNegocio();
        sessionStorage.removeItem('negocio');
        sessionStorage.removeItem('reLoad');
        this.router.navigate(['/lenap']);
      }
    })
  };
}
