import { TestBed, inject } from '@angular/core/testing';

import { UploadImgHotelesService } from './upload-img-hoteles.service';

describe('UploadImgHotelesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadImgHotelesService]
    });
  });

  it('should be created', inject([UploadImgHotelesService], (service: UploadImgHotelesService) => {
    expect(service).toBeTruthy();
  }));
});
