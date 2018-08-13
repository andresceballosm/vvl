import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../../servicios/globals.service';
import { Router,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-perfilhotel',
  templateUrl: './perfilhotel.component.html',
  styleUrls: ['./perfilhotel.component.scss']
})
export class PerfilhotelComponent implements OnInit {
idNegocio:any;
getHabitaciones:any;
habitacionesList:any;
items:any;
getImages:any;
roomsImg:any;
showSpinner : boolean = true;
  constructor(private globals:GlobalsService,public router: Router) { }

  ngOnInit() {
    this.idNegocio = this.globals.getNegocio();
    this.habitacionesList = this.globals.getRooms();
    console.log('habitacionesList',this.habitacionesList)
    console.log('idNegocio',this.idNegocio);
    this.getImages = this.globals.getImagesNegocio();
    this.viewImages()
    this.viewRooms()
  }

  viewImages(){
    let img = []
    for(var e in this.getImages){
        img.push({name:this.getImages[e].url,idNegocio:this.getImages[e].idPadre})
    }
    this.items = img;
    console.log('this.items',this.items)
  }

  viewRooms(){
    let rooms = [];
    let habitacionesList = this.habitacionesList
    for (var h in habitacionesList){
      rooms.push({idHabitacion:h,nombre:habitacionesList[h].nombre, servicios:habitacionesList[h].servicios,
          huespedes:habitacionesList[h].huespedes, banos_privados:habitacionesList[h].banos_privados, banos_publicos:habitacionesList[h].banos_publicos,
          camas_individuales:habitacionesList[h].camas_individuales, camas_matrimoniales:habitacionesList[h].camas_matrimoniales,
          camarotes:habitacionesList[h].camarotes, moneda:habitacionesList[h].moneda, precio_noche_tbaja:habitacionesList[h].precio_noche_tbaja,
          precio_noche_talta:habitacionesList[h].precio_noche_talta,
          precio_mes:habitacionesList[h].precio_mes, hora_llegada:habitacionesList[h].hora_llegada,hora_salida:habitacionesList[h].hora_salida,
          cancelacion:habitacionesList[h].cancelacion,descripcion:habitacionesList[h].descripcion,reglas:habitacionesList[h].reglas})
    }
    this.getHabitaciones = rooms; 
    console.log(this.getHabitaciones);
    this.viewImagesRoom()
  }

  viewImagesRoom(){
    let imgObj = [];
    let img;
     for(var i in this.habitacionesList){
      img = this.habitacionesList[i].images;
      console.log(img);
         for(var e in img){
           imgObj.push({url:img[e].url,id:img[e].idHijo})
         }
      }
      this.roomsImg = imgObj;
      console.log(imgObj);
      this.showSpinner = false;
  }

  perfilHabitacion(key){
    let roomDetail;
    let imagesRoom = [];
    let roomSales;
    for(var r in this.getHabitaciones){
      if(key == this.getHabitaciones[r].idHabitacion){
        roomDetail = this.getHabitaciones[r];
      }
    }
    for (var i in this.roomsImg){
      if(key == this.roomsImg[i].id){
        imagesRoom.push({url:this.roomsImg[i].url});
      }
    }
    for(var r in this.habitacionesList){
      if(key == r){
        roomSales = this.habitacionesList[r].sales;
      }
    }
    console.log('roomSales',roomSales);
    this.globals.setImagesNegocioChild(imagesRoom);
    this.globals.setRoomDetail(roomDetail);
    this.globals.setSale(roomSales);
    this.router.navigate(['/habitacion']);
  }



}
