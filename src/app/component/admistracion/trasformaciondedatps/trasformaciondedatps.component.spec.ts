import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasformaciondedatpsComponent } from './trasformaciondedatps.component';

describe('TrasformaciondedatpsComponent', () => {
  let component: TrasformaciondedatpsComponent;
  let fixture: ComponentFixture<TrasformaciondedatpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrasformaciondedatpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrasformaciondedatpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
