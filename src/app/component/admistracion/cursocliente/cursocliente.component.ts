import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Curso} from "../../../models/curso";
import {map, Observable, startWith} from "rxjs";
import {CursoService} from "../../../services/curso.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ClienteService} from "../../../services/cliente.service";
import {MatSelectionListChange} from "@angular/material/list";
import {Clientecurso, Personausuario} from "../../../models/personausuario";

@Component({
  selector: 'app-cursocliente',
  templateUrl: './cursocliente.component.html',
  styleUrls: ['./cursocliente.component.css']
})
export class CursoclienteComponent implements OnInit {


  filteredOptionsclientes?: Observable<Personausuario[]>;
  isLinear = true;
  primerForm!: FormGroup;
  thirdFormGroup?: FormGroup;
  cursos?: Curso[] = [];
  myControl = new FormControl();
  filteredOptions?: Observable<Curso[]>;
  seleccionCurso: Curso= new Curso();
  personausuarioselect: Personausuario = new Personausuario();
  cursocliente: Clientecurso= new Clientecurso();
  clienteslista: Personausuario[] = [];
  issloading = true;


  myControlClientes = new FormControl();

  constructor(private router: Router,
              private _formBuilder: FormBuilder,
              private clienteService: ClienteService,
              private activatedRoute: ActivatedRoute,
              private cursoService: CursoService) {
  }

  ngOnInit(): void {
      this.cursoService.getAll().subscribe(value => {
        this.cursos = value;
        console.log(this.cursos)
        this.clienteService.getAllClientes().subscribe(value => {
          this.clienteslista = value.filter(value1 => value1.estadoCivil != null);
          this.filteredOptionsclientes = this.myControlClientes.valueChanges.pipe(
            startWith(''),
            map(values => this.filter(values)),
          )
          this.issloading = false;
        })
      });

    this.primerForm = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({});

  }
  filter(value: any): Personausuario[] {
    const filterValue = value.toLowerCase();
    return this.clienteslista.filter(option => option.nombres?.toLowerCase().includes(filterValue)
      || option.cedula?.toLocaleLowerCase().includes(filterValue)
    );
  }
  selectionCurso(idcurso: MatSelectionListChange) {
    this.seleccionCurso = idcurso.options.pop().value;
    console.log(this.seleccionCurso)
  }
  seleccionclientes(idcliente: MatSelectionListChange) {
    this.personausuarioselect=idcliente.options.pop().value;
    console.log(this.personausuarioselect)
  }


  agregaralcurso() {
    this.cursoService.agregarclienteacurso(this.personausuarioselect.idCliente,this.seleccionCurso.id).subscribe(data => {
      Swal.fire({
        title: 'Cliente agregado a curso',
        confirmButtonColor: "#3e5b62",
        color: '#000000',
        background: "linear-gradient(#a3c6d3,#ffffff)",
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      this.router.navigate(['/panel/biblioteca/home']);
    }, err => {
      Swal.fire({
        title: 'Seleccione el Cliente',
        confirmButtonColor: "#3e5b62",
        color: '#000000',
        background: "linear-gradient(#a3c6d3,#ffffff)",
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    })
  }
}
