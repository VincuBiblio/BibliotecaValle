import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';



@Component({
  selector: 'app-informe-mensual',
  templateUrl: './informe-mensual.component.html',
  styleUrls: ['./informe-mensual.component.css']

})

export class informeMensualComponent implements OnInit {
  title = 'informe';

  isLinear = true;
  panelOpenState = false;

  public listaActividadStorage: any;
  public listaRecursoStorage: any;
  public listaEstrategiasStorage: any;
  public listaNecesidadesStorage: any;

  public actividad: Array<any> = [];
  public recurso: Array<any> = [];
  public estrategia: Array<any> = [];
  public necesidad: Array<any> = [];

  public visibilidadTablaActividad: boolean;
  public visibilidadTablaRecurso: boolean;
  public visibilidadTablaEstrategia: boolean;
  public visibilidadTablaNecesidad: boolean;

  public botonSeccionActividad: boolean;
  public botonSeccionRecurso: boolean;
  public botonSeccionEstrategia: boolean;
  public botonSeccionNecesidad: boolean;



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






  constructor(private _formBuilder: FormBuilder) {

  }


  ngOnInit(): void {

    this.obtener_Actividades();
    this.obtener_Recursos();
    this.obtener_Estrategias();
    this.obtener_Necesidades();


  }



  //ACTIVIDADES

  agregar_Actividad(actividad: any) {

    if (actividad.length != 0) {
      this.actividad.push(actividad);
      localStorage.setItem("Actividades", JSON.stringify(this.actividad));
      console.log("Actividad Agregada");
      this.comprobarSiHayActividades();

      swal.fire(
        'Enviado',
        `Actividad agregado exitosamente!`,
        'success'
      )

    }

  }


  obtener_Actividades() {
    const name = localStorage.getItem('Actividades');

    if (name) {
      this.listaActividadStorage = localStorage.getItem("Actividades");
      this.actividad = JSON.parse(this.listaActividadStorage);
      this.comprobarSiHayActividades();
    }


  }

  comprobarSiHayActividades() {
    if (this.actividad.length == 0) {
      this.visibilidadTablaActividad = false;
      this.botonSeccionActividad = true;
    } else {
      this.visibilidadTablaActividad = true;
      this.botonSeccionActividad = false;
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

      swal.fire(
        'Enviado',
        `Recurso agregado exitosamente!`,
        'success'
      )

    }

  }


  obtener_Recursos() {
    const name1 = localStorage.getItem('Recursos');

    if (name1) {
      this.listaRecursoStorage = localStorage.getItem("Recursos");
      this.recurso = JSON.parse(this.listaRecursoStorage);
      this.comprobarSiHayRecursos();
    }
  }


  comprobarSiHayRecursos() {
    if (this.recurso.length == 0) {
      this.visibilidadTablaRecurso = false;
      this.botonSeccionRecurso = true;
    } else {
      this.visibilidadTablaRecurso = true;
      this.botonSeccionRecurso = false;
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

      swal.fire(
        'Enviado',
        `Estrategia agregado exitosamente!`,
        'success'
      )

    }

  }


  obtener_Estrategias() {
    const name2 = localStorage.getItem('Estrategias');

    if (name2) {
      this.listaEstrategiasStorage = localStorage.getItem("Estrategias");
      this.estrategia = JSON.parse(this.listaEstrategiasStorage);
      this.comprobarSiHayEstrategias();
    }
  }


  comprobarSiHayEstrategias() {
    if (this.estrategia.length == 0) {
      this.visibilidadTablaEstrategia = false;
      this.botonSeccionEstrategia = true;
    } else {
      this.visibilidadTablaEstrategia = true;
      this.botonSeccionEstrategia = false;
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

      swal.fire(
        'Enviado',
        `Necesidad agregado exitosamente!`,
        'success'
      )

    }

  }


  obtener_Necesidades() {
    const name3 = localStorage.getItem('Necesidades');

    if (name3) {
      this.listaNecesidadesStorage = localStorage.getItem("Necesidades");
      this.necesidad = JSON.parse(this.listaNecesidadesStorage);
      this.comprobarSiHayNecesidades();
    }
  }


  comprobarSiHayNecesidades() {
    if (this.necesidad.length == 0) {
      this.visibilidadTablaNecesidad = false;
      this.botonSeccionNecesidad = true;
    } else {
      this.visibilidadTablaNecesidad = true;
      this.botonSeccionNecesidad = false;
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


  //GENERAR DOCUMENTO
  
  /*
  
  generateDocumento(nom:any) {
    loadFile("http://localhost:8082/files/anexo1.docx", function(
      error,
      content
    ) {
      if (error) {
        throw error;
      }


  
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
      doc.setData({
        rpp: nom,
        numestudiantes: "2501"
      });
      try {
        // Se reemplaza en el documento: {rpp} -> John, {numestudiantes} -> Doe ....
        doc.render();
      } catch (error) {
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
        function replaceErrors(key, value) {
          if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function(
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
            .map(function(error) {
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
      saveAs(out, "output.docx");
    });
  }
*/
}