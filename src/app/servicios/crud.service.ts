import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Negocio} from '../models/negocio';
import { Habitacion} from '../models/habitacion';
import { Plato} from '../models/plato';
import { Experiencia} from '../models/experiencia';
import { Usuario} from '../models/usuario';
import { Sales } from '../models/sales';
import { TempAlta} from '../models/tempAlta';
import { Reserva} from '../models/reserva';
import { UrlImage } from '../models/urlImage';
import { query } from '@angular/animations';
import * as firebase from 'firebase';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import { truncate } from 'fs';

@Injectable()
export class CrudService {
  private dbPath = '/vvdl-53913';
  private dbPathImage = '/uploads';
  negocio: AngularFireList<Negocio>=null;
  tempAlta: AngularFireList<TempAlta>=null;
  habitacion: AngularFireList<Habitacion>=null;
  plato: AngularFireList<Plato>=null;
  sales: AngularFireList<Sales>=null;
  experiencia: AngularFireList<Experiencia>=null;
  usuario: AngularFireList<Usuario>=null;
  urlImage: AngularFireList<UrlImage>=null;
  private hotelsPath = '/hotels';
  private RestaurantsPath = '/restaurants'
  private ExperiencesPath = '/experiences'
  constructor(public db: AngularFireDatabase) {

    this.habitacion = db.list(this.dbPath,  ref => ref.orderByChild('type').equalTo('Subnegocio'));
    this.plato = db.list(this.dbPath,  ref => ref.orderByChild('type').equalTo('Subnegocio'));
    this.experiencia = db.list(this.dbPath,  ref => ref.orderByChild('type').equalTo('Subnegocio'));
    this.usuario = db.list(this.dbPath,  ref => ref.orderByChild('type').equalTo('Usuario'));
    this.urlImage = db.list(this.dbPathImage,  ref => ref.orderByChild('type').equalTo('UrlImage'));
  }
  
  getNegociosList(administrador): AngularFireList<Negocio> {
    return  this.negocio = this.db.list(this.dbPath,  ref => ref.orderByChild('administrador').equalTo(administrador));
  };
  getHotelsList(administrador): AngularFireList<Negocio> {
    return  this.negocio = this.db.list('/hotels',  ref => ref.orderByChild('administrador').equalTo(administrador));
  };
  getRestaurantesList(administrador): AngularFireList<Negocio> {
    return  this.negocio = this.db.list('/restaurants',  ref => ref.orderByChild('administrador').equalTo(administrador));
  };
  getExperienciaList(administrador): AngularFireList<Negocio> {
    return  this.negocio = this.db.list('/experiencies',  ref => ref.orderByChild('administrador').equalTo(administrador));
  };
  getHotelsAdminList(){
    return  this.negocio = this.db.list('/hotels');
  }
  getRestaurantsAdminList(){
    return  this.negocio = this.db.list('/restaurants');
  }
  getExperiencesAdminList(){
    return  this.negocio = this.db.list('/experiences');
  }
  /*
  getNegociosAdminList(): AngularFireList<Negocio> {
    return  this.negocio = this.db.list(this.dbPath,  ref => ref.orderByChild('type').equalTo('Negocio'));
  };
  getHotelesList(): AngularFireList<Negocio> {
    return  this.negocio = this.db.list(this.dbPath,  ref => ref.orderByChild('categoria').equalTo('Hotel'));
  };*/

