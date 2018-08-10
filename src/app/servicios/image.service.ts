import { Injectable,OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import { GalleryImage } from '../models/galleryImage';
import * as firebase from 'firebase';


@Injectable()
export class ImageService {
  private uid: string;
  private images:string;
  imagesService:any;
  private dbPath = '/uploads';
  image: AngularFireList<GalleryImage>=null;
  private hotelsPath = '/hotels';
  private RestaurantsPath = '/restaurants'
  private ExperiencesPath = '/experiences'

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { 
    this.image = db.list(this.dbPath,  ref => ref.orderByChild('type').equalTo('GalleryImage'));
    this.imagesService = this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.uid = auth.uid;
      }
    });
  }

  getImage(postId) {
     return firebase.database().ref('uploads/').orderByChild('id').equalTo(postId).once('value');
  }
  getImageHotel() {
     return firebase.database().ref('uploads/').orderByChild('categoria').equalTo('Hotel').once('value');
  }
  getImageRestaurant() {
    return firebase.database().ref('uploads/').orderByChild('categoria').equalTo('Restaurante').once('value');
  }
  getImageExperience() {
    return firebase.database().ref('uploads/').orderByChild('categoria').equalTo('Experiencia').once('value');
  }
  getImagePortada() {
     return firebase.database().ref('uploads/').orderByChild('portada').equalTo(true).once('value');
  }
  getImagePadre(id) {
     return firebase.database().ref('uploads/').orderByChild('idPadre').equalTo(id).once('value');
  }
  deleteImagen($key: string){
    this.image.remove($key);
  };
  deleteImagenHotel($key: string, idNegocio){
    this.db.list(`${this.hotelsPath}/${idNegocio}/images`).remove($key);
  };
  deleteImagenRestaurant($key: string, idNegocio){
    this.db.list(`${this.RestaurantsPath}/${idNegocio}/images`).remove($key);
  };
  deleteImagenExperience($key: string, idNegocio){
    this.db.list(`${this.ExperiencesPath}/${idNegocio}/images`).remove($key);
  };
  deleteImagenRoom($key: string, idNegocio, idRoom){
    this.db.list(`${this.hotelsPath}/${idNegocio}/rooms/${idRoom}/images`).remove($key);
  };
  deleteImagenPlato($key: string, idNegocio, idPlato){
    console.log('idNegocio :', idNegocio + 'idPlato : ', idPlato);
    this.db.list(`${this.RestaurantsPath}/${idNegocio}/platos/${idPlato}/images`).remove($key);
  };
  deleteImagenExperienceChild($key: string, idNegocio, idExperience){
    this.db.list(`${this.ExperiencesPath}/${idNegocio}/experiencias/${idExperience}/images`).remove($key);
  };
  
 
}