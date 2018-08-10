import { Component, OnInit } from '@angular/core';
import {AuthService } from '../servicios/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  user:any;

  constructor(
    public authService: AuthService,
    public router: Router,
    public flashMensaje: FlashMessagesService,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  onSubmitLogin() {
    this.authService.loginEmail(this.email, this.password)
    .then( (res) => {
      this.flashMensaje.show('Usuario logado correctamente.',
      {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/dashboard']);
    }).catch((err) => {
       this.flashMensaje.show(err.message,
       {cssClass: 'alert-danger', timeout: 4000});
      this.router.navigate(['/login']);
    });
    this.authService.getAuth().subscribe( auth => {
      if (auth) {
        this.user = auth.email;
        localStorage.setItem('user', this.user);
      } 
    })
  }

  onClickGoogleLogin() {
   this.authService.loginGoogle()
    .then((res) => {
        this.router.navigate(['/dashboard']);
    }).catch( err => console.log(err.message));
    this.authService.getAuth().subscribe( auth => {
      if (auth) {
        this.user = auth.email;
        localStorage.setItem('user', this.user);
      } 
    })
  }

  onClickFacebookLogin() {
    this.authService.loginFacebook()
      .then((res) => {
          console.log(res);
          this.router.navigate(['/dashboard']);
      }).catch( err => console.log(err.message));
      this.authService.getAuth().subscribe( auth => {
        if (auth) {
          this.user = auth.email;
          localStorage.setItem('user', this.user);
        } 
      })
  }

  updatePass(){
    this.router.navigate(['/update-pass']);
  }
    goRegister(){
    this.router.navigate(['/register']);
  }

}