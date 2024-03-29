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
import {Usuariosporedades} from "../../../models/usuariosporedades";
import {Datos} from "../../../models/datos";
import {Usuariosporservicios} from "../../../models/usuariosporservicios";

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
    let ejemplos: Usuariosporservicios = new Usuariosporservicios();
    let datos: Datos;
    ejemplos.mes = "FEBRERO"
    ejemplos.anio = "2022"
    ejemplos.total = 298;
    datos = new Datos();
    datos.num = 16;
    datos.pct = 5;
    ejemplos.repositorio = datos;

    datos = new Datos();
    datos.num = 39;
    datos.pct = 13;
    ejemplos.bilioteca = datos;

    datos = new Datos();
    datos.num = 50;
    datos.pct = 17;
    ejemplos.internet = datos;

    datos = new Datos();
    datos.num = 51;
    datos.pct = 17;
    ejemplos.imprecopias = datos;

    datos = new Datos();
    datos.num = 142;
    datos.pct = 48
    ejemplos.tallactv = datos;
    return ejemplos;
  }

  graficar(ejemplo: Usuariosporservicios) {
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
        text: 'Usuarios que usaron la biblioteca por servicios'
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
          name: "REPOSITORIO",
          y: ejemplo.repositorio?.num,
        },
          {
            name: "BIBLIOTECA (espacio y apoyo en tareas)",
            y: ejemplo.bilioteca?.num,
          },
          {
            name: "INTERNET",
            y: ejemplo.internet?.num,
          },
          {
            name: "IMPRESIÓN/COPIA",
            y: ejemplo.imprecopias?.num,
          },
          {
            name: "TALLERES Y ACTIVIDADES CULTURALES",
            y: ejemplo.tallactv?.num,
          }
        ]
      }]
    });
  }

}
