import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import * as firebase from 'firebase';
import {Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages/module';
import { AngularFireAuth } from 'angularfire2/auth';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Register } from '../models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: Register = new Register();
  hide:any;
  public email: string;
  public password: string;
  constructor(
    public authService: AuthService,
    public router: Router,
    public flashMensaje: FlashMessagesService
  ) { }

  ngOnInit() {
  }
  onSubmitAddUser() {
    console.log(this.email, 'pass', this.password);
    this.authService.registerUser(this.email,this.password)
    .then((res) => {
      let user:any = firebase.auth().currentUser;
      console.log(user.email);
      localStorage.setItem('user', user.email);
      user.sendEmailVerification().then(
        (success) => {
          this.flashMensaje.show('Por favor confirmar su registro en el correo electrónico',
          {cssClass: 'alert-success', timeout: 4000});
          this.router.navigate(['/register2']);} 
      ).catch(
        (err) => {
          this.flashMensaje.show(err,
          {cssClass: 'alert-danger', timeout: 4000});
        }
      )
    /* this.flashMensaje.show('Usuario creado correctamente.',
     {cssClass: 'alert-success', timeout: 4000});
     this.router.navigate(['/user-profile']);*/
    }).catch( (err) => {
      console.log(err);
      if(err.code=='auth/email-already-in-use'){
        this.flashMensaje.show('El correo electrónico ya esta registrado',
        {cssClass: 'alert-danger', timeout: 4000});
      }else if(err.code=='auth/invalid-email'){
        this.flashMensaje.show('Correo electrónico con formato inválido',
        {cssClass: 'alert-danger', timeout: 4000});
      }else if(err.code=='auth/weak-password'){
        this.flashMensaje.show('La contraseña debe tener al menos 6 caracteres',
        {cssClass: 'alert-danger', timeout: 4000});
      }else if(err.code=='auth/argument-error'){
        this.flashMensaje.show('Correo electrónico o contraseña inválidos',
        {cssClass: 'alert-danger', timeout: 4000});
      }else{
        this.flashMensaje.show(err.message,
        {cssClass: 'alert-danger', timeout: 4000});
      }    
    });
  }
    onClickGoogleLogin() {
   this.authService.loginGoogle()
    .then((res) => {
        localStorage.setItem('user', res.user.email);
        this.router.navigate(['/user-profile']);
    }).catch( err => console.log(err.message));
  }

  onClickFacebookLogin() {
    this.authService.loginFacebook()
      .then((res) => {
        localStorage.setItem('user', res.user.email);
        this.router.navigate(['/user-profile']);
      }).catch( err => console.log(err.message));
  }

}