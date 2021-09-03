import { Injectable } from '@angular/core';
import { Evaluator } from '../models/calculator.logic/Evaluator';

@Injectable({
  providedIn: 'root',
})
export class EvaluationService {
  evaluator = new Evaluator();
  constructor() {}

  evaluateEquation(input: string): any {
    return this.evaluator.evaluate(input);
  }
}
