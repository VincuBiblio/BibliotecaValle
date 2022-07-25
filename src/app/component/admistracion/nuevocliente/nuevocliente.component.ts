import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Personausuario} from "../../../models/personausuario";
import {UbicacionService} from "../../../services/ubicacion.service";
import {Barrio, Canton, Parroquia, Provincia} from "../../../models/ubicacion";
import {MatSelectChange} from "@angular/material/select";
import {ClienteService} from "../../../services/cliente.service";
import Swal from "sweetalert2";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";


export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-nuevocliente',
  templateUrl: './nuevocliente.component.html',
  styleUrls: ['./nuevocliente.component.css']
})
export class NuevoclienteComponent implements OnInit {



  displayedColumns: string[] = ['id', 'cedula', 'nombres', 'apellidos','edad','genero','email','telefono','discapacidad','editar'];
  dataSource: MatTableDataSource<Personausuario>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


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
    this.listarClientes()
  }

  listarClientes(){
    this.clienteService.getAllClientes().subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
          text: 'Error '+error.error.message,
          confirmButtonColor: '#a01b20',
        })
      })
    }
  }

  guardarCliente() {
    this.clienteService.saveCliente(this.formGrupos.getRawValue()).subscribe(value => {
      this.vaciarFormulario()
      this.listarClientes()
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
    }, error => {
      this.listarClientes()
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
        title: 'Hubo un error, cliente no registrada'
      })
    })
  }



  vaciarFormulario(){
    this.formGrupos.setValue({
      apellidos: "",
      cedula: "",
      discapacidad: false,
      email: "",
      estadoCivil: "",
      fechaNacimiento: null,
      idBarrio: 0,
      idCanton: 0,
      idParroquia: 0,
      idProvincia: 0,
      nombres: "",
      telefono: "",
      genero: null})
  }

}
/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}
