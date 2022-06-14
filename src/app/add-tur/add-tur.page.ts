import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiUrl } from 'src/apiUrl';

@Component({
  selector: 'app-add-tur',
  templateUrl: './add-tur.page.html',
  styleUrls: ['./add-tur.page.scss'],
})
export class AddTurPage implements OnInit {
  apiUrl = ApiUrl
  addForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addForm = this.fb.group({
      ad: ["", [Validators.required, Validators.maxLength(20)]]
    })
  }

  ekle() {
    if (this.addForm.valid) {
      let newUrl = `${this.apiUrl}api/turekle`
      this.http.post<string>(newUrl, this.addForm.value).subscribe(response => {
        this.presentToast(response);
        this.router.navigateByUrl("/all-turler")
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
