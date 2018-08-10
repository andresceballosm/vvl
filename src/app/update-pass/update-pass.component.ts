import { Component, OnInit } from '@angular/core';
import {AuthService } from '../servicios/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module';


@Component({ 
  selector: 'app-update-pass',
  templateUrl: './update-pass.component.html',
  styleUrls: ['./update-pass.component.scss']
})
export class UpdatePassComponent implements OnInit {
  public email: string;
  public auth:string;
  constructor(
    public authService: AuthService,
    public router: Router,
    public flashMensaje: FlashMessagesService
  ) { }

  ngOnInit() {
  }
  updatePass(){
    const auth = firebase.auth();
    const emailAddress = this.email;

   

    auth.sendPasswordResetEmail(emailAddress).then((res) => {
      this.flashMensaje.show('Contraseña enviada a su correo electrónico',
      {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/login']);
    }).catch( 
      (error) => {
      if(error.code=='auth/user-not-found'){
        this.flashMensaje.show('No hay registro de usuario correspondiente a este identificador. El usuario puede haber sido eliminado',
        {cssClass: 'alert-danger', timeout: 5000});
      }else{
        this.flashMensaje.show('Se generó un error, es posible que el correo electrónico no sea válido',
        {cssClass: 'alert-danger', timeout: 5000});
      }
    });
  }


}
