import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Curso} from "../../../models/curso";
import {Router} from "@angular/router";
import {Taller} from "../../../models/taller";

@Component({
  selector: 'app-taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.css']
})
export class TallerComponent implements OnInit {

  isLinear = true;
  firstFormGroup!: FormGroup;
  taller: Taller = new Taller();

  constructor(private router: Router,private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      nombretaller: ['', Validators.required],
      responsable: ['', Validators.required],
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
    });
  }

}
