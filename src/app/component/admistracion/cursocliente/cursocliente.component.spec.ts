import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoclienteComponent } from './cursocliente.component';

describe('CursoclienteComponent', () => {
  let component: CursoclienteComponent;
  let fixture: ComponentFixture<CursoclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoclienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
