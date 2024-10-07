import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoitesComponent } from './boites.component';

describe('BoitesComponent', () => {
  let component: BoitesComponent;
  let fixture: ComponentFixture<BoitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoitesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
