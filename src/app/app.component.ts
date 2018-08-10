import { Component} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {  LoadService } from './servicios/load.service';
declare const $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( public LoadService:LoadService) {}
  isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;
  }; 
}





