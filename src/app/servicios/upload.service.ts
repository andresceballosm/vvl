import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { GalleryImage } from '../models/galleryImage';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
//import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Upload } from '../models/upload';
import * as  firebase from 'firebase';

import { CrudService } from '../servicios/crud.service';
import {  UrlImage } from '../models/urlImage';


@Injectable()
export class UploadService {

  private basePath = '/uploads';
  private hotelsPath = '/hotels'
  private restaurantsPath = '/restaurants';
  private experiencesPath = '/experiences';
 // private uploads: FirebaseListObservable<GalleryImage[]>;
  private uploads: AngularFireList<GalleryImage>=null;
  urlimage: AngularFireList<UrlImage>=null;
  url:any;
  constructor(private ngFire: AngularFireModule, private db: AngularFireDatabase, 
    private crudService: CrudService) { }

  uploadFile(upload: Upload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`)
      .put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
      },
      // 2.) error observer
      (error) => {
        // upload failed
        console.log(error);
      },
      // 3.) success observer
      (): any => {
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        upload.id = localStorage.getItem('imagenKey');
        upload.categoria = localStorage.getItem('imagenCategoria');
        upload.idPadre = localStorage.getItem('imagenIdPadre');
        upload.portada = false;
        this.saveFileData(upload);
        //localStorage.removeItem('imagenIdPadre');
        localStorage.removeItem('imagenKey');
        console.log('esto es upload',upload);
      }
    );
  }
  private saveFileData(upload: Upload) {
    let uid=localStorage.getItem('imagenIdPadre');
    let uidChild=localStorage.getItem('imagenIdHijo');
    if(upload.categoria == 'Hotel'){
      this.db.list(`${this.hotelsPath}/${uid}/images`).push(upload);
    }else if(upload.categoria == 'Restaurante'){
      this.db.list(`${this.restaurantsPath}/${uid}/images`).push(upload);
    }else if(upload.categoria == 'Experiencia'){
      this.db.list(`${this.experiencesPath}/${uid}/images`).push(upload);
    }else if(upload.categoria == 'habitacion'){
      this.db.list(`${this.hotelsPath}/${uid}/rooms/${uidChild}/images`).push(upload);
    }else if(upload.categoria == 'plato'){
      this.db.list(`${this.restaurantsPath}/${uid}/platos/${uidChild}/images`).push(upload);
    }else if(upload.categoria == 'experienciaChild'){
      this.db.list(`${this.experiencesPath}/${uid}/experiencias/${uidChild}/images`).push(upload);
    }
  }
}