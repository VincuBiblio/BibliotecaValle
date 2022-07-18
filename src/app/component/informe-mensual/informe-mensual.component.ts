import {Component,OnInit} from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';


@Component({
  selector: 'app-informe-mensual',
  templateUrl: './informe-mensual.component.html',
  styleUrls: ['./informe-mensual.component.css']
 
})

export class informeMensualComponent implements OnInit{
  title = 'informe';
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
 
  
  constructor(private _formBuilder: FormBuilder){

  }

  
  ngOnInit(): void{

  }
}
