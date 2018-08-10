import { Component,  Output, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as Chartist from 'chartist';
import { CrudService } from '../servicios/crud.service';
import { Negocio} from '../models/negocio';
import { TempAlta } from '../models/tempAlta';
import { Reserva } from '../models/reserva';
import { Router } from '@angular/router';
import { ImageService } from '../servicios/image.service';
import { ISubscription } from 'rxjs/Subscription';
import { MyDialogComponent } from '../dialogos/my-dialog/my-dialog.component'
import { DialogoAlertaComponent } from '../dialogos/dialogo-alerta/dialogo-alerta.component';
import { Habitacion } from '../models/habitacion';
import { MatDialog, MatCard, MatButton, MatCardTitle, MatTabChangeEvent } from '@angular/material'
import { GlobalsService } from '../servicios/globals.service';
import { auth } from 'firebase/app';
import {AuthService } from '../servicios/auth.service'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';  


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  getNegociosLists;
  getHabitaciones:any;
  habitaciones: any;
  experiencias:any;
  restaurantsList:any;
  experiencesList:any;
  platos:any;
  tempAltas:any;
  idNegocio:any;
  key:string;
  id:any;
  negocio: Negocio = new Negocio();
  hotelsList:any;
  reservas: Reserva = new Reserva();
  tempAlta: TempAlta = new TempAlta();
  submitted = false;
  dialogResult = '';
  emailUsuario:string;
  type:string;
  negocios: any;
  numHoteles:any;
  numRestaurantes:any;
  numExperiencias:any;
  getNegocios:any;
  getReservas:any;
  showSpinner : boolean = true;
  panelOpenState = false;

  constructor(public dialog : MatDialog, private crudService: CrudService,
   public router: Router, private ImageService : ImageService, private globals:GlobalsService,
   public authService: AuthService ) {
    sessionStorage.removeItem('habitacionesObj');
    sessionStorage.removeItem('platosObj');
  }
  
  onSubmitAddTempAlta(){
    this.crudService.insertTempAlta(this.tempAlta);
  };

  onSubmitTemp(form: NgForm){
    this.submitted = true;
    this.tempAlta.adminTemp = localStorage.getItem('user');  
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que todos los datos registrados son correctos.'
    }); 
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        this.onSubmitAddTempAlta();
        form.resetForm();
        window.location.reload();
      }
    })
  };

  //--------------------GET DATA------------
  getHotelsList(){
    this.emailUsuario = localStorage.getItem('user');
    if(this.emailUsuario=='ceballosmarandres@gmail.com'){
      this.getNegociosLists= this.crudService.getHotelsAdminList().snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }).subscribe(hotels => {
        this.hotelsList = hotels;
        console.log(this.hotelsList);
        let forHoteles = [];
        for ( var i in this.hotelsList){
          forHoteles.push(this.hotelsList[i].categoria);
        }
        this.numHoteles = forHoteles.length;
        console.log(this.numHoteles);
      })
    }else{
      this.getNegociosLists= this.crudService.getHotelsList(this.emailUsuario).snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }).subscribe(hotels => {
        this.hotelsList = hotels;
        console.log(this.hotelsList);
        let forHoteles = [];
        for ( var i in this.hotelsList){
          forHoteles.push(this.hotelsList[i].categoria);
        }
        this.numHoteles = forHoteles.length;
      })
    }
  }
  getRestaurantsList(){
    this.emailUsuario = localStorage.getItem('user');
    if(this.emailUsuario=='ceballosmarandres@gmail.com'){
      console.log('entra a restaurantes');
      this.getNegociosLists= this.crudService.getRestaurantsAdminList().snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }).subscribe(restaurants => {
        this.restaurantsList = restaurants;
        let forRestaurantes = [];
        for ( var i in this.restaurantsList){
          forRestaurantes.push(this.restaurantsList[i].categoria);
        }
        this.numRestaurantes = forRestaurantes.length;
      })
    }else{
      this.getNegociosLists= this.crudService.getRestaurantesList(this.emailUsuario).snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }).subscribe(restaurants => {
        this.restaurantsList = restaurants;
        console.log(this.hotelsList);
        let forRestaurantes = [];
        for ( var i in this.restaurantsList){
          forRestaurantes.push(this.restaurantsList[i].categoria);
        }
        this.numRestaurantes = forRestaurantes.length;
      })
    }
  }
  getExperiencesList(){
    this.emailUsuario = localStorage.getItem('user');
    if(this.emailUsuario=='ceballosmarandres@gmail.com'){
      this.getNegociosLists= this.crudService.getExperiencesAdminList().snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }).subscribe(experiences => {
        this.experiencesList = experiences;
        console.log(this.hotelsList);
        let forExperiencias = [];
        for ( var i in this.experiencesList){
          forExperiencias.push(this.experiencesList[i].categoria);
        }
        this.numExperiencias = forExperiencias.length;
        this.showSpinner=false;
      })
    }else{
      this.getNegociosLists= this.crudService.getExperienciaList(this.emailUsuario).snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }).subscribe(experiences => {
        this.experiencesList = experiences;
        let forExperiencias = [];
        for ( var i in this.experiencesList){
          forExperiencias.push(this.experiencesList[i].categoria);
        }
        this.numExperiencias = forExperiencias.length;
        this.showSpinner=false;
      })
    }
  };

  getTempAltaList(){
    let tempAltaObj = [];
    this.emailUsuario = localStorage.getItem('user');
    this.type = 'temporadas';
    this.tempAltas = this.crudService.getTempAltaList(this.emailUsuario)
    .then(function(snapshot){
      let temporada = snapshot.val();
      console.log(temporada);
        for ( var i in temporada){
          tempAltaObj.push({key:i,fecha_inicio:temporada[i].fecha_inicio, fecha_fin:temporada[i].fecha_fin,
          descripcion:temporada[i].descripcion});
        }
        console.log(tempAltaObj);
        //guarda objeto en session identificado con el id del negocio
        sessionStorage.setItem('platosObj', JSON.stringify(tempAltaObj));
    }).then(() => this.getTemporadas(tempAltaObj))
  };

  getTemporadas(temp){
    console.log(temp);
    this.tempAlta = temp;
  };

  getHabitacionesList(){
    this.idNegocio=JSON.parse(sessionStorage.getItem('negocio'));
    this.id = this.idNegocio.key;
  };
  getReservasList(){
    let adminReserva= localStorage.getItem('user');
    let reservasList = [];
    this.getReservas = this.crudService.getReservasList(adminReserva)
    .then(function(snapshot){
      let reservas = snapshot.val();
      for ( var r in reservas){
        reservasList.push({key:r,idNegocioreserva:reservas[r].idNegocioreserva,adminReserva:reservas[r].adminReserva,
        fecha_inicio:reservas[r].fecha_inicio,fecha_fin:reservas[r].fecha_fin,precio:reservas[r].precio,
        moneda:reservas[r].moneda,cliente:reservas[r].cliente,estado:reservas[r].estado,negocio:reservas[r].negocio,
        subnegocio:reservas[r].subnegocio})
      }
    }).then(() =>this.viewReservas(reservasList))
  };

  //------------------------------- -------FIN ---------------------

  //-------------------------------------DELETE 'N EDIT------------------------------
  deleteNegocio(key,categoria){
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que desea eliminar el negocio.'
    }); 
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        if(categoria == 'Hotel'){
          this.crudService.deleteHotels(key);
        }else if(categoria == 'Restaurante'){
          this.crudService.deleteRestaurant(key);
        }else if(categoria == 'Experiencia'){
          this.crudService.deleteExperiences(key);
        } 
      }
    })
  };
  
  deleteTempAlta(key){
    console.log(key);
    let dialogRef = this.dialog.open(DialogoAlertaComponent, {
      width: '600px',
      data:'Esta seguro que desea eliminar esta temporada.'
    }); 
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog cerrado: ${result}`); 
      this.dialogResult  = result;
      if( this.dialogResult == 'Confirm'){
        this.crudService.deleteTempAlta(key);
        window.location.reload();
      }
    })
  };

  editNegocio(key,categoria){
    if(categoria == 'Hotel'){
      this.hotelsList.forEach(element => {
        if(element.key==key){
          sessionStorage.setItem('negocio', JSON.stringify(element))
          this.router.navigate(['/edit-bs']);
        }
      });
    }else if(categoria == 'Restaurante'){
      this.restaurantsList.forEach(element => {
        if(element.key==key){
          sessionStorage.setItem('negocio', JSON.stringify(element))
          this.router.navigate(['/edit-bs']);
        }
      });
    }else if (categoria == 'Experiencia'){
      this.experiencesList.forEach(element => {
        if(element.key==key){
          sessionStorage.setItem('negocio', JSON.stringify(element))
          this.router.navigate(['/edit-bs']);
        }
      });
    }  
  };
  //-------------------------------------FIN-----------------------------------

  //------------------------------------DETAILS----------------------------------------
  perfilHotel(key){
    sessionStorage.removeItem('habitacionesObj');
    this.hotelsList.forEach(element => {
      if(element.key==key){
        this.globals.setRooms(element.rooms);
        this.globals.setImagesNegocio(element.images);
        this.globals.setNegocio(element);
        sessionStorage.setItem('habitacionesObj', JSON.stringify(element.rooms));
        sessionStorage.setItem('imagesNegocio', JSON.stringify(element.images));
        sessionStorage.setItem('negocio', JSON.stringify(element));
      }
    })
    this.router.navigate(['/perfil-hotel'])
  }
    /*this.hotelsList.forEach(element => {
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
              camarotes:habitacion[i].camarotes, moneda:habitacion[i].moneda, precio_noche_talta:habitacion[i].precio_noche_talta,
              precio_noche_tbaja:habitacion[i].precio_noche_tbaja,
              precio_mes:habitacion[i].precio_mes, hora_llegada:habitacion[i].hora_llegada,hora_salida:habitacion[i].hora_salida,
              cancelacion:habitacion[i].cancelacion,descripcion:habitacion[i].descripcion,reglas:habitacion[i].reglas
              });
            }
            //guarda objeto en session identificado con el id del negocio
            sessionStorage.setItem('habitacionesObj', JSON.stringify(habitacionesObj));
          }else{
            console.log('objeto habitaciones vacio');
          }
        }).then(() =>this.router.navigate(['/perfil-hotel']))
        .catch(() => this.router.navigate(['/perfil-hotel']))   
      }
    });
  }*/
  perfilRestaurante(key){
    sessionStorage.removeItem('platosObj');
    this.restaurantsList.forEach(element => {
      if(element.key==key){
        sessionStorage.setItem('platosObj', JSON.stringify(element.platos));
        this.globals.setPlatos(element.platos);
        sessionStorage.setItem('imagesNegocio', JSON.stringify(element.images));
        this.globals.setImagesNegocio(element.images);
        sessionStorage.setItem('negocio', JSON.stringify(element));
        this.globals.setNegocio(element);
      }
    })
    this.router.navigate(['/perfil-restaurante'])
  }
  /*  this.negocios.forEach(element => {
      if(element.key==key){
        sessionStorage.setItem('negocio', JSON.stringify(element));
        this.id =  element.key;
        this.experiencias = this.crudService.getExperienciasList(this.id)
        .then(function(snapshot){
          let plato = snapshot.val();
          if(plato!=undefined){
            let platosObj = [];
            for ( var i in plato){
              platosObj.push({idPlato:i,nombre:plato[i].nombre,cantidad:plato[i].cantidad,
                und_medida:plato[i].und_medida, num_personas:plato[i].num_personas, moneda:plato[i].moneda,
                precio:plato[i].precio, descripcion:plato[i].descripcion
              });
            }
            console.log(platosObj);
            //guarda objeto en session identificado con el id del negocio
            sessionStorage.setItem('platosobj', JSON.stringify(platosObj));
          }else{
            console.log('objeto platos vacio');
          }
        }).then(() =>this.router.navigate(['/perfil-restaurante']))
        .catch(() => this.router.navigate(['/perfil-restaurante']))   
      }
    });
  };*/
  perfilExperiencia(key){
    sessionStorage.removeItem('experienciasobj');
    this.experiencesList.forEach(element => {
      if(element.key==key){
        this.globals.setExperiences(element.experiencias);
        this.globals.setImagesNegocio(element.images);
        this.globals.setNegocio(element);
      }
    })
    this.router.navigate(['/perfil-experiencia'])
  }
  /*
    sessionStorage.removeItem('experienciasobj');
    this.negocios.forEach(element => {
      if(element.key==key){
        sessionStorage.setItem('negocio', JSON.stringify(element));
        this.id =  element.key;
        this.experiencias = this.crudService.getExperienciasList(this.id)
        .then(function(snapshot){
          let experiencia = snapshot.val();
          if(experiencia!=undefined){
            let experienciasObj = [];
            for ( var i in experiencia){
              experienciasObj.push({idExperiencia:i,nombre:experiencia[i].nombre,herramientas:experiencia[i].herramientas,
                edad_min:experiencia[i].edad_min, num_personas:experiencia[i].num_personas, moneda:experiencia[i].moneda,
                cancelacion:experiencia[i].cancelacion,precio:experiencia[i].precio, descripcion:experiencia[i].descripcion,reglas:experiencia[i].reglas
              });
            }
            //guarda objeto en session identificado con el id del negocio
            sessionStorage.setItem('experienciasobj', JSON.stringify(experienciasObj));
          }else{
            console.log('objeto platos vacio');
          }
        }).then(() =>this.router.navigate(['/perfil-experiencia']))
        .catch(() => this.router.navigate(['/perfil-experiencia']))   
      }
    });
  }
  */
  //--------------------------------FIN-------------------------------------------

  //-------------------------------ROUTES------------------------------------------
  goReservas(key){
    sessionStorage.setItem('idReserva',key);
    this.router.navigate(['/reserva'])
  };
  goAddNegocio(){
    this.router.navigate(['/add-bs']);
  };
  goAddTempAlta(){
    this.router.navigate(['/tempAlta']);
  };

  //-----------------------------------FIN--------------------------------------------  
  viewReservas(reservas){
    this.reservas = reservas;
    sessionStorage.setItem('reservas', JSON.stringify(reservas))
    console.log(this.reservas);
  }
    /*
  getNegociosList(){
    //this.LoadService.fireLoader()
    this.emailUsuario = localStorage.getItem('user');
    if(this.emailUsuario=='ceballosmarandres@gmail.com'){
      this.getNegocios = this.crudService.getNegociosAdminList().snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }).subscribe(negocio => {
        this.negocios = negocio;
        console.log(this.negocios);
       
        let forRestaurantes = [];
        let forExperiencias = [];
        let categoria = '';
        for ( var i in this.negocios){
          categoria = this.negocios[i].categoria;
           if (categoria == 'Restaurante'){
            forRestaurantes.push(this.negocios[i].categoria); 
          }else if (categoria == 'Experiencia'){
            forExperiencias.push(this.negocios[i].categoria);
          }
        }
          this.numRestaurantes = forRestaurantes.length;
          this.numExperiencias = forExperiencias.length;
          this.showSpinner=false;
          //this.LoadService.stopLoader();
      });
    }else{
      this.getNegocios = this.crudService.getNegociosList(this.emailUsuario).snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }).subscribe(negocio => {
        this.negocios = negocio;
        console.log(this.negocios);
        let forHoteles = [];
        let forRestaurantes = [];
        let forExperiencias = [];
        let categoria = '';
        for ( var i in this.negocios){
          categoria = this.negocios[i].categoria;
          if(categoria == 'Hotel'){
          forHoteles.push(this.negocios[i].categoria);
          }else if (categoria == 'Restaurante'){
            forRestaurantes.push(this.negocios[i].categoria); 
          }else if (categoria == 'Experiencia'){
            forExperiencias.push(this.negocios[i].categoria);
          }
        }
          this.numHoteles = forHoteles.length;
          this.numRestaurantes = forRestaurantes.length;
          this.numExperiencias = forExperiencias.length;
          this.showSpinner=false;
      });
    }
  };
*/

  ngOnInit() {
      this.getTempAltaList();
      this.getReservasList();
      this.getHotelsList();
      this.getRestaurantsList();
      this.getExperiencesList()
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
}


