import { Component, OnInit } from '@angular/core';
import { UploadService } from '../servicios/upload.service';
import { UploadImgHotelesService } from '../servicios/upload-img-hoteles.service';
import { Upload } from '../models/upload';
import * as _ from 'lodash'; // to help loop over files more succinctly
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  files: FileList;
  upload: Upload;
  

  constructor(private uploadService: UploadService, private uploadHoteles:UploadImgHotelesService) { }

  handleFiles(event) {
    this.files = event.target.files;
    console.log(this.files);
  }

  uploadFiles() {
    const filesToUpload = this.files;
    const filesIdx = _.range(filesToUpload.length);
    _.each(filesIdx, (idx) => {
      this.upload = new Upload(filesToUpload[idx]);
      this.uploadService.uploadFile(this.upload);
    });
  }
}