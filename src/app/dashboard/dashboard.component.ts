import { Component, OnInit,ViewChild } from '@angular/core';
import * as Chartist from 'chartist';
import { NgForm } from '@angular/forms';
import { CrudService } from '../servicios/crud.service';
import { Negocio} from '../models/negocio';
import { Router } from '@angular/router';
import {  LoadService } from '../servicios/load.service';
import { ImageService } from '../servicios/image.service';
import { MyDialogComponent } from '../dialogos/my-dialog/my-dialog.component'
import { DialogoAlertaComponent } from '../dialogos/dialogo-alerta/dialogo-alerta.component';
import { MatDialog, MatCard, MatButton, MatCardTitle } from '@angular/material'
import { GlobalsService } from '../servicios/globals.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';  
import { MatTabChangeEvent } from '@angular/material';
import { Experiencia } from '../models/experiencia';
import * as _ from "lodash";


declare const $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  offset = 2;
  nextKey: any; // for next button
  prevKeys: any[] = []; // for prev button
  subscription: any;

  getNegocios:any;
  getHoteles:any;
  panelOpenState = false;
  getRestaurantes:any;
  getExperiences:any;
  negocios:any;
  hoteles:any;
  habitaciones:any;
  eats:any;
  restaurantes:any;
  experiencias:any;
  negocio: Negocio = new Negocio();
  id:any;
  getImagenes:any;
  items: any;
  hotelsImg: any;
  restaurantsImg: any;
  experiencesImg:any;
  cards: SafeHtml;
  showSpinner : boolean = true;
  posicion = ['SI', 'NO'];
  subHotel = ['Hotel','Hotel Campestre', 'Hostal',
  'Casa', 'Casa campestre', 'Cabaña', 'Otro'];

  subRestaurante = ['Americano', 'Café y postres', 'Comida rápida','Criollo','Francés','Italiano',
            'Mar','Mediterranea', 'Mexicano', 'Peruano', 'Otro'];

  subExperiencia = ['Cultural','Extremo','Gastronómico', 'Romántico','Senderismo', 
            'Tour', 'Otro'];        
            
  cancelacion=['Flexible','Mesurado', 'Rigido','Rigido 30 dias',
              'Rigido 60 dias', 'Estancias largas', 'No aplica'] 
  constructor(public dialog : MatDialog, private crudService: CrudService,
    public router: Router, private ImageService : ImageService, private globals:GlobalsService,public LoadService : LoadService) { }

  isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;
  };
 
  onTabs = (tabChangeEvent: MatTabChangeEvent): void => {
    if(tabChangeEvent.index==1 && sessionStorage.getItem('negociosHotels')==null){
     // this.LoadService.fireLoader()
      this.showSpinner=true;
        this.getHoteles = this.crudService.getHotelesList().snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        }).subscribe(hotel => {
          this.hoteles = hotel;
          console.log(this.hoteles);
          let imagenHotel = [];
          this.getImagenes = this.ImageService.getImageHotel()
          .then(function(snapshot){
            let imagenes = snapshot.val();
            for ( var i in imagenes){
            imagenHotel.push({name:imagenes[i].url,id:i,idNegocio:imagenes[i].id,categoria:imagenes[i].categoria});
            }
            console.log(imagenes);
          }).then(() => this.viewImagesHotels(imagenHotel)).catch(() => this.viewImagesHotels(imagenHotel));
          sessionStorage.setItem('negociosHotels', JSON.stringify(this.hoteles));
          sessionStorage.setItem('imagesHotels', JSON.stringify(imagenHotel));
        });
    }else if(tabChangeEvent.index==2 && sessionStorage.getItem('negociosRestaurants')==null){
      this.LoadService.fireLoader()
      this.showSpinner=true;
        this.getRestaurantes = this.crudService.getRestaurantsList().snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        }).subscribe(restaurante => {
          this.restaurantes = restaurante;
          console.log(this.restaurantes);
          let imagenRestaurante = [];
          this.getImagenes = this.ImageService.getImageRestaurant()
          .then(function(snapshot){
            let imagenes = snapshot.val();
            for ( var i in imagenes){
            imagenRestaurante.push({name:imagenes[i].url,id:i,idNegocio:imagenes[i].id,categoria:imagenes[i].categoria});
            }
            console.log(imagenes);
          }).then(() => this.viewImagesRestaurants(imagenRestaurante)).catch(() => this.viewImagesRestaurants(imagenRestaurante));
          sessionStorage.setItem('negociosRestaurants', JSON.stringify(this.restaurantes));
          sessionStorage.setItem('imagesRestaurants', JSON.stringify(imagenRestaurante));
        });
    }else if(tabChangeEvent.index==3 && sessionStorage.getItem('negociosExperiences')==null){
      this.showSpinner=true;
        this.getExperiences = this.crudService.getExperiencesList().snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        }).subscribe(experiencia => {
          this.experiencias = experiencia;
          console.log(this.restaurantes);
          let imagenExperiencia = [];
          this.getImagenes = this.ImageService.getImageExperience()
          .then(function(snapshot){
            let imagenes = snapshot.val();
            for ( var i in imagenes){
            imagenExperiencia.push({name:imagenes[i].url,id:i,idNegocio:imagenes[i].id,categoria:imagenes[i].categoria});
            }
            console.log(imagenes);
          }).then(() => this.viewImagesExperiences(imagenExperiencia)).catch(() => this.viewImagesExperiences(imagenExperiencia));
          sessionStorage.setItem('negociosExperiences', JSON.stringify(this.experiencias));
          sessionStorage.setItem('imagesExperiences', JSON.stringify(imagenExperiencia));
        });
    }
  }
  getPortadaList(){
    this.LoadService.fireLoader()
    this.showSpinner=true;
      this.getNegocios = this.crudService.getNegociosPortadaList().snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }).subscribe(negocio => {
        this.negocios = negocio;
        console.log(this.negocios);
        let imagen = [];
        this.getImagenes = this.ImageService.getImagePortada()
        .then(function(snapshot){
          let imagenes = snapshot.val();
          for ( var i in imagenes){
          imagen.push({name:imagenes[i].url,id:i,idNegocio:imagenes[i].id});
          }
          console.log(imagenes);
        }).then(() => this.viewImagenes(imagen)).catch(() => this.viewImagenes(imagen));
        sessionStorage.setItem('negociosPortada', JSON.stringify(this.negocios));
        sessionStorage.setItem('cardsPortada', JSON.stringify(imagen));
      });
  }
  viewImagenes(imagen){
    console.log(imagen);
    if(imagen!=''){
      this.items = imagen;
    }else{
      this.items =  [{name:'/assets/img/404.jpg'}];
    }
    this.showSpinner=false;
   // this.LoadService.stopLoader();
  };
  viewImagesHotels(imagen){
    if(imagen!=''){
      this.hotelsImg = imagen;
    }else{
      this.hotelsImg =  [{name:'/assets/img/404.jpg'}];
    }
    this.showSpinner=false;
  };
  viewImagesRestaurants(imagen){
    if(imagen!=''){
      this.restaurantsImg = imagen;
    }else{
      this.restaurantsImg =  [{name:'/assets/img/404.jpg'}];
    }
    this.showSpinner=false;
  };
  viewImagesExperiences(imagen){
    if(imagen!=''){
      this.experiencesImg = imagen;
    }else{
      this.experiencesImg =  [{name:'/assets/img/404.jpg'}];
    }
    this.showSpinner=false;
  }
  perfilHotel(key){
    sessionStorage.removeItem('habitacionesObj');
    this.negocios.forEach(element => {
      if(element.key==key){
        sessionStorage.setItem('negocio', JSON.stringify(element));
        this.id =  element.key;
        this.habitaciones = this.crudService.getHabitacionesList(this.id)
        .then(function(snapshot){
          let habitacion = snapshot.val();
          if(habitacion!=undefined){
            let habitacionesObj = [];
            for ( var i in habitacion){
              habitacionesObj.push({idHabitacion:i,nombre:habitacion[i].nombre, servicios:habitacion[i].servicios,
              huespedes:habitacion[i].huespedes, banos_privados:habitacion[i].banos_privados, banos_publicos:habitacion[i].banos_publicos,
              camas_individuales:habitacion[i].camas_individuales, camas_matrimoniales:habitacion[i].camas_matrimoniales,
              camarotes:habitacion[i].camarotes, moneda:habitacion[i].moneda, precio_noche_tbaja:habitacion[i].precio_noche_tbaja,
              precio_noche_talta:habitacion[i].precio_noche_talta,
              precio_mes:habitacion[i].precio_mes, hora_llegada:habitacion[i].hora_llegada,hora_salida:habitacion[i].hora_salida,
              cancelacion:habitacion[i].cancelacion,descripcion:habitacion[i].descripcion,reglas:habitacion[i].reglas
              });
            }
            //guarda objeto en session identificado con el id del negocio
            sessionStorage.setItem('habitacionesObj', JSON.stringify(habitacionesObj));
          }else{
            console.log('objeto habitaciones vacio');
          }
        }).then(() =>this.router.navigate(['/hotel']))
        .catch(() => this.router.navigate(['/hotel']))   
      }
    });
  }
  perfilRestaurante(key){
    sessionStorage.removeItem('eatsObj');
    this.negocios.forEach(element => {
      if(element.key==key){
        sessionStorage.setItem('negocio', JSON.stringify(element));
        this.id =  element.key;
        console.log(this.id);
        this.eats = this.crudService.getHabitacionesList(this.id)
        .then(function(snapshot){
          let eat = snapshot.val();
          if(eat!=undefined){
            let eatsObj = [];
            for ( var i in eat){
              eatsObj.push({idEat:i,nombre:eat[i].nombre, precio:eat[i].precio,
              moneda:eat[i].moneda, cantidad:eat[i].cantidad, und_medida:eat[i].und_medida,
              num_personas:eat[i].num_personas,descripcion:eat[i].descripcion,type_eat:eat[i].type_eat
              });
            }
            //guarda objeto en session identificado con el id del negocio
            sessionStorage.setItem('eatsObj', JSON.stringify(eatsObj));
          }else{
            console.log('objeto eats vacio');
          }
        }).then(() =>this.router.navigate(['/restaurante']))
        .catch(() => this.router.navigate(['/restaurante']))   
      }
    });
  }
  perfilExperiencia(key){
    sessionStorage.removeItem('experienciasObj');
    this.negocios.forEach(element => {
      if(element.key==key){
        sessionStorage.setItem('negocio', JSON.stringify(element));
        this.id =  element.key;
        console.log(this.id);
        this.eats = this.crudService.getHabitacionesList(this.id)
        .then(function(snapshot){
          let experiencia = snapshot.val();
          if(experiencia!=undefined){
            let experienciasObj = [];
            for ( var i in experiencia){
              experienciasObj.push({idExperiencia:i,nombre:experiencia[i].nombre, precio:experiencia[i].precio,
                moneda:experiencia[i].moneda, num_personas:experiencia[i].num_personas,
                herramientas:experiencia[i].herramientas,edad_min:experiencia[i].edad_min,
                cancelacion:experiencia[i].cancelacion,descripcion:experiencia[i].descripcion,
                reglas:experiencia[i].reglas  
                });
            }
            //guarda objeto en session identificado con el id del negocio
            sessionStorage.setItem('experienciasObj', JSON.stringify(experienciasObj));
          }else{
            console.log('objeto experiencias vacio');
          }
        }).then(() =>this.router.navigate(['/experiencia']))
        .catch(() => this.router.navigate(['/experiencia']))   
      }
    });
  }
  onSubmit(form: NgForm) {
    console.log(this.negocio);
  };
  distanciaFilter(event: any) {
    console.log(event.value);
    this.hoteles.forEach(element => {

    })
  }
  
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
      sessionStorage.removeItem('negociosHotels');
      sessionStorage.removeItem('negociosRestaurants');
      sessionStorage.removeItem('negociosExperiences');
      this.getPortadaList()
      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);



      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var datawebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);
  }

}
