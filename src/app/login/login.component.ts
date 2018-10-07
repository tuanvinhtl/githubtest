import { Component, OnInit } from '@angular/core';
import { WindowService } from '../services/window.service';

import * as firebase from 'firebase';
import { AuthenService } from '../services/authen.service';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  windowRef: any;
  phoneNumber: string;
  contry: string = "+84";
  verificationCode: string;
  user: any;
  veryCode: boolean = true;

  constructor(private win: WindowService, private auth: AuthenService) {
    firebase.initializeApp(environment.Initialize)
  }

  ngOnInit() {
    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

    this.windowRef.recaptchaVerifier.render()
  }

  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = this.contry + this.phoneNumber;

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        if (result) {
          this.veryCode = false;
        }
        this.windowRef.confirmationResult = result;
      })
      .catch(error => console.log(error));

  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {

        this.user = result.user;

      })
      .catch(error => console.log(error, "Incorrect code entered?"));
  }

}
