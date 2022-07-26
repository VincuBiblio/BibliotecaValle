import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Curso} from "../../../models/curso";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {CursoService} from "../../../services/curso.service";
import {range} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {Personausuario} from "../../../models/personausuario";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'fechainicio', 'fechafin','responsable','editar'];
  dataSource: MatTableDataSource<Curso>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  isLinear = true;
  firstFormGroup!: FormGroup;
  curso: Curso = new Curso();

  constructor(private router: Router, private _formBuilder: FormBuilder, private cursoService: CursoService) {
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      nombrecurso: ['', Validators.required],
      responsable: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required]
    });
    this.listarCursos()
  }


  listarCursos(){
    this.cursoService.getAll().subscribe(value => {
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


  guardarcurso(curso: Curso) {
    this.cursoService.savecurso(this.curso).subscribe(data => {
      console.log(this.curso)
      Swal.fire({
        title: 'Curso Creado',
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
      ///lista de cursos

    }, err => {
      Swal.fire({
        title: 'No se pudo crear el curso',
        text: err.error.message,
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
