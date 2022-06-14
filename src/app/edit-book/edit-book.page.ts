import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiUrl } from 'src/apiUrl';
import { Kitap, Tur } from '../home/home.page';
import { ImageUploadService } from '../image-upload.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.page.html',
  styleUrls: ['./edit-book.page.scss'],
})
export class EditBookPage implements OnInit {
  @Input() book: Kitap
  imageName: string;
  apiUrl = ApiUrl
  editForm: FormGroup;
  turler: Tur[]
  constructor(
    public fb: FormBuilder,
    public http: HttpClient,
    public imageUploadService: ImageUploadService,
    public toastController: ToastController,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.imageUploadService.image = undefined;
    this.imageName = this.book.Resim;
    this.createForm();
    this.getTurler();
  }
  getTurler() {
    let newUrl = `${this.apiUrl}api/turler`;
    this.http.get<Tur[]>(newUrl).subscribe(response => {
      this.turler = response;
    })
  }
  createForm() {
    this.editForm = this.fb.group({
      id: [this.book.Id],
      ad: [this.book.Ad, [Validators.required, Validators.maxLength(20)]],
      yazar: [this.book.Yazar, [Validators.required, Validators.maxLength(50)]],
      tur: [this.book.TurId, [Validators.required]],
      isbn: [this.book.Isbn, [Validators.required]],
      resim: [this.book.Isbn, [Validators.required]]
    })
  }
  async selectImage() {
    await this.imageUploadService.selectImage().then(() => {
      this.imageName = this.imageUploadService.image.name
    })
  }
  duzenle() {
    if (this.editForm.valid) {
      let kitapModel: Kitap = this.editForm.value;
      let newUrl = `${this.apiUrl}api/kitapduzenle`
      if(this.imageUploadService.image){
        this.imageUploadService.startUpload();
      }
      this.http.post<string>(newUrl, kitapModel).subscribe(async response => {
        this.presentToast(response)
        console.log(response)
        await this.modalController.dismiss();
      }, responseErr => {
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

  async close() {
    await this.modalController.dismiss();
  }

}
