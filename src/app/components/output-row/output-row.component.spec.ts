import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';

import { OutputRowComponent } from './output-row.component';

describe('OutputRowComponent', () => {
  let component: OutputRowComponent;
  let fixture: ComponentFixture<OutputRowComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutputRowComponent],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputRowComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add error class', () => {
    component.title = 'Error';
    fixture.detectChanges();
    expect(compiled.querySelector('.output-title-error').textContent).toBe(
      'Error'
    );
  });
});
