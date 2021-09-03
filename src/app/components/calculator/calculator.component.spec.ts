import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CalculatorComponent } from './calculator.component';
import { OutputRowComponent } from '../output-row/output-row.component';

/*
 *  CalculatorComponent Logic Tests
 */
describe('CalculatorComponent Logic', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create an OutputItem', () => {
    const testTitle = 'Test Title';
    const testContent = 'Test Content';
    component.createOutputRow(testTitle, testContent);
    expect(component.outputRows.length).toEqual(1);
    expect(component.outputRows[0].title).toEqual(testTitle);
    expect(component.outputRows[0].content).toEqual(testContent);
  });

  it('should destroy outputRows', () => {
    component.createOutputRow('test', 'test');
    component.destroyOutputRows();
    expect(component.outputRows.length).toEqual(0);
  });
});

/*
 *   CalculatorComponent DOM Tests
 */
describe('CalculatorComponent DOM', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculatorComponent, OutputRowComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should render call to action', () => {
    expect(compiled.querySelector('h1').textContent).toBe(
      ' Enter your equationAn equation can only contain the following: numbers 0-9, +, -, *, /, ., and () below '
    );
  });

  it('should render equation input', () => {
    expect(compiled.querySelector('#equation').nodeName).toBe('INPUT');
  });

  it('should render Calculate button', () => {
    expect(compiled.querySelector('.calculate-button').textContent).toBe(
      ' Calculate '
    );
  });

  it('should render Reset button', () => {
    expect(compiled.querySelector('.reset-button').textContent).toBe('Reset');
  });

  it('should render an OutputRow', () => {
    const testTitle = 'Test Title';
    const testContent = 'Test Content';
    component.createOutputRow(testTitle, testContent);
    fixture.detectChanges();

    expect(compiled.querySelector('.output-title').textContent).toBe(testTitle);
    expect(compiled.querySelector('.output-content').textContent).toBe(
      testContent
    );
  });

  it('Form control should contain equation', () => {
    const equationInput: HTMLInputElement = compiled.querySelector('#equation');
    const equation = '1+1';

    equationInput.value = equation;
    equationInput.dispatchEvent(new Event('input'));

    expect(component.calculatorForm.get('equation')?.value).toBe(equation);
  });

  it('input element should contain equation', () => {
    const equationInput: HTMLInputElement = compiled.querySelector('#equation');
    const equation = '1+1';

    equationInput.value = equation;
    equationInput.dispatchEvent(new Event('input'));

    expect(equationInput.value).toBe(equation);
  });
});
