import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Personausuario} from "../../../models/personausuario";
import {UbicacionService} from "../../../services/ubicacion.service";
import {Barrio, Canton, Parroquia, Provincia} from "../../../models/ubicacion";
import {MatSelectChange} from "@angular/material/select";
import {ClienteService} from "../../../services/cliente.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-nuevocliente',
  templateUrl: './nuevocliente.component.html',
  styleUrls: ['./nuevocliente.component.css']
})
export class NuevoclienteComponent implements OnInit {


  provicias: Provincia[] = [];
  cantones: Canton[] = [];
  parroquias: Parroquia[] = [];
  barrios: Barrio[] = [];


  cantonFiltrado: Canton[] = [];
  parroquiaFiltrado: Parroquia[] = [];

  constructor(private ubicacionService: UbicacionService,
              private clienteService: ClienteService) {
  }

  ngOnInit(): void {
    this.ubicacionService.getAllProvincias().subscribe(value => {
      this.provicias = value;
    })
    this.ubicacionService.getAllCantones().subscribe(value => {
      this.cantones = value;
    })
    this.ubicacionService.getAllParroquias().subscribe(value => {
      this.parroquias = value;
    })
    this.listarBarrios();
  }

  formGrupos = new FormGroup({
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

  selectProvincia(id?: MatSelectChange) {
    this.cantonFiltrado.length = 0;
    this.parroquiaFiltrado.length = 0;
    this.cantonFiltrado = this.cantones.filter(value => value.idProvincia == id.value);
  }

  selectCanton(id?: MatSelectChange) {
    this.parroquiaFiltrado.length = 0;
    this.parroquiaFiltrado = this.parroquias.filter(value => value.idCanton == id.value);
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
        Swal.fire({
          text: 'Parroquia guardada',
          confirmButtonColor: '#6897b7',
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
    this.clienteService.saveCliente(this.formGrupos.getRawValue()).subscribe(value => {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Cliente registrado',
        showConfirmButton: false,
        timer: 500
      })
    }, error => {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Cliente no registrado',
        showConfirmButton: false,
        timer: 500
      })
    })
    console.log(this.formGrupos.getRawValue())
  }


}
