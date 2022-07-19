import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosporgenerosComponent } from './usuariosporgeneros.component';

describe('UsuariosporgenerosComponent', () => {
  let component: UsuariosporgenerosComponent;
  let fixture: ComponentFixture<UsuariosporgenerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosporgenerosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosporgenerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
