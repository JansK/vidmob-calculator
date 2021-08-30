import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Evaluator } from 'src/app/models/Evaluator';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  input = '';
  calculatorForm = new FormGroup({
    equation: new FormControl(''),
  });
  evaluator = new Evaluator();
  result: any;

  constructor() {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.calculatorForm = new FormGroup({
      expression: new FormControl(''),
    });
  }

  onSubmit() {
    this.result = this.evaluator.evaluate(this.calculatorForm.value);
  }
}
