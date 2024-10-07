import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBoxeComponent } from './new-boxe.component';

describe('NewBoxeComponent', () => {
  let component: NewBoxeComponent;
  let fixture: ComponentFixture<NewBoxeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewBoxeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewBoxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
