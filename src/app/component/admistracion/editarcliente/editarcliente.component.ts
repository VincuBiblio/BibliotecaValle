import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClienteService} from "../../../services/cliente.service";
import {Barrio, Canton, Parroquia, Provincia} from "../../../models/ubicacion";
import {UbicacionService} from "../../../services/ubicacion.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";
import Swal from "sweetalert2";
import {Personausuario} from "../../../models/personausuario";

@Component({
  selector: 'app-editarcliente',
  templateUrl: './editarcliente.component.html',
  styleUrls: ['./editarcliente.component.css']
})
export class EditarclienteComponent implements OnInit {


  provicias: Provincia[] = [];
  cantones: Canton[] = [];
  parroquias: Parroquia[] = [];
  barrios: Barrio[] = [];

  cantonFiltrado: Canton[] = [];
  parroquiaFiltrado: Parroquia[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private ubicacionService: UbicacionService,
              private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.cargardatos()
    this.listarBarrios();
  }


  cargardatos(){
    this.ubicacionService.getAllProvincias().subscribe(value => {
      this.provicias = value;
      this.ubicacionService.getAllCantones().subscribe(value => {
        this.cantones = value;
        this.ubicacionService.getAllParroquias().subscribe(value => {
          this.parroquias = value;
          this.activatedRoute.params.subscribe(params => {
            this.clienteService.getAllClientes().subscribe(value => {
              var cliente:Personausuario =value.filter(value1 => value1.id==params['id'])[0]
              this.selectProvincia(cliente.idProvincia);
              this.selectCanton(cliente.idCanton);
              this.formGrupos.setValue({
                id:cliente.id,
                edad:cliente.edad,
                apellidos: cliente.apellidos,
                cedula: cliente.cedula,
                discapacidad: cliente.discapacidad,
                email: cliente.email,
                estadoCivil: cliente.estadoCivil,
                fechaNacimiento: cliente.fechaNacimiento,
                genero: cliente.genero,
                idBarrio: cliente.idBarrio,
                idCanton: cliente.idCanton,
                idParroquia: cliente.idParroquia,
                idProvincia: cliente.idProvincia,
                nombres: cliente.nombres,
                telefono: cliente.telefono
              })
            })
          })
        })
      })
    })
  }

  formGrupos = new FormGroup({
    id: new FormControl<Number>(null),
    edad: new FormControl<String>(''),
    cedula: new FormControl<String>('', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("[0-9]+")]),
    apellidos: new FormControl<String>('', [Validators.required]),
    nombres: new FormControl<String>('', [Validators.required]),
    fechaNacimiento: new FormControl<Date>(null, [Validators.required]),
    genero: new FormControl<String>('', [Validators.required]),
    telefono: new FormControl<String>('', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("[0-9]+")]),
    email: new FormControl<String>('', [Validators.required, Validators.email]),
    estadoCivil: new FormControl<String>('', [Validators.required]),
    discapacidad: new FormControl<boolean>(null, [Validators.required]),
    idBarrio: new FormControl<Number>(null, [Validators.required]),
    idCanton: new FormControl<Number>(null, [Validators.required]),
    idProvincia: new FormControl<Number>(null, [Validators.required]),
    idParroquia: new FormControl<Number>(null, [Validators.required]),
  })

  selectProvincia(id?: Number) {
    this.cantonFiltrado.length = 0;
    this.parroquiaFiltrado.length = 0;
    this.cantonFiltrado = this.cantones.filter(value => value.idProvincia == id);
  }

  selectCanton(id?: Number) {
    this.parroquiaFiltrado.length = 0;
    this.parroquiaFiltrado = this.parroquias.filter(value => value.idCanton == id);
  }

  listarBarrios() {
    this.ubicacionService.getAllBarrios().subscribe(value => {
      this.barrios = value;
    })
  }

  async nuevoBarrios() {
    const {value: text} = await Swal.fire({
      title: 'Ingrese el barrio',
      input: 'text',
      confirmButtonColor: '#a01b20',
    })

    if (text) {
      console.log(text)
      var barrio: Barrio = new Barrio();
      barrio.barrio = text + "";
      this.ubicacionService.saveBarrio(barrio).subscribe(value => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Barrio guardado'
        })
        this.listarBarrios();
      }, error => {
        Swal.fire({
          text: 'Error',
          confirmButtonColor: '#a01b20',
        })
      })
    }
  }

  guardarCliente() {
    this.clienteService.updateCliente(this.formGrupos.getRawValue()).subscribe(value => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Cliente guardado'
      })
      this.cargardatos()
    }, error => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'error',
        title: 'Hubo un error, cliente no registrado. '+ error.error.message
      })
    })
  }

}
