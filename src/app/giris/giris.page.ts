import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiUrl } from 'src/apiUrl';
import { User } from '../home/home.page';
import { LoadService } from '../load.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-giris',
  templateUrl: './giris.page.html',
  styleUrls: ['./giris.page.scss'],
})
export class GirisPage implements OnInit {

  apiUrl = ApiUrl
  loginModel = { username: "kaan", password: "123456" }
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastController: ToastController,
    private loadService: LoadService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  girisYap() {
    this.loadService.goster("Giriş yapılıyor lütfen bekleyiniz");
    let url = `${this.apiUrl}api/giris`
    this.httpClient.post(url, this.loginModel).subscribe(response => {
      this.presentToast("Giriş Başarılı")
      localStorage.setItem("user", JSON.stringify(response))
      this.userService.user = response as User;
      this.userService.calculateEmanetCount();
      this.userService.isAdmin = (response as User)?.Admin == 1 ? true : false;
      setTimeout(() => {
        this.loadService.gizle();
        this.router.navigateByUrl("/home")
      }, 1000);
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
