import { Component,  Output, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import * as Chartist from 'chartist';
import { CrudService } from '../../../servicios/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Reserva} from '../../../models/reserva';
import { ISubscription } from 'rxjs/Subscription';
import { MyDialogComponent } from '../../../dialogos/my-dialog/my-dialog.component'
import { DialogoAlertaComponent } from '../../../dialogos/dialogo-alerta/dialogo-alerta.component';
import { Habitacion } from '../../../models/habitacion';
import { MatDialog, MatCard, MatButton, MatCardTitle, MatDatepicker } from '@angular/material'
import { GlobalsService } from '../../../servicios/globals.service';
import { UICarouselModule } from 'ui-carousel';
import {  LoadService } from '../../../servicios/load.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {FlashMessagesService} from 'angular2-flash-messages/module';
import * as moment from 'moment/moment';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.scss']
})
export class HabitacionComponent implements OnInit {
  id: number;
  private sub: any;
  currentDate:any;
  getHabitacion:any;
  dialogResult='';
  getImagesRoom:any;
  reserva: Reserva = new Reserva();
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  fechasFilter;
  items;
  precio_reserva:any
  habitacion:any;
  inputPrecio:boolean = true;
  inputReserva:boolean = false;
  adminNegocio:any;
  negocio:any;
  idHabitacion:any;
  subnegocio:any
  negocioName:any;
  isTempAlta:boolean = false;
  temporadas:any;
  salesAllDates:any;
  salesExactDates:any;
  sales:any;
  dateStart:any;
  precio_tempAlta:any;
  precio_tempBaja:any;
  dateFinish:any;
  precio_noche:any;
  comision:any;
  moneda:any;
  cancelacion:any;
  total:any;
  tablaPrecio:boolean;
  tempAlta:string='false';
  panelOpenState = false;
  dias:any;
  fecha_inicio:any;
  idNegocioReserva;
  fecha_fin:any;
  dif:any;
  isdisabled:boolean=false;
  showSpinner:boolean=true;
  messageresponse:any;
  constructor(  private crudService: CrudService, public dialog : MatDialog,
    public router: Router, public LoadService : LoadService,private globals:GlobalsService,
    public flashMensaje: FlashMessagesService,private route: ActivatedRoute) { }
  
