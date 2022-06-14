import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiUrl } from 'src/apiUrl';
import { Kitap, User } from '../home/home.page';
import { UserService } from '../user.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.page.html',
  styleUrls: ['./my-books.page.scss'],
})
export class MyBooksPage implements OnInit {

  apiUrl = ApiUrl
  user: User;
  url = ApiUrl
  books: Kitap[] = [];
  constructor(
    public http: HttpClient,
    public toastController: ToastController,
    public alertController: AlertController,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getMyBooks();
  }

  getMyBooks() {
    let newUrl = `${this.url}api/emanetlerim/${this.user.Id}`;
    this.http.get<Kitap[]>(newUrl).subscribe(response => {
      this.books = response
      console.log(response)
    })
  }
  getImageUrl(kitap: Kitap) {
    if (kitap.Resim.endsWith(".jpeg")) {
      return `${this.apiUrl}/src/routes/images/${kitap.Resim}`;
    } else {
      return kitap.Resim;
    }
  }

  async ver(kitap: Kitap) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Kiralanıyor',
      message: `${kitap.Ad} Bu kitabı iade etmek istediğinizden emin misiniz? `,
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
            let newUrl = `${this.url}api/emanetver`;
            this.http.post<string>(newUrl, {
              kitapId: kitap.Id,
              kullaniciId: this.user.Id
            }).subscribe(response => {
              this.presentToast(response);
              this.getMyBooks();
              this.userService.calculateEmanetCount();
            })
          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast(mesaj: string) {
    const toast = await this.toastController.create({
      message: mesaj,
      duration: 2000,
    });
    toast.present();
  }

}
