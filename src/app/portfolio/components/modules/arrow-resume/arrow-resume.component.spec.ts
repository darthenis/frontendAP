import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowResumeComponent } from './arrow-resume.component';

describe('ArrowResumeComponent', () => {
  let component: ArrowResumeComponent;
  let fixture: ComponentFixture<ArrowResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrowResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