  getHotelesList2(offset,startKey): AngularFireList<Negocio> {
    console.log(startKey);
    if(startKey==undefined){
      return  this.negocio = this.db.list('/hotels',  ref => ref.orderByKey().startAt('-LJQ').limitToFirst(offset+1));
    }else{
      return  this.negocio = this.db.list('/hotels/',  ref => ref.orderByKey().startAt(startKey).limitToFirst(offset+1));
    }
  }
  /*
  getRestaurantsList(): AngularFireList<Negocio> {
    return  this.negocio = this.db.list(this.dbPath,  ref => ref.orderByChild('categoria').equalTo('Restaurante'));
  };
  getExperiencesList(): AngularFireList<Negocio> {
    return  this.negocio = this.db.list(this.dbPath,  ref => ref.orderByChild('categoria').equalTo('Experiencia'));
  };*/
  getNegociosPortadaList(): AngularFireList<Negocio> {
    return  this.negocio = this.db.list(this.dbPath,  ref => ref.orderByChild('portada').equalTo(true));
  };
  /*
  getHabitacionesList(id){
    return firebase.database().ref('hotels/').orderByChild('idNegocio').equalTo(id).once('value');
  };
  getPlatosList(id){
    return firebase.database().ref('vvdl-53913/').orderByChild('idNegocio').equalTo(id).once('value');
  };
  getExperienciasList(id){
    return firebase.database().ref('vvdl-53913/').orderByChild('idNegocio').equalTo(id).once('value');
  };
  getUrlImagesList(): AngularFireList<UrlImage> {
    return this.urlImage;
  };*/
  getTempAltaList(admin) {
    return firebase.database().ref('temporadas/').orderByChild('adminTemp').equalTo(admin).once('value');
  };
  /*
  getSalesList(idRoom) {
    return firebase.database().ref('vvdl-53913/').orderByChild('idRoomSales').equalTo(idRoom).once('value');
  };*/
  getReservasList(admin) {
    return firebase.database().ref('reservas/').orderByChild('adminReserva').equalTo(admin).once('value');
  };
  getReservasForNegocio(idNegocio) {
    return firebase.database().ref('reservas/').orderByChild('idNegocioreserva').equalTo(idNegocio).once('value');
  };
  getReservasClientList(admin) {
    return firebase.database().ref('reservas/').orderByChild('cliente').equalTo(admin).once('value');
  };
  insertNegocio(negocio: Negocio){
    this.db.list('/vvdl-53913').push(negocio)
  };
  insertHotel(negocio: Negocio){
    this.db.list('/hotels').push(negocio)
  };
  insertRestaurant(negocio: Negocio){
    this.db.list('/restaurants').push(negocio)
  };
  insertExperiencie(negocio: Negocio){
    this.db.list('/experiences').push(negocio)
  };
  insertSales(sales: Sales,idNegocio,idRoom){
    this.db.list(`${this.hotelsPath}/${idNegocio}/rooms/${idRoom}/sales`).push(sales)
  };
  insertTempAlta(tempAlta: TempAlta): void{
    this.db.list('/temporadas').push(tempAlta)
  };
  insertPreserva(reserva: Reserva){
    console.log(reserva);
    return this.db.list('/reservas').push(reserva)
  };
  deleteTempAlta($key: string){ 
    this.db.list('/temporadas').remove($key)
  };
  insertHabitacion(habitacion: Habitacion,uid): void {
    this.db.list(`${this.hotelsPath}/${uid}/rooms`).push(habitacion);
  };
  insertPlato(plato: Plato,uid): void {
    this.db.list(`${this.RestaurantsPath}/${uid}/platos`).push(plato);
  };
  insertExperiencia(experiencia: Experiencia,uid): void {
    this.db.list(`${this.ExperiencesPath}/${uid}/experiencias`).push(experiencia);
  };
  //no uso
  updateNegocio(negocio: Negocio, key: string){
    this.db.list('/vvdl-53913').update(key,negocio).then(_ => console.log('success'))
    .catch(err => console.log(err, 'You do not have access!'));
  };
  updateHotel(negocio: Negocio, key: string){
    this.db.list('/hotels').update(key,negocio).then(_ => console.log('success'))
    .catch(err => console.log(err, 'You do not have access!'));
  };
  updateRestaurant(negocio: Negocio, key: string){
    this.db.list('/restaurants').update(key,negocio).then(_ => console.log('success'))
    .catch(err => console.log(err, 'You do not have access!'));
  };
  updateExperiencie(negocio: Negocio, key: string){
    this.db.list('/experiences').update(key,negocio).then(_ => console.log('success'))
    .catch(err => console.log(err, 'You do not have access!'));
  };
  updateReserva(key,reserva){
    console.log(key,reserva);
    return this.db.list('/vvdl-53913').update(key,reserva).then(_ => sessionStorage.setItem('responseCancel', 'success'))
    .catch(err => console.log(err, 'You do not have access!'));
  };
  updateHabitacion(habitacion: Habitacion, key: string, idNegocio){
    let idPadre = idNegocio
    this.db.list(`${this.hotelsPath}/${idPadre}/rooms`).update(key,habitacion)
    .then(_ => console.log('success'))
    .catch(err => console.log(err, 'You do not have access!'));
  };
  updatePlato(habitacion: Habitacion, $key: string, idNegocio){
    this.db.list(`${this.RestaurantsPath}/${idNegocio}/platos`).update($key,habitacion)
    .then(_ => console.log('success'))
    .catch(err => console.log(err, 'You do not have access!'));
  };
  updateExperiencia(experiencia: Experiencia, $key: string,idNegocio){
    this.db.list(`${this.ExperiencesPath}/${idNegocio}/experiencias`).update($key,experiencia)
    .then(_ => console.log('success'))
    .catch(err => console.log(err, 'You do not have access!'));
  };
  //sin uso
  deleteNegocio($key: string,idPadre){ 
    this.db.list(`${this.hotelsPath}/${idPadre}/rooms`).remove($key)
  };
  deleteRoom($key: string, idNegocio){ 
    this.db.list(`${this.hotelsPath}/${idNegocio}/rooms`).remove($key)
  };
  deletePlato($key: string,idNegocio){ 
    this.db.list(`${this.RestaurantsPath}/${idNegocio}/platos`).remove($key)
  };
  deleteExperienceChild($key: string, idNegocio){ 
    this.db.list(`${this.ExperiencesPath}/${idNegocio}/experiencias`).remove($key)
  };
  deleteHotels($key: string){ 
    this.db.list('/hotels').remove($key)
  };
  deleteRestaurant($key: string){ 
    this.db.list('/restaurants').remove($key)
  };
  deleteExperiences($key: string){ 
    this.db.list('/experiences').remove($key)
  };
  insertUsuario(usuario: Usuario) {
    return new Promise((resolve, reject) => {
    this.usuario.push(usuario)
    .then( userData =>  resolve(userData),
    err => reject (err));
  });
 }

}
