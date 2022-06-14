import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { LoadingController, Platform } from '@ionic/angular';
import { ApiUrl } from 'src/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  image: LocalFile;
  error: any;
  url = ApiUrl
  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private http: HttpClient
  ) { }
  async selectImage() {
    const image = await Camera.getPhoto({
      quality:50,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });
    if (image) {
      const base46Data = await this.readAsBase64(image);
      this.image = {
        data: `${base46Data}`,
        name: `${(new Date()).getTime()}.jpeg`,
        path: ""
      }
    }
  }
  async readAsBase64(photo: Photo) {
    if (this.platform.is("hybrid")) {
      const file = await Filesystem.readFile({
        path: photo.path
      })
      return file.data;
    }
    else {
      const response = await fetch(photo.webPath);
      const blob = await response.blob();
      return await this.convertBlobToBase64(blob) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  })

  async startUpload() {
    const response = await fetch(this.image.data);
    let url = `${this.url}src/routes/upload.php`;
    const blob = await response.blob();
    let formData = new FormData();
    formData.append("file", blob, this.image.name);
    this.http.post(url, formData).subscribe(response => {

    }, err => {

    })
  }
}

export interface LocalFile {
  name: string;
  path: string;
  data: string;
}
export const IMAGE_DIR = "stored-images";
