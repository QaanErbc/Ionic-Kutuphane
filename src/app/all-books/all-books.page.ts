import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ApiUrl } from 'src/apiUrl';
import { EditBookPage } from '../edit-book/edit-book.page';
import { Kitap } from '../home/home.page';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.page.html',
  styleUrls: ['./all-books.page.scss'],
})
export class AllBooksPage implements OnInit {

  apiUrl = ApiUrl
  books: Kitap[] = []
  constructor(
    private httpClient: HttpClient,
    private modalController: ModalController,
    private toastController: ToastController,
    private alertController: AlertController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    let url = `${this.apiUrl}api/kitaplar`
    this.httpClient.get<Kitap[]>(url).subscribe(response => {
      this.books = response;
    })
  }
  getImageUrl(kitap: Kitap) {
    if (kitap.Resim.endsWith(".jpeg")) {
      return `${this.apiUrl}/src/routes/images/${kitap.Resim}`;
    } else {
      return kitap.Resim;
    }
  }

  async duzenle(book: Kitap) {
    const modal = await this.modalController.create({
      component: EditBookPage,
      componentProps: { book: book }
    });
    modal.onDidDismiss().then(() => {
      this.getBooks();
    })
    return await modal.present();
  }
  async sil(book: Kitap) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Kiralanıyor',
      message: `${book.Ad} Bu Kitabı silmek istediğinizden emin misiniz? `,
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
            let newUrl = `${this.apiUrl}api/kitapsil/${book.Id}`;
            this.http.delete<string>(newUrl).subscribe(response => {
              this.presentToast(response);
              this.getBooks();
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
