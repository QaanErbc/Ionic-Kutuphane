import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { ApiUrl } from 'src/apiUrl';
import { Kitap, User } from './home/home.page';
import { LoadService } from './load.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private loadService: LoadService,
    private menuController: MenuController,
    private http: HttpClient,
    public userService: UserService
  ) { }
  apiUrl = ApiUrl
  user: User;
  emanetCount: number = 0;
  async ngOnInit() {
    await this.loadService.goster("İşlemler yapılıyor lütfen bekleyiniz");
    if (!this.user) {
      setTimeout(async () => {
        await this.loadService.gizle();
        this.router.navigateByUrl("/giris")
      }, 1000);
    } else {
      await this.loadService.gizle();
    }
  }

  goAllBooksPage() {
    this.router.navigateByUrl("/all-books");
    this.menuController.close("first")
  }
  goAddBookPage() {
    this.router.navigateByUrl("/add-book");
    this.menuController.close("first")
  }
  goMyBooksPage() {
    this.router.navigateByUrl("/my-books");
    this.menuController.close("first");
  }
  goAllTursPage() {
    this.router.navigateByUrl("/all-turler");
    this.menuController.close("first");
  }
  goAddTurPage() {
    this.router.navigateByUrl("/add-tur");
    this.menuController.close("first")
  }

  cikis() {
    this.loadService.goster("Çıkış yapılıyor lütfen bekleyiniz");
    setTimeout(() => {
      localStorage.removeItem("user");
      this.loadService.gizle();
      this.router.navigateByUrl("/giris");
      this.menuController.close("first")
    }, 1000);
  }
}
