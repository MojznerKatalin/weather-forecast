import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: string;
  userPassword: string;
  isAccessDenied: boolean;
  @Output() isUserLoggedIn = new EventEmitter<boolean>();
  @Output() user = new EventEmitter<string>();

  constructor(
    private translateService: TranslateService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  userLogin() {
    this.loginService.userLogin(this.userName, this.userPassword).subscribe(result => {
      this.isAccessDenied = !result;
      this.isUserLoggedIn.emit(result);
      if (result) { this.user.emit(this.userName); }
    });
  }
}
