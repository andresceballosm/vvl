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
  idNegocioChild;
  salesRoom;
  tempAlta;
  sale;

  constructor() {}

  setImagesNegocio(val){
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
  setImagesNegocioChild(val){
    this.imagesNegocio = val; 
  };
  getImagesNegocioChild(){
    return this.imagesNegocio;
  };
  setIdNegocioChild(val: string){
    this.idNegocioChild = val;
  };
  getIdNegocioChild(){
    return this.idNegocioChild;
  };
  //----------------------------VARIABLES H ----------------------
  setRooms(val: string){
    this.rooms = val;
    console.log('rooms en service',this.rooms);
  };
  getRooms(){
    return this.rooms;
  };
  setSalesRoom(val :string){
    this.salesRoom = val;
    console.log('rooms en service',this.rooms);
  };
  getSalesRoom(){
    return this.salesRoom;
  };
  setRoomDetail(val){
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
  setTempAlta(val){
    this.tempAlta = val;
  };
  getTempAlta(){
    return this.tempAlta;
  };
  setSale(val){
    this.sale = val;
  };
  getSale(){
    return this.sale;
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
