import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from '../servicios/crud.service';
import * as _ from "lodash";
import { NgForm } from '@angular/forms';
import { GlobalsService } from '../servicios/globals.service';
import { Router,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-listhoteles',
  templateUrl: './listhoteles.component.html',
  styleUrls: ['./listhoteles.component.scss']
})
export class ListhotelesComponent implements OnInit {
  getHoteles:any;
  offset = 10;
  nextKey: any; // for next button
  prevKeys: any[] = []; // for prev button
  subscription: any;
  hoteles:any;
  items:any;
  imagenes:any;
  showSpinner : boolean = true;

  constructor(private crudService: CrudService,private globals:GlobalsService,public router: Router) { }

  ngOnInit() {
    this.getHotelesList();
  }

  viewImages(){
    let imgObj = [];
    let img;
     for(var i in this.hoteles){
      img = this.hoteles[i].images;
         for(var e in img){
           imgObj.push({name:img[e].url,idNegocio:img[e].idPadre})
         }
      }
      this.items = imgObj;
      this.showSpinner = false;
      console.log(imgObj);
  }
  perfilHotel(key){
    console.log(key);
    let itemRooms;
    let rooms;
    let itemImages;
    let images
    let imagesRoom;
    for(var i in this.hoteles){ 
       if( this.hoteles[i].key==key){
         itemRooms = this.hoteles[i].rooms;
         itemImages = this.hoteles[i].images;
         this.globals.setNegocio(this.hoteles[i]);
         for ( var e in itemRooms){
           rooms = itemRooms;
         }
         for ( var e in itemImages){
           images = itemImages;
         }
         for ( var s in itemRooms){
           imagesRoom = itemRooms[s].images;
         }
         console.log('esto es imagesRoom',imagesRoom);
         this.globals.setImagesNegocio(images);
         this.globals.setRooms(rooms)
         this.router.navigate(['/pf-hotel']);
       }
    }
   }

  nextPage() {
    console.log(this.hoteles.key)
    this.prevKeys.push(_.first(this.hoteles)['$key'])
    console.log(this.nextKey); // set current key as pointer for previous page
    this.getHotelesList(this.nextKey)
  }
  prevPage() {
    const prevKey = _.last(this.prevKeys) // use last key in array
    this.prevKeys = _.dropRight(this.prevKeys) // then remove the last key in the array

    this.getHotelesList(prevKey)
  }
  private getHotelesList(key?) {
    this.getHoteles = this.crudService.getHotelesList2(this.offset, key).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(hoteles => {
        let img;
        this.hoteles = _.slice(hoteles, 0, this.offset)
        //images.push({name:this.imagenes.url,id:this.imagenes.id,idNegocio:this.imagenes.id,categoria:this.imagenes.categoria});
        console.log(this.hoteles)
        this.nextKey =_.get(hoteles[this.offset-1], 'key')
        this.viewImages();
    })
  };
}
