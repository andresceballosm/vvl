import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GlobalsService {
  roomEdit;
  eatEdit;
  platos;
  experienciaEdit;
  rooms;
  roomDetail;
  platoDetail;
  experienciaDetail;
  imagesNegocio;
  negocio;
  experiencias;

  constructor() {}

  setImagesNegocio(val: string){
    this.imagesNegocio = val; 
  };
  getImagesNegocio(){
    return this.imagesNegocio;
  };
  setNegocio(val: string){
    this.negocio = val;
  };
  getNegocio(){
    return this.negocio;
  };
  setImagesNegocioChild(val: string){
    this.imagesNegocio = val; 
  };
  getImagesNegocioChild(){
    return this.imagesNegocio;
  };
  //----------------------------VARIABLES H ----------------------
  setRooms(val: string){
    this.rooms = val;
    console.log('rooms en service',this.rooms);
  };
  getRooms(){
    return this.rooms;
  };
  setRoomDetail(val: string){
    this.roomDetail = val;
  };
  getRoomDetail(){
    return this.roomDetail;
  };
  setRoomEdit(val: string){
    this.roomEdit = val;
    console.log(this.roomEdit);
  };
  getRoomEdit(){
    return this.roomEdit;
  };

  //------------------------------VARIABLES R----------------------------
  setPlatoDetail(plato){
    this.platoDetail = plato;
  };
  getPlatoDetail(){
    return this.platoDetail;
  };
  setPlatos(plato){
    this.platos = plato;
  };
  getPlatos(){
    return this.platos;
  };
  setEatEdit(val: string){
    this.eatEdit = val;
    console.log(this.eatEdit);
  };
  getEatEdit(){
    return this.eatEdit;
  };

  //-------------------------------VARIABLES E -------------------------
  setExperiences(val: string){
    this.experiencias = val;
  };
  getExperiences(){
    return this.experiencias;
  };
  getExperienciaDetail(){
    return this.experienciaDetail;
  };
  setExperienciaEdit(val: string){
    this.experienciaEdit = val;
    console.log(this.experienciaEdit);
  };
  setExperienciaDetail(val: string){
    this.experienciaDetail = val;
  };
  getExperienciaEdit(){
    return this.experienciaEdit;
  };
}
