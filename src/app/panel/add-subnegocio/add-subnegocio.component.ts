import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { CrudService } from '../../servicios/crud.service';
import { Habitacion } from '../../models/habitacion';
import { Experiencia } from '../../models/experiencia';
import { Plato } from '../../models/plato';

@Component({
  selector: 'app-add-subnegocio',
  templateUrl: './add-subnegocio.component.html',
  styleUrls: ['./add-subnegocio.component.scss']
})
export class AddSubnegocioComponent implements OnInit {
  idNegocio:any;
  constructor() { }

  ngOnInit() {
    this.idNegocio = sessionStorage.getItem('idSubnegocio');
  }



}
