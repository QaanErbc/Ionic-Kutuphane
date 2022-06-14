import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { ApiUrl } from 'src/apiUrl';
import { LoadService } from '../load.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  books: Kitap[];
  apiUrl = ApiUrl;
  isAdmin: boolean = false;
  emanetCount: number = 0;
  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private httpClient: HttpClient,
    private toastController: ToastController,
    private alertController: AlertController,
    private menu: MenuController,
    private http: HttpClient,
    private menuController: MenuController,
    private loadService: LoadService,
    private userService: UserService
  ) { }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  ngOnInit() {
    this.getBooks();
  }
  getBooks() {
    let url = `${this.apiUrl}api/kitaplar`
    this.httpClient.get<Kitap[]>(url).subscribe(response => {
      this.books = response;
    })
  }
  async presentToast(mesaj: string) {
    const toast = await this.toastController.create({
      message: mesaj,
      duration: 2000,
    });
    toast.present();
  }
  getImageUrl(kitap: Kitap) {
    if (kitap.Resim.endsWith(".jpeg")) {
      return `${this.apiUrl}/src/routes/images/${kitap.Resim}`;
    } else {
      return kitap.Resim;
    }
  }
  async kirala(kitap: Kitap) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Kiralanıyor',
      message: `${kitap.Ad} Bu kitabı kiralamak istediğinizden emin misiniz? `,
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            this.presentToast("İşlem iptal edildi")
          }
        }, {
          text: 'Onaylıyorum',
          id: 'confirm-button',
          handler: () => {
            let url = `${this.apiUrl}api/emanetekle`
            this.httpClient.post<string>(url, { kullaniciId: this.userService.user.Id, kitapId: kitap.Id }).subscribe(response => {
              this.presentToast(response);
              this.userService.calculateEmanetCount();
              kitap.Durum = "Kiralandı"
            })
          }
        }
      ]
    });
    await alert.present();
  }
}
export interface Kitap {
  Id: number;
  Ad: string;
  Yazar: string;
  Resim: string;
  Tur: string;
  Durum: string;
  Isbn: string;
  TurId: number;
}
export interface User {
  Id: number;
  email: string;
  name: string;
  username: string;
  Admin: number;
}
export interface Tur {
  id: number;
  ad: string;
}
