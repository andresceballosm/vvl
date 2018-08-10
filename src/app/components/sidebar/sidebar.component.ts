import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../servicios/auth.service'

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/login', title: 'Inicio de sesión',  icon:'vpn_key', class: '' },
    { path: '/user-profile', title: 'Perfil',  icon:'person', class: '' },
    { path: '/lenap', title: 'Panel',  icon:'content_paste', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },  
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    public isLogin: boolean;
    public nombreUsuario: string;
    public emailUsuario: string;
    public fotoUsuario: string;
    public phoneUsuario: string;
    menuItems: any[];

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.authService.getAuth().subscribe( auth => {
        if (auth) {
          this.isLogin = true;
          this.nombreUsuario = auth.displayName;
          this.emailUsuario = auth.email;
          this.phoneUsuario = auth.phoneNumber;
          this.fotoUsuario = auth.photoURL;
        } else {
          this.isLogin = false;
        }
    });
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  onClickLogout() {
    this.authService.logout();
  }

  view(){

  }
}
