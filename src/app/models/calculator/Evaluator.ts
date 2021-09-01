import { Parser } from './Parser';

export class Evaluator {
  parser = new Parser();

  constructor() {}

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
    let tree = null;
    try {
      tree = this.parser.parse(expr);
    } catch (err) {
      if (err && err.message) {
        return err.message;
      } else {
        return 'There was an error parsing your input';
      }
    }
    return this.exec(tree);
  }
}
