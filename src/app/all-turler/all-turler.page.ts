import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ApiUrl } from 'src/apiUrl';
import { EditTurPage } from '../edit-tur/edit-tur.page';
import { Tur } from '../home/home.page';

@Component({
  selector: 'app-all-turler',
  templateUrl: './all-turler.page.html',
  styleUrls: ['./all-turler.page.scss'],
})
export class AllTurlerPage implements OnInit {

  apiUrl = ApiUrl;
  turler: Tur[] = [];
  constructor(
    private http: HttpClient,
    private modalController: ModalController,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.getTurler();
  }

  getTurler() {
    let newUrl = `${this.apiUrl}api/turler`;
    this.http.get<Tur[]>(newUrl).subscribe(response => {
      this.turler = response;
    })
  }

  async editTur(tur: Tur) {
    const modal = await this.modalController.create({
      component: EditTurPage,
      componentProps: { tur: tur }
    })
    modal.onDidDismiss().then(() => {
      this.getTurler();
    })
    return await modal.present();
  }

  async deleteTur(tur: Tur) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Kiralanıyor',
      message: `${tur.ad} Bu Türü silmek istediğinizden emin misiniz? `,
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
            let newUrl = `${this.apiUrl}api/tursil/${tur.id}`;
            this.http.delete<string>(newUrl).subscribe(response => {
              this.presentToast(response);
              this.getTurler();
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
