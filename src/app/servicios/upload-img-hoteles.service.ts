import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { GalleryImage } from '../models/galleryImage';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
//import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Upload } from '../models/upload';
import * as  firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UploadImgHotelesService {
  private basePath = '/upload';
  // private uploads: FirebaseListObservable<GalleryImage[]>;
   private uploads: AngularFireList<GalleryImage>=null;
 
   constructor(private ngFire: AngularFireModule, private db: AngularFireDatabase) { }
 
   uploadFile(upload: Upload) {
     const storageRef = firebase.storage().ref();
     const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`)
       .put(upload.file);
 
     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
       // three observers
       // 1.) state_changed observer
       (snapshot) => {
         // upload in progress
         upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
         console.log(upload.progress);
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
         this.saveFileData(upload);
       }
     );
   }
   private saveFileData(upload: Upload) {
     this.db.list(`${this.basePath}/`).push(upload);
     console.log('File saved!: ' + upload.url);
   }
 }


