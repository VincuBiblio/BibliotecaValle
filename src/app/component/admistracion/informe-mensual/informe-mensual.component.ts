import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import swal from 'sweetalert2';
import Docxtemplater from "docxtemplater";
// @ts-ignore
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

@Component({
  selector: 'app-informe-mensual',
  templateUrl: './informe-mensual.component.html',
  styleUrls: ['./informe-mensual.component.css']

})

export class informeMensualComponent implements OnInit {
  title = 'informe';

  isLinear = true;
  panelOpenState = false;



  public actividadFormGroup: FormGroup;
  public recursosFormGroup: FormGroup;
  public estrategiasFormGroup: FormGroup;
  public resultadosFormGroup: FormGroup;
  public necesidadesFormGroup: FormGroup;
  public conclusionesFormGroup: FormGroup;

  public listaActividadStorage: any;
  public listaRecursoStorage: any;
  public listaEstrategiasStorage: any;
  public listaNecesidadesStorage: any;
  public listaResultadosStorag: any;
  public listaConclusionesStorag: any;

  public actividad: Array<any> = [];
  public recurso: Array<any> = [];
  public estrategia: Array<any> = [];
  public necesidad: Array<any> = [];
  public resultado: Array<any> = [];
  public conclusion: Array<any> = [];


  public visibilidadTablaActividad: boolean;
  public visibilidadTablaRecurso: boolean;
  public visibilidadTablaEstrategia: boolean;
  public visibilidadTablaNecesidad: boolean;
  public visibilidadTablaResultado: boolean;
  public visibilidadTablaConclusion: boolean;

  public botonSeccionActividad: boolean;
  public botonSeccionRecurso: boolean;
  public botonSeccionEstrategia: boolean;
  public botonSeccionNecesidad: boolean;
  public botonSeccionResultado: boolean;
  public botonSeccionConclusion: boolean;

  public datoMes:any;
  public datoAnio:any;


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  firstFormGroup2 = this._formBuilder.group({
    firstCtrl: ['', ''],
  });
  secondFormGroup2 = this._formBuilder.group({
    secondCtrl: ['', ''],
  });

  firstFormGroup3 = this._formBuilder.group({
    firstCtrl: ['', ''],
  });
  secondFormGroup3 = this._formBuilder.group({
    secondCtrl: ['', ''],
  });

  sinValidacionGroup = this._formBuilder.group({
    secondCtrl: ['', ''],
  });






  constructor(private _formBuilder: FormBuilder) {

  }


  ngOnInit(): void {

    this.obtener_datos();


  }

  obtener_datos() {
    this.obtener_Actividades();
    this.obtener_Recursos();
    this.obtener_Estrategias();
    this.obtener_Necesidades();
    this.obtener_Resultados();
    this.obtener_Conclusiones();
  }

  validacionFormGroup(numero: number, d1: number) {

    switch (numero) {
      case 1:
        this.actividadFormGroup = this._formBuilder.group({
          firstCtrl: [d1, Validators.min(4)],
        });
        break;
      case 2:
        this.recursosFormGroup = this._formBuilder.group({
          firstCtrl: [d1, Validators.min(4)],
        });
        break;
      case 3:
        this.estrategiasFormGroup = this._formBuilder.group({
          firstCtrl: [d1, Validators.min(4)],
        });
        break;
      case 4:
        this.necesidadesFormGroup = this._formBuilder.group({
          firstCtrl: [d1, Validators.min(4)],
        });
        break;
      case 5:
        this.resultadosFormGroup = this._formBuilder.group({
          firstCtrl: [d1, Validators.min(4)],
        });
        break;
      case 6:
        this.conclusionesFormGroup = this._formBuilder.group({
          firstCtrl: [d1, Validators.min(4)],
        });
        break;

    }


  }


  //ACTIVIDADES

  agregar_Actividad(actividad: any) {

    if (actividad.length != 0) {
      this.actividad.push(actividad);
      localStorage.setItem("Actividades", JSON.stringify(this.actividad));
      console.log("Actividad Agregada");
      this.comprobarSiHayActividades();



    }

  }


  obtener_Actividades() {
    const name = localStorage.getItem('Actividades');

    if (name) {
      this.listaActividadStorage = localStorage.getItem("Actividades");
      this.actividad = JSON.parse(this.listaActividadStorage);
      this.comprobarSiHayActividades();
    } else {
      this.validacionFormGroup(1, 2);
      this.botonSeccionActividad = true;
    }


  }

