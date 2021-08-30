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

    // if (node.hasOwnProperty('Identifier')) {
    //   if (context.Constants.hasOwnProperty(node.Identifier)) {
    //     return context.Constants[node.Identifier];
    //   }
    //   if (context.letiables.hasOwnProperty(node.Identifier)) {
    //     return context.letiables[node.Identifier];
    //   }
    //   throw new SyntaxError('Unknown identifier');
    // }

    // if (node.hasOwnProperty('Assignment')) {
    //   right = exec(node.Assignment.value);
    //   context.letiables[node.Assignment.name.Identifier] = right;
    //   return right;
    // }

    // if (node.hasOwnProperty('FunctionCall')) {
    //   expr = node.FunctionCall;
    //   if (context.Functions.hasOwnProperty(expr.name)) {
    //     args = [];
    //     for (i = 0; i < expr.args.length; i += 1) {
    //       args.push(exec(expr.args[i]));
    //     }
    //     return context.Functions[expr.name].apply(null, args);
    //   }
    //   throw new SyntaxError('Unknown ' + expr.name);
    // }

    throw new SyntaxError('Unknown syntax node');
  }

  evaluate(expr: string) {
    let tree = this.parser.parse(expr);
    return this.exec(tree);
  }

  // return {
  //   evaluate: evaluate,
  // };
}
