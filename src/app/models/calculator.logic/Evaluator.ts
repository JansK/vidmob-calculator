import { Parser } from './Parser';

/**
 * The Evaluator class is an interpreter that computes
 * the result of the syntax tree returned from the parser
 *
 * Please note the core of this logic was taken from Ariya Hidayat
 * at the following repo, https://github.com/ariya/tapdigit.
 * I have performed modifications where necessary to have the
 * syntactic analysis work within the constraints set out
 * by the exercise requirements.
 *
 * Also, ideally this logic would be unit tested but didn't have the time to do so
 */
export class Evaluator {
  parser = new Parser();

  constructor() {}

  // Recursively evaluates the syntax tree returned from the parser
  exec(node: any): any {
    let left, right, expr, args, i;

    if (node.hasOwnProperty('Expression')) {
      return this.exec(node.Expression);
    }

    if (node.hasOwnProperty('Number')) {
      return parseFloat(node.Number);
    }

    if (node.hasOwnProperty('Binary')) {
      node = node.Binary;
      left = this.exec(node.left);
      right = this.exec(node.right);
      switch (node.operator) {
        case '+':
          return left + right;
        case '-':
          return left - right;
        case '*':
          return left * right;
        case '/':
          return left / right;
        default:
          throw new SyntaxError('Unknown operator ' + node.operator);
      }
    }

    if (node.hasOwnProperty('Unary')) {
      node = node.Unary;
      expr = this.exec(node.expression);
      switch (node.operator) {
        case '+':
          return expr;
        case '-':
          return -expr;
        default:
          throw new SyntaxError('Unknown operator ' + node.operator);
      }
    }

    throw new SyntaxError('Unknown syntax node');
  }

  evaluate(expr: string) {
    let tree = this.parser.parse(expr);

    return this.exec(tree);
  }
}
