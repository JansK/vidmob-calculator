import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Evaluator } from 'src/app/models/calculator.logic/Evaluator';
import { OutPutItem } from 'src/app/models/outputItem';
import { OutputRowComponent } from '../output-row/output-row.component';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  input = '';
  calculatorForm = new FormGroup({
    equation: new FormControl('', Validators.required),
  });
  evaluator = new Evaluator();
  outputRows: OutPutItem[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {}

  get equation() {
    return this.calculatorForm.get('equation');
  }

  onSubmit() {
    this.destroyOutputRows();
    try {
      this.createOutputRow(
        'Result',
        this.evaluator.evaluate(this.calculatorForm.get('equation')?.value)
      );
    } catch (err) {
      if (err && err.message) {
        // this.result = `${err.message} at character ${err.index}`;
        this.createOutputRow(
          'Error',
          `${err.message} at character ${err.index}`
        );
      } else {
        // this.result = 'There was an error parsing your input';
        this.createOutputRow('Error', `There was an error parsing your input`);
      }
    }
  }

  createOutputRow(title: string, content: string) {
    this.outputRows.push(new OutPutItem(title, content));
  }

  destroyOutputRows() {
    this.outputRows = [];
  }
}
