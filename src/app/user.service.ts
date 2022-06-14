import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/apiUrl';
import { Kitap, User } from './home/home.page';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = ApiUrl;
  user: User;
  emanetCount: number = 0;
  isAdmin: boolean = false;
  constructor(
    private http: HttpClient
  ) { }

  calculateEmanetCount() {
    let newUrl = `${this.apiUrl}api/emanetlerim/${this.user.Id}`;
    this.http.get<Kitap[]>(newUrl).subscribe(emanetler => {
      this.emanetCount = emanetler.length;
      console.log(emanetler)
    })
  }
}
