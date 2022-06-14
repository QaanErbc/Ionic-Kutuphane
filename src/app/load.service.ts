import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  constructor(
    private laodingController: LoadingController
  ) { }

  async goster(mesaj: string) {
    const yukle = await this.laodingController.create({
      message:mesaj
    })
    await yukle.present();
  }
  async gizle() {
    await this.laodingController.dismiss();
  }
}
