import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Curso} from "../../../models/curso";
import {Router} from "@angular/router";

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  isLinear = true;
  firstFormGroup!: FormGroup;
  curso: Curso = new Curso();

  constructor(private router: Router,private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      nombrecurso: ['', Validators.required],
      responsable: ['', Validators.required],
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
    });
  }

}
