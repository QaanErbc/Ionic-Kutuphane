import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ApiUrl } from 'src/apiUrl';
import { Kitap, Tur } from '../home/home.page';
import { ImageUploadService } from '../image-upload.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.page.html',
  styleUrls: ['./add-book.page.scss'],
})
export class AddBookPage implements OnInit {

  imageName: string = "";
  apiUrl = ApiUrl
  addForm: FormGroup;
  turler: Tur[];
  constructor(
    private fb: FormBuilder,
    private imageUploadService: ImageUploadService,
    private http: HttpClient,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.getTurler();
    this.createForm();
  }

  createForm() {
    this.addForm = this.fb.group({
      ad: ["", [Validators.required, Validators.maxLength(20)]],
      yazar: ["", [Validators.required, Validators.maxLength(50)]],
      tur: ["", [Validators.required]],
      isbn: ["", [Validators.required]],
      resim: ["", [Validators.required]]
    })
  }
  getTurler(){
    let newUrl = `${this.apiUrl}api/turler`;
    this.http.get<Tur[]>(newUrl).subscribe(response=>{
      this.turler = response;
    })
  }
  async selectImage() {
    await this.imageUploadService.selectImage().then(() => {
      this.imageName = this.imageUploadService.image.name
    })
  }
  ekle() {
    if (this.addForm.valid && this.imageUploadService.image) {
      let kitapModel: Kitap = this.addForm.value;
      let newUrl = `${this.apiUrl}api/kitapekle`
      this.imageUploadService.startUpload();
      this.http.post<string>(newUrl, kitapModel).subscribe(response => {
        this.presentToast(response)
      },responseErr=>{

      })
    }
  }

  async presentToast(mesaj: string) {
    const toast = await this.toastController.create({
      message: mesaj,
      duration: 2000,
    });
    toast.present();
  }

}
