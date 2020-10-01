import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoginSuccessfull: boolean;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
  }

  userLogin(userName: string, userPassword: string): Observable<boolean> {

    const savedPassword = this.storage.get(userName);

    if (!!savedPassword) {
      if (savedPassword !== userPassword) {
        this.isLoginSuccessfull = false;
      } else {
        this.isLoginSuccessfull = true;
      }
    } else {
      this.isLoginSuccessfull = true;
      this.storage.set(userName, userPassword);
    }

    return of(this.isLoginSuccessfull);

  }
}