    myFilter = (d: Date): Boolean => {
    let fecha_ini;
    let items = [];
    let dates;
    this.fechasFilter = d.getMonth()+1+"/"+d.getDate()+"/"+d.getFullYear();
    const mes = d.getMonth()+1;
    const año = d.getFullYear();
    for (var re in this.items){
      dates = new Date(this.items[re].fecha);
      if(dates.getFullYear()==año){
        if(dates.getMonth()+1==mes){
          fecha_ini = dates.getMonth()+1+"/"+dates.getDate()+"/"+dates.getFullYear();
          items.push({fecha:fecha_ini});
        }
      }
    } 
    let fechas = items;
    let reserva1;let reserva2;let reserva3;let reserva4;let reserva5;let reserva6;let reserva7;let reserva8;let reserva9;let reserva10;
    let reserva11;let reserva12;let reserva13;let reserva14;let reserva15;let reserva16;let reserva17;let reserva18;let reserva19;let reserva20;
    let reserva21;let reserva22;let reserva23;let reserva24;let reserva25;let reserva26;let reserva27;let reserva28;let reserva29;let reserva30;
    let reserva31;
    for (var i = 0; i < fechas.length; i++){
      if(fechas[0]!=undefined){reserva1=fechas[0].fecha}if(fechas[1]!=undefined){reserva2=fechas[1].fecha;}if(fechas[2]!=undefined){reserva3=fechas[2].fecha;}
      if(fechas[3]!=undefined){reserva4=fechas[3].fecha}if(fechas[4]!=undefined){reserva5=fechas[4].fecha;}if(fechas[5]!=undefined){reserva6=fechas[5].fecha;}
      if(fechas[6]!=undefined){reserva7=fechas[6].fecha}if(fechas[7]!=undefined){reserva8=fechas[7].fecha}if(fechas[8]!=undefined){reserva9=fechas[8].fecha;}
      if(fechas[9]!=undefined){reserva10=fechas[9].fecha}if(fechas[10]!=undefined){reserva11=fechas[10].fecha}if(fechas[11]!=undefined){reserva12=fechas[11].fecha}
      if(fechas[12]!=undefined){reserva13=fechas[12].fecha}if(fechas[13]!=undefined){reserva14=fechas[13].fecha;}if(fechas[14]!=undefined){reserva15=fechas[14].fecha}
      if(fechas[15]!=undefined){reserva16=fechas[15].fecha}if(fechas[16]!=undefined){reserva17=fechas[16].fecha;}if(fechas[17]!=undefined){reserva18=fechas[17].fecha}
      if(fechas[18]!=undefined){reserva19=fechas[18].fecha}if(fechas[19]!=undefined){reserva20=fechas[19].fecha}if(fechas[20]!=undefined){reserva21=fechas[20].fecha}
      if(fechas[21]!=undefined){reserva22=fechas[21].fecha}if(fechas[22]!=undefined){reserva23=fechas[22].fecha}if(fechas[23]!=undefined){reserva24=fechas[23].fecha}
      if(fechas[24]!=undefined){reserva25=fechas[24].fecha}if(fechas[25]!=undefined){reserva26=fechas[25].fecha;}if(fechas[26]!=undefined){reserva27=fechas[26].fecha;}
      if(fechas[27]!=undefined){reserva28=fechas[27].fecha}if(fechas[28]!=undefined){reserva29=fechas[28].fecha;}if(fechas[29]!=undefined){reserva30=fechas[29].fecha;}
      if(fechas[30]!=undefined){reserva31=fechas[30].fecha}
    }
    return this.fechasFilter != reserva1 && this.fechasFilter != reserva2 && this.fechasFilter != reserva3 && this.fechasFilter != reserva4
    && this.fechasFilter != reserva5 && this.fechasFilter != reserva6 && this.fechasFilter != reserva7 && this.fechasFilter != reserva8 && this.fechasFilter != reserva9
    && this.fechasFilter != reserva10 && this.fechasFilter != reserva11 && this.fechasFilter != reserva12 && this.fechasFilter != reserva13 && this.fechasFilter != reserva14
    && this.fechasFilter != reserva15 && this.fechasFilter != reserva16 && this.fechasFilter != reserva17 && this.fechasFilter != reserva18 && this.fechasFilter != reserva19
    && this.fechasFilter != reserva20 && this.fechasFilter != reserva21 && this.fechasFilter != reserva22 && this.fechasFilter != reserva23 && this.fechasFilter != reserva24
    && this.fechasFilter != reserva25 && this.fechasFilter != reserva26 && this.fechasFilter != reserva27 && this.fechasFilter != reserva28 && this.fechasFilter != reserva29
    && this.fechasFilter != reserva30 && this.fechasFilter != reserva31;
 
  }
  ngOnInit() {
    this.getHabitacion = JSON.parse( sessionStorage.getItem('habitacion'));
    this.getImagesRoom = JSON.parse( sessionStorage.getItem('roomImages'));
    this.getReservas();
    this.showSpinner=false;
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getReservas(){
    for ( var h in this.getHabitacion){
      this.idNegocioReserva = this.getHabitacion[h].idHabitacion;
    }
    let reserva = [];
    this.crudService.getReservasForNegocio(this.idNegocioReserva)
    .then(function(snapshot){
      let reservas = snapshot.val(); 
      for (var re in reservas){
        let reservaObj = reservas[re].fechas
        for(var ri in reservaObj){
          reserva.push({fecha:reservaObj[ri]})
        }
      }  
    })
    this.items = reserva;
  }
  calculatePrecio(){
    this.showSpinner==true;
    this.inputPrecio = false;
    this.inputReserva=true;
    this.dateStart = new Date(this.fecha_inicio);
    this.dateFinish = new Date(this.fecha_fin);
    this.negocio = JSON.parse( sessionStorage.getItem('negocio'));
    this.adminNegocio = this.negocio.administrador;
    this.negocioName = this.negocio.nombre;
    let tempAlta=[];
    this.temporadas = this.crudService.getTempAltaList(this.adminNegocio)
    .then(function(snapshot){
      let temps = snapshot.val(); 
      for ( var e in temps){
        tempAlta.push({fecha_inicio:temps[e].fecha_inicio,fecha_fin:temps[e].fecha_fin})
      }
    }).then(() => this.salesList(tempAlta))
  }
  salesList(temps){
    for ( var e in temps){
      let tempInicio = new Date (temps[e].fecha_inicio);
      let tempFin = new Date (temps[e].fecha_fin);
      if(this.dateStart >= tempInicio && tempFin >= this.dateStart ){
        this.tempAlta = 'true';
      }else if (this.dateFinish <= tempFin && this.dateFinish >= tempInicio ){
        this.tempAlta = 'true';
      }
    }
    sessionStorage.setItem('tempAlta',this.tempAlta)
    this.habitacion = JSON.parse( sessionStorage.getItem('habitacion'));
    for (var r in this.habitacion){
      this.idHabitacion = this.habitacion[r].idHabitacion;
      this.subnegocio = this.habitacion[r].nombre;
    }
    let salesObj = [];
    this.sales = this.crudService.getSalesList(this.idHabitacion)
    .then(function(snapshot){
      let temps = snapshot.val(); 
      for ( var e in temps){
        salesObj.push({type:temps[e].type,fecha_inicio:temps[e].fecha_inicio,fecha_fin:temps[e].fecha_fin,percent:temps[e].percent})
      }
    }).then(() =>this.cotizacion(salesObj)).catch(()=>console.log('errorr no existe promocion'))
  }

  cotizacion(sales){
    this.tablaPrecio==true;
    for (var h in this.habitacion){
      this.precio_tempAlta =  this.habitacion[h].precio_noche_talta;
      this.precio_tempBaja =  this.habitacion[h].precio_noche_tbaja;
      this.moneda = this.habitacion[h].moneda;
    }
    var MILISENGUNDOS_POR_DIA = 1000 * 60 * 60 * 24;
    function diferenciaEntreDiasEnDias(a, b){
      var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

      return Math.floor((utc2 - utc1) / MILISENGUNDOS_POR_DIA);
    }
    this.dias = diferenciaEntreDiasEnDias(this.dateStart, this.dateFinish);
    for ( var e in sales){
      if(sales[e].type == 'Fechas exactas'){
        let saleInicio = new Date (sales[e].fecha_inicio);
        let saleFin = new Date (sales[e].fecha_fin);
        if(this.dateStart >= saleInicio && saleFin >= this.dateStart ){
          this.salesExactDates = sales[e].percent;
        }else if (this.dateFinish <= saleFin && this.dateFinish >= saleInicio ){
          this.salesExactDates = sales[e].percent;
        }
      }else if (sales[e].type == 'Cualquier fecha'){
        this.salesAllDates = sales[e].percent;
      }
    }
    let isTempAlta = sessionStorage.getItem('tempAlta');
    if(isTempAlta == 'true'){
      if(this.salesExactDates!=undefined){
        let resta = 100-this.salesExactDates;
        let percent = resta/100 ;
        let precio = this.precio_tempAlta * this.dias;
        this.precio_reserva = Math.round( precio * percent);
        this.precio_noche = this.precio_tempAlta;
        this.comision = this.precio_reserva * 0.1;
        this.total = this.precio_reserva + this.comision;
      }else if(this.salesAllDates!=undefined){
        let resta = 100-this.salesAllDates;
        let percent = resta/100 ;
        let precio = this.precio_tempAlta * this.dias;
        this.precio_reserva = Math.round( precio * percent);
        this.precio_noche = this.precio_tempAlta;
        this.comision = this.precio_reserva * 0.1;
        this.total = this.precio_reserva + this.comision;
      }else{
        this.precio_reserva = this.precio_tempAlta * this.dias;
        this.precio_noche = this.precio_tempAlta;
        this.comision = this.precio_reserva * 0.1;
        this.total = this.precio_reserva + this.comision;
      }
    }else{
      if(this.salesExactDates!=undefined){
        let resta = 100-this.salesExactDates;
        let percent = resta/100 ;
        let precio = this.precio_tempBaja * this.dias;
        this.precio_reserva = Math.round( precio * percent);
        this.precio_noche = this.precio_tempBaja;
        this.comision = this.precio_reserva * 0.1;
        this.total = this.precio_reserva + this.comision;
      }else if(this.salesAllDates!=undefined){
        let resta = 100-this.salesAllDates;
        let percent = resta/100 ;
        let precio = this.precio_tempBaja * this.dias;
        this.precio_reserva = Math.round( precio * percent);
        this.precio_noche = this.precio_tempBaja;
        this.comision = this.precio_reserva * 0.1;
        this.total = this.precio_reserva + this.comision;
      }else{
        this.precio_reserva = this.precio_tempBaja * this.dias;
        this.precio_noche = this.precio_tempBaja;
        this.comision = this.precio_reserva * 0.1;
        this.total = this.precio_reserva + this.comision;
      }
    }
    //this.showSpinner==false;
  }
  addPrereservacion(){
    this.reserva.precio = this.total;
    this.reserva.idNegocioreserva = this.idHabitacion;
    this.reserva.negocio = this.negocioName;
    this.reserva.subnegocio = this.subnegocio;
    this.reserva.cliente = localStorage.getItem('user');
    this.reserva.moneda = this.moneda;
    for(var ca in this.getHabitacion){
      this.reserva.cancelacion = this.getHabitacion[ca].cancelacion;
    }
    //this.cancelacion = this.getHabitacion.cancelacion;
    //this.reserva.cancelacion = this.cancelacion;
    console.log(this.reserva.cancelacion);
    this.reserva.estado = 'pendiente';
    this.reserva.adminReserva = this.adminNegocio
    let mesFinish=this.dateFinish.getMonth() + 1;
    let mesStart = this.dateStart.getMonth() + 1;
    this.reserva.fecha_inicio = this.dateStart.getFullYear()+"-"+mesStart+"-"+this.dateStart.getDate();
    this.reserva.fecha_fin = this.dateFinish.getFullYear()+"-"+mesFinish+"-"+this.dateFinish.getDate();
    var dateArray=new Array();
    this.currentDate = this.dateStart;
    let stopDate = this.dateFinish;
    while (this.currentDate<=stopDate){
      dateArray.push(new Date(this.currentDate));
      this.currentDate.setDate(this.currentDate.getDate()+1);
    }
    let fechas = JSON.stringify(dateArray);
    this.reserva.fechas = JSON.parse(fechas);
    console.log(dateArray);
    console.log(this.reserva);
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que su pre-reservación es correcta.'
    }); 
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        this.isdisabled=true;
        this.crudService.insertPreserva(this.reserva)
        .then(
          (success) => {
            this.flashMensaje.show('Se envio de manera exitosa la pre-reservación al administrador de la propiedad',
            {cssClass: 'alert-success', timeout: 4000});
            this.messageresponse='Se envio de manera exitosa la pre-reservación al administrador de la propiedad!!'
            //this.router.navigate(['/hotel'])
            ;} 
        )
      }
    })
  }

}
