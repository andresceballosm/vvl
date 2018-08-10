import { Component, OnInit, ViewChild,Inject, Injectable  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from '../../servicios/crud.service';
import { Negocio} from '../../models/negocio';
import { AgmCoreModule } from '@agm/core';
import {} from  ' @ types / googlemaps ' ;
import { DOCUMENT } from '@angular/platform-browser';
import { MyDialogComponent } from '../../dialogos/my-dialog/my-dialog.component'
import { DialogoAlertaComponent } from '../../dialogos/dialogo-alerta/dialogo-alerta.component';
import { MatDialog,MatCard,MatButton,MatCardTitle } from '@angular/material'
import {Router } from '@angular/router';
import { auth } from 'firebase/app';
import {AuthService } from '../../servicios/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';

declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable: boolean;
}
var ciudades = require('../../ciudades/colombia.json');
@Component({
  selector: 'app-add-negocio',
  templateUrl: './add-negocio.component.html',
  styleUrls: ['./add-negocio.component.scss']
})
export class AddNegocioComponent implements OnInit {
  latVar: number;
  lngVar: number;
  locationChosen = false;
  negocio: Negocio = new Negocio();
  submitted = false;
  emailUsuario:string;
  dialogResult='';
  departamentos:any;
  ciudades:any;

  categorias = ['Hotel','Restaurante', 'Experiencia'];
  posicion = ['NO', 'SI'];
  type = ['Negocio'];

  subHotel = ['Hotel','Hotel Campestre', 'Hostal',
            'Casa', 'Casa campestre', 'Cabaña', 'Otro'];

  subRestaurante = ['Americano', 'Café y postres', 'Comida rápida','Criollo','Francés','Italiano',
                     'Mar','Mediterranea', 'Mexicano', 'Peruano', 'Otro'];

  subExperiencia = ['Cultural','Extremo','Gastronómico', 'Romántico','Senderismo', 
                     'Tour', 'Otro'];        
                    
  cancelacion=['Flexible','Mesurado', 'Rigido','Rigido 30 dias',
                      'Rigido 60 dias', 'Estancias largas', 'No aplica']     
                                    
  constructor(public router: Router,public dialog : MatDialog,
     private crudService: CrudService, public authService: AuthService,
      @Inject(DOCUMENT) private document: any) { 
      let departamentos=[];
      for(var dep in ciudades){
        departamentos.push({departamento:ciudades[dep].departamento})
      }
      this.departamentos = departamentos;
      console.log(ciudades);
      console.log(this.departamentos);
  }
  selectCity($event){
    let ciudad = [];
    for(var ci in ciudades){
      if( ciudades[ci].departamento == this.negocio.departamento){
        this.ciudades = ciudades[ci].ciudades;
      }
    }
  }
  ngDoCheck() {
    let latitude = sessionStorage.getItem('lat');
    let longitude = sessionStorage.getItem('lng');
    this.negocio.latitude = +latitude;
    this.negocio.longitude = +longitude;  
  };
  ngOnInit() {
    this.emailUsuario = localStorage.getItem('user');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latVar = position.coords.latitude;
        this.lngVar = position.coords.longitude;
        let lat = this.latVar.toString();
        let lng = this.lngVar.toString();
        sessionStorage.setItem('lat', lat);
        sessionStorage.setItem('lng', lng);
      });
    } else {
      this.latVar = 5.633659;
      this.lngVar =  -73.523261;
      this.negocio.latitude = this.latVar; 
      this.negocio.longitude = this.lngVar;
    }
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
      let lat = marker.getPosition().lat();
      let lng = marker.getPosition().lng(); 
      sessionStorage.setItem('lat', lat);
      sessionStorage.setItem('lng', lng);
    }); 
    marker.setMap(map); 
  };

  newNegocio(): void {
    this.submitted = false;
    this.negocio = new Negocio();
  };

  onSubmitAddNegocio(){
    if(this.negocio.categoria == 'Hotel'){
      this.crudService.insertHotel(this.negocio);
    }else if(this.negocio.categoria == 'Restaurante'){
      this.crudService.insertRestaurant(this.negocio);
    }else if(this.negocio.categoria == 'Experiencia'){
      this.crudService.insertExperiencie(this.negocio);
    }
  };

  onSubmit(form: NgForm) {
    this.submitted = true;
    this.negocio.type = 'Negocio';  
    this.negocio.portada = false;
    this.negocio.administrador = this.emailUsuario
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que todos los datos registrados son correctos.'
    }); 
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        this.onSubmitAddNegocio();
        form.resetForm();
        //window.location.reload();
      }
    })
  };
}


