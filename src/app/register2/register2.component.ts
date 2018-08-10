import { Component, OnInit } from '@angular/core';
import {AuthService } from '../servicios/auth.service';
import { NgForm } from '@angular/forms';
import { CrudService } from '../servicios/crud.service';
import * as firebase from 'firebase';
import { Usuario } from '../models/usuario';
import {FlashMessagesService} from 'angular2-flash-messages/module';
import {Router } from '@angular/router';

@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.scss']
})
export class Register2Component implements OnInit {
  usuario: Usuario = new Usuario();
  array=[];
  submitted = false;
  typeUser = ['Cliente', 'Proveedor'];
    //selectedValue = null;
  public nombre: string;
  public tipoUsuario: string;
  public telefono: string;

  public isProveedor: boolean;
  public isLogin: boolean;
  public nombreUsuario: string;
  public emailUsuario: string;
  public fotoUsuario: string;
  public phoneUsuario: string;
  constructor(public authService: AuthService,
              private crudService: CrudService,
              public flashMensaje: FlashMessagesService,
              public router: Router ) { }

  ngOnInit() {
        this.authService.getAuth().subscribe( auth => {
      if (auth) {
        this.isLogin = true;
        this.nombreUsuario = auth.displayName;
        this.emailUsuario = auth.email;
        this.fotoUsuario = auth.photoURL;
        this.phoneUsuario = auth.phoneNumber;
      } else {
        this.isLogin = false;
      }
    });
  }
//Registra usuario en la base de datos general
onSubmitAddUsuario(){
  this.usuario.email=this.emailUsuario;
  this.usuario.type='Usuario';
  this.crudService.insertUsuario(this.usuario)
  .then((res) => {
    let user:any = firebase.auth().currentUser;
    user.sendEmailVerification().then(
      (success) => {
        this.flashMensaje.show('Gracias por registrarte '+this.usuario.nombre+' Bienvenido...',
        {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['/dashboard'])
      }).catch( (err) => {
        alert('errrorr');
      })
    })
}

onSubmit(form: NgForm) {
  this.submitted = true;
  this.onSubmitAddUsuario();
};

}
