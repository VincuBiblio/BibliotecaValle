import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosporedadesComponent } from './usuariosporedades.component';

describe('UsuariosporedadesComponent', () => {
  let component: UsuariosporedadesComponent;
  let fixture: ComponentFixture<UsuariosporedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosporedadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosporedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