  comprobarSiHayActividades() {

    if (this.actividad.length == 0) {
      this.visibilidadTablaActividad = false;
      this.botonSeccionActividad = true;
      this.validacionFormGroup(1, 2);
    } else {
      this.visibilidadTablaActividad = true;
      this.botonSeccionActividad = false;
      this.validacionFormGroup(1, 6);
    }
  }



  eliminar_Actividad(acti: any) {

    swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.actividad = this.actividad.filter((item) => item !== acti);
        localStorage.setItem("Actividades", JSON.stringify(this.actividad));
        console.log("Actividad Eliminada");
        this.comprobarSiHayActividades();
        swal.fire(
          'Borrado!',
          'Las actividades han sido eliminadas.',
          'success'
        )
      }

      this.comprobarSiHayActividades();

    }
    )



  }

  borrar_Todas_Actividades() {

    swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.actividad = [];
        localStorage.setItem("Actividades", JSON.stringify(this.actividad));
        swal.fire(
          'Borrado!',
          'Las actividades han sido eliminadas.',
          'success'
        )
      }
      this.comprobarSiHayActividades();

    }
    )

  }





  //RECURSOS
  agregar_Recurso(recurso: any) {

    if (recurso.length != 0) {
      this.recurso.push(recurso);
      localStorage.setItem("Recursos", JSON.stringify(this.recurso));
      console.log("Recurso Agregado");
      this.comprobarSiHayRecursos();



    }

  }


  obtener_Recursos() {
    const name1 = localStorage.getItem('Recursos');

    if (name1) {
      this.listaRecursoStorage = localStorage.getItem("Recursos");
      this.recurso = JSON.parse(this.listaRecursoStorage);
      this.comprobarSiHayRecursos();
    } else {
      this.validacionFormGroup(2, 2);
    }
  }


  comprobarSiHayRecursos() {
    if (this.recurso.length == 0) {
      this.visibilidadTablaRecurso = false;
      this.botonSeccionRecurso = true;
      this.validacionFormGroup(2, 2);
    } else {
      this.visibilidadTablaRecurso = true;
      this.botonSeccionRecurso = false;
      this.validacionFormGroup(2, 6);
    }
  }

  eliminar_Recurso(dat: any) {

    swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.recurso = this.recurso.filter((item) => item !== dat);
        localStorage.setItem("Recursos", JSON.stringify(this.recurso));
        console.log("Recurso Eliminado");
        this.comprobarSiHayRecursos();
        swal.fire(
          'Borrado!',
          'El recurso han sido eliminado.',
          'success'
        )
      }

      this.comprobarSiHayRecursos();

    }
    )



  }

  borrar_Todos_Recursos() {

    swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.recurso = [];
        localStorage.setItem("Recursos", JSON.stringify(this.recurso));

        swal.fire(
          'Borrado!',
          'Los recursos han sido eliminados.',
          'success'
        )
      }
      this.comprobarSiHayRecursos();

    }
    )

  }

  //ESTRATEGIAS

  agregar_Estrategia(dato: any) {

    if (dato.length != 0) {
      this.estrategia.push(dato);
      localStorage.setItem("Estrategias", JSON.stringify(this.estrategia));
      console.log("Estrategia Agregado");
      this.comprobarSiHayEstrategias();



    }

  }


  obtener_Estrategias() {
    const name2 = localStorage.getItem('Estrategias');

    if (name2) {
      this.listaEstrategiasStorage = localStorage.getItem("Estrategias");
      this.estrategia = JSON.parse(this.listaEstrategiasStorage);
      this.comprobarSiHayEstrategias();
    }else{
      this.validacionFormGroup(3, 2);
    }
  }


  comprobarSiHayEstrategias() {
    if (this.estrategia.length == 0) {
      this.visibilidadTablaEstrategia = false;
      this.botonSeccionEstrategia = true;
      this.validacionFormGroup(3, 2);
    } else {
      this.visibilidadTablaEstrategia = true;
      this.botonSeccionEstrategia = false;
      this.validacionFormGroup(3, 6);
    }
  }

  eliminar_Estrategia(dat: any) {

    swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.estrategia = this.estrategia.filter((item) => item !== dat);
        localStorage.setItem("Estrategias", JSON.stringify(this.estrategia));
        console.log("Estrategia Eliminado");
        this.comprobarSiHayEstrategias();
        swal.fire(
          'Borrado!',
          'La estrategia han sido eliminada.',
          'success'
        )
      }

      this.comprobarSiHayEstrategias();

    }
    )



  }

  borrar_Todas_Estrategias() {

    swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.estrategia = [];
        localStorage.setItem("Estrategias", JSON.stringify(this.estrategia));

        swal.fire(
          'Borrado!',
          'Los estrategias han sido eliminadas.',
          'success'
        )
      }
      this.comprobarSiHayEstrategias();

    }
    )

  }


  //NECESIDADADES

  agregar_Necesidad(dato: any) {

    if (dato.length != 0) {
      this.necesidad.push(dato);
      localStorage.setItem("Necesidades", JSON.stringify(this.necesidad));
      console.log("Necesidad Agregado");
      this.comprobarSiHayNecesidades();


    }

  }


  obtener_Necesidades() {
    const name3 = localStorage.getItem('Necesidades');

    if (name3) {
      this.listaNecesidadesStorage = localStorage.getItem("Necesidades");
      this.necesidad = JSON.parse(this.listaNecesidadesStorage);
      this.comprobarSiHayNecesidades();
    }else{
      this.validacionFormGroup(4, 2);
    }
  }


  comprobarSiHayNecesidades() {
    if (this.necesidad.length == 0) {
      this.visibilidadTablaNecesidad = false;
      this.botonSeccionNecesidad = true;
      this.validacionFormGroup(4, 2);
    } else {
      this.visibilidadTablaNecesidad = true;
      this.botonSeccionNecesidad = false;
      this.validacionFormGroup(4, 6);
    }
  }

  eliminar_Necesidad(dat: any) {

    swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.necesidad = this.necesidad.filter((item) => item !== dat);
        localStorage.setItem("Necesidades", JSON.stringify(this.necesidad));
        console.log("Necesidad Eliminado");
        this.comprobarSiHayNecesidades();
        swal.fire(
          'Borrado!',
          'La necesidad han sido eliminada.',
          'success'
        )
      }

      this.comprobarSiHayNecesidades();

    }
    )



  }

  borrar_Todas_Necesidades() {

    swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.necesidad = [];
        localStorage.setItem("Necesidades", JSON.stringify(this.necesidad));

        swal.fire(
          'Borrado!',
          'Las necesidades han sido eliminadas.',
          'success'
        )
      }
      this.comprobarSiHayNecesidades();

    }
    )

  }


  //RESULTADOS

  agregar_Resultado(dato: any) {

    if (dato.length != 0) {
      this.resultado.push(dato);
      localStorage.setItem("Resultados", JSON.stringify(this.resultado));
      console.log("Resultado Agregado");
      this.comprobarSiHayResultados();
    }

  }


  obtener_Resultados() {
    const name4 = localStorage.getItem('Resultados');

    if (name4) {
      this.listaResultadosStorag = localStorage.getItem("Resultados");
      this.resultado = JSON.parse(this.listaResultadosStorag);
      this.comprobarSiHayResultados();
    }else{
      this.validacionFormGroup(5, 2);
    }
  }


  comprobarSiHayResultados() {
    if (this.resultado.length == 0) {
      this.visibilidadTablaResultado = false;
      this.botonSeccionResultado = true;
      this.validacionFormGroup(5, 2);
    } else {
      this.visibilidadTablaResultado = true;
      this.botonSeccionResultado = false;
      this.validacionFormGroup(5, 6);
    }
  }

  eliminar_Resultado(dat: any) {

    swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.resultado = this.resultado.filter((item) => item !== dat);
        localStorage.setItem("Resultados", JSON.stringify(this.resultado));
        console.log("Resultado Eliminado");
        this.comprobarSiHayResultados();
        swal.fire(
          'Borrado!',
          'El resultado ha sido eliminado.',
          'success'
        )
      }

      this.comprobarSiHayResultados();

    }
    )



  }

  borrar_Todos_Resultados() {

    swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.resultado = [];
        localStorage.setItem("Resultados", JSON.stringify(this.resultado));

        swal.fire(
          'Borrado!',
          'Los Resultados han sido eliminados.',
          'success'
        )
      }
      this.comprobarSiHayResultados();

    }
    )

  }


  //CONCLUSIONES

  agregar_Conclusion(dato: any) {

    if (dato.length != 0) {
      this.conclusion.push(dato);
      localStorage.setItem("Conclusiones", JSON.stringify(this.conclusion));
      console.log("Conclusion Agregado");
      this.comprobarSiHayConclusiones();
    }

  }


  obtener_Conclusiones() {
    const name5 = localStorage.getItem('Conclusiones');

    if (name5) {
      this.listaConclusionesStorag = localStorage.getItem("Conclusiones");
      this.conclusion = JSON.parse(this.listaConclusionesStorag);
      this.comprobarSiHayConclusiones();
    }else{
      this.validacionFormGroup(6, 2);
    }
  }


  comprobarSiHayConclusiones() {
    if (this.conclusion.length == 0) {
      this.visibilidadTablaConclusion = false;
      this.botonSeccionConclusion = true;
      this.validacionFormGroup(6, 2);
    } else {
      this.visibilidadTablaConclusion = true;
      this.botonSeccionConclusion = false;
      this.validacionFormGroup(6, 6);
    }
  }

  eliminar_Conclusion(dat: any) {

    swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.conclusion = this.conclusion.filter((item) => item !== dat);
        localStorage.setItem("Conclusiones", JSON.stringify(this.conclusion));
        console.log("Conclusion Eliminado");
        this.comprobarSiHayConclusiones();
        swal.fire(
          'Borrado!',
          'La conclusion ha sido eliminado.',
          'success'
        )
      }

      this.comprobarSiHayConclusiones();

    }
    )



  }

  borrar_Todas_Conclusiones() {

    swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.conclusion = [];
        localStorage.setItem("Conclusiones", JSON.stringify(this.conclusion));

        swal.fire(
          'Borrado!',
          'Las conclusiones han sido eliminados.',
          'success'
        )
      }
      this.comprobarSiHayConclusiones();

    }
    )

  }



  //GENERAR DOCUMENTO

  generarDoc() {

    let actividadesDoc: any[] = [];
    let recursosDoc: any[] = [];
    let estrategiasDoc: any[] = [];
    let necesidadesDoc: any[] = [];
    let resultadosDoc: any[] = [];
    let conclusionesDoc: any[] = [];


    for (var i = 0; i < this.actividad.length; i++) {
      let des: any = {
        descripcion: this.actividad[i]
      }
      actividadesDoc.push(des);
    }

    for (var i = 0; i < this.recurso.length; i++) {
      let des: any = {
        descripcion1: this.recurso[i]
      }
      recursosDoc.push(des);
    }

    for (var i = 0; i < this.estrategia.length; i++) {
      let des: any = {
        descripcion2: this.estrategia[i]
      }
      estrategiasDoc.push(des);
    }

    for (var i = 0; i < this.necesidad.length; i++) {
      let des: any = {
        descripcion3: this.necesidad[i]
      }
      necesidadesDoc.push(des);
    }

    for (var i = 0; i < this.resultado.length; i++) {
      let des: any = {
        descripcion4: this.resultado[i]
      }
      resultadosDoc.push(des);
    }

    for (var i = 0; i < this.conclusion.length; i++) {
      let des: any = {
        descripcion5: this.conclusion[i]
      }
      conclusionesDoc.push(des);
    }



    let dataGeneral: any = {
      actividades: actividadesDoc,
      recursos: recursosDoc,
      estrategias: estrategiasDoc,
      necesidades: necesidadesDoc,
      resultados: resultadosDoc,
      conclusiones: conclusionesDoc,
      mesInforme: '28',



    }

    this.generate(dataGeneral, "InformeFinal");

  }


  generate(nom: any, nombreDoc: string) {
    loadFile("../../../../assets/documentos/informeMensual.docx", function (
      error,
      content
    ) {
      if (error) {
        throw error;
      }



      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
      doc.setData({
        ...nom
      });
      try {
        // Se reemplaza en el documento: {rpp} -> John, {numestudiantes} -> Doe ....
        doc.render();
      } catch (error) {
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
        function replaceErrors(key, value) {
          if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function (
              error,
              key
            ) {
              error[key] = value[key];
              return error;
            },
              {});
          }
          return value;
        }
        console.log(JSON.stringify({ error: error }, replaceErrors));

        if (error.properties && error.properties.errors instanceof Array) {
          const errorMessages = error.properties.errors
            .map(function (error) {
              return error.properties.explanation;
            })
            .join("\n");
          console.log("errorMessages", errorMessages);

        }
        throw error;
      }
      const out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      });
      // Output the document using Data-URI
      saveAs(out, "mes año informe Mensual.docx");
    });
  }


}
