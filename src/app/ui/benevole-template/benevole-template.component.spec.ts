import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenevoleTemplateComponent } from './benevole-template.component';

describe('BenevoleTemplateComponent', () => {
  let component: BenevoleTemplateComponent;
  let fixture: ComponentFixture<BenevoleTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BenevoleTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BenevoleTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
