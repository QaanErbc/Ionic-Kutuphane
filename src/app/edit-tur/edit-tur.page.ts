import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiUrl } from 'src/apiUrl';
import { Tur } from '../home/home.page';

@Component({
  selector: 'app-edit-tur',
  templateUrl: './edit-tur.page.html',
  styleUrls: ['./edit-tur.page.scss'],
})
export class EditTurPage implements OnInit {

  @Input() tur: Tur;
  editForm: FormGroup;
  apiUrl = ApiUrl
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastController: ToastController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.editForm = this.fb.group({
      id: [this.tur.id],
      ad: [this.tur.ad, [Validators.required, Validators.maxLength(20)]]
    })
  }


  duzenle() {
    if (this.editForm.valid) {
      let newUrl = `${this.apiUrl}api/turduzenle`
      this.http.post<string>(newUrl, this.editForm.value).subscribe(async response => {
        this.presentToast(response);
        await this.modalController.dismiss();
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
