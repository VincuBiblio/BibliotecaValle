import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariospordispacidadComponent } from './usuariospordispacidad.component';

describe('UsuariospordispacidadComponent', () => {
  let component: UsuariospordispacidadComponent;
  let fixture: ComponentFixture<UsuariospordispacidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariospordispacidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariospordispacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
