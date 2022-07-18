import {Component, OnInit} from '@angular/core';
import * as Highcharts from "highcharts";


// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
// @ts-ignore
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// @ts-ignore
import {default as _rollupMoment, Moment} from 'moment';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {FormControl} from "@angular/forms";
import {MatDatepicker} from "@angular/material/datepicker";
import {Datos, Usuariosporedades} from "../../../models/usuariosporedades";

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-usuariosporservicios',
  templateUrl: './usuariosporservicios.component.html',
  styleUrls: ['./usuariosporservicios.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class UsuariosporserviciosComponent implements OnInit {

  date = new FormControl(moment());

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  titulo = "BIBLIOTECA MUNICIPAL DEL VALLE";

  constructor() {
  }

  ngOnInit(): void {

  }

  consultar() {
    var fecha: Date;
    fecha = this.date.value._d;
    console.log(fecha.getUTCFullYear())
    console.log(fecha.getUTCMonth() + 1)
    this.graficar(this.ejemplo());
  }


  ejemplo(): Usuariosporedades {
    let ejemplos: Usuariosporedades = new Usuariosporedades();
    let datos: Datos;
    ejemplos.mes = "FEBRERO"
    ejemplos.anio = "2022"
    ejemplos.total = 248
    datos = new Datos();
    datos.num = 12;
    datos.pct = 4.8
    ejemplos.infantes = datos;

    datos = new Datos();
    datos.num = 86;
    datos.pct = 34.7
    ejemplos.ninos = datos;

    datos = new Datos();
    datos.num = 54;
    datos.pct = 31.8
    ejemplos.adolecentes = datos;

    datos = new Datos();
    datos.num = 26;
    datos.pct = 10.5
    ejemplos.jovenes = datos;

    datos = new Datos();
    datos.num = 61;
    datos.pct = 24.6
    ejemplos.adultos = datos;

    datos = new Datos();
    datos.num = 9;
    datos.pct = 3.6
    ejemplos.adultosmayores = datos;
    return ejemplos;
  }

  graficar(ejemplo: Usuariosporedades) {
    // Create the chart
    // @ts-ignore
    Highcharts.chart('container', {
      chart: {
        type: 'column'
      },
      title: {
        align: 'left',
        text: 'Usuarios de ' + ejemplo.mes + ', ' + ejemplo.anio
      },
      subtitle: {
        align: 'left',
        text: 'Usuarios que usaron la biblioteca por edades'
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Total de usuarios'
        }

      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> en total<br/>'
      },

      series: [{
        name: "Usuarios",
        colorByPoint: true,
        data: [{
          name: "INFANTES                (hasta 5 años)",
          y: ejemplo.infantes?.num,
          color: '#F2921D',
        },
          {
            name: "NIÑOS                 (6 -11 años)",
            y: ejemplo.ninos?.num,
            color: '#ff5722',
          },
          {
            name: "ADOLESCENTES          (12 -17 años)",
            y: ejemplo.adolecentes?.num,
            color: '#37474f',
          },
          {
            name: "JÓVENES            (18 -25 años)",
            y: ejemplo.jovenes?.num,
            color: '#0d47a1',
          },
          {
            name: "ADULTOS         (26 - 64 años)",
            y: ejemplo.adultos?.num,
            color: '#9c27b0',
          },
          {
            name: "ADULTOS MAYORES  (mayores de 65 años)",
            y: ejemplo.adultosmayores?.num,
            color: '#00838f',
          }
        ]
      }]
    });
  }

}
