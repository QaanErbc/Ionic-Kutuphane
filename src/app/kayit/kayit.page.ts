import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiUrl } from 'src/apiUrl';
import { LoadService } from '../load.service';

@Component({
  selector: 'app-kayit',
  templateUrl: './kayit.page.html',
  styleUrls: ['./kayit.page.scss'],
})
export class KayitPage implements OnInit {

  apiUrl = ApiUrl
  registerModel = {
    name: "", username: "", email: "", password: ""
  }
  constructor(
    private httpClient: HttpClient,
    private toastController: ToastController,
    private router: Router,
    private loadService: LoadService
  ) { }

  ngOnInit() {
  }

  kayitOl() {
    this.loadService.goster("Kayıt olunuyor lütfen bekleyiniz");
    let url = `${this.apiUrl}api/kayit`
    this.httpClient.post(url, this.registerModel).subscribe((response: string) => {
      this.presentToast(response)
      setTimeout(() => {
        this.loadService.gizle();
        this.router.navigateByUrl("/giris")
      }, 1000)
    }, responseErr => {
      this.loadService.gizle();
      this.presentToast(responseErr.error.error.text)
    })
  }

  async presentToast(mesaj: string) {
    const toast = await this.toastController.create({
      message: mesaj,
      duration: 2000,
    });
    toast.present();
  }
}
