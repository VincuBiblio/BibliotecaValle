import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Curso} from "../../../models/curso";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {CursoService} from "../../../services/curso.service";
import {range} from "rxjs";

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  isLinear = true;
  firstFormGroup!: FormGroup;
  curso: Curso = new Curso();

  constructor(private router: Router, private _formBuilder: FormBuilder, private cursoService: CursoService) {
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      nombrecurso: ['', Validators.required],
      responsable: ['', Validators.required],
      // start: new FormControl<Date | null>(null),
      // end: new FormControl<Date | null>(null),
      start: ['', Validators.required],
      end: ['', Validators.required]
    });
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
      this.router.navigate(['/panel/biblioteca']);
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
