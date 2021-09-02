import { Expression } from './Expression';
import { Lexer } from './Lexer';
import { Token } from './Token';
import { TokenType } from '../../enums/TokenType';
import { ParsingError } from '../calculator.error/ParsingError';

export class Parser {
  lexer = new Lexer();

  constructor() {}

  matchOp(token: Token | undefined, op: string) {
    return (
      typeof token !== 'undefined' &&
      token.getType() === TokenType.Operator &&
      token.getValue() === op
    );
  }

  // ArgumentList := Expression |
  //                 Expression ',' ArgumentList
  parseArgumentList() {
    let token,
      expr,
      args = [];

    while (true) {
      expr = this.parseExpression();
      if (typeof expr === 'undefined') {
        // TODO maybe throw exception?
        break;
      }
      args.push(expr);
      token = this.lexer.peek();
      if (!this.matchOp(token, ',')) {
        break;
      }
      this.lexer.next();
    }

    return args;
  }

  // FunctionCall ::= Identifier '(' ')' ||
  //                  Identifier '(' ArgumentList ')'
  parseFunctionCall(name: string) {
    let token,
      args = [];

    token = this.lexer.next();
    if (!this.matchOp(token, '(')) {
      throw new ParsingError(
        'Expecting ( in a call "' + name + '"',
        this.lexer.index
      );
    }

    token = this.lexer.peek();
    if (!this.matchOp(token, ')')) {
      args = this.parseArgumentList();
    }

    token = this.lexer.next();
    if (!this.matchOp(token, ')')) {
      throw new ParsingError(
        'Expecting ) in a call "' + name + '"',
        this.lexer.index
      );
    }

    return {
      FunctionCall: {
        name: name,
        args: args,
      },
    };
  }

  // Primary ::= Identifier |
  //             Number |
  //             '(' Assignment ')' |
  //             FunctionCall
  parsePrimary() {
    let token, expr;

    token = this.lexer.peek();

    if (typeof token === 'undefined') {
      throw new ParsingError(
        'Unexpected termination of expression',
        this.lexer.index
      );
    }

    if (token.getType() === TokenType.Identifier) {
      token = this.lexer.next();
      if (this.matchOp(this.lexer.peek(), '(')) {
        return this.parseFunctionCall(token!.getValue());
      } else {
        return {
          Identifier: token!.getValue(),
        };
      }
    }

    if (token.getType() === TokenType.Number) {
      token = this.lexer.next();
      return {
        Number: token!.getValue(),
      };
    }

    if (this.matchOp(token, '(')) {
      this.lexer.next();
      expr = this.parseAssignment();
      token = this.lexer.next();
      if (!this.matchOp(token, ')')) {
        throw new ParsingError('Expecting )', this.lexer.index);
      }
      return {
        Expression: expr,
      };
    }

    throw new ParsingError(
      'Parse error, can not process token ' + token.getValue(),
      this.lexer.index
    );
  }

  // Unary ::= Primary |
  //           '-' Unary
  parseUnary(): any {
    let token, expr;

    token = this.lexer.peek();
    // if (this.matchOp(token, '-') || this.matchOp(token, '+')) {
    if (this.matchOp(token, '-')) {
      token = this.lexer.next();
      expr = this.parseUnary();
      if (this.matchOp(token, '-') && expr?.Unary?.operator === '+') {
        throw new ParsingError(
          'Cannot have more than 2 operators in series where the 2nd operator is not -',
          this.lexer.index
        );
      }
      if (
        token?.getType() === TokenType.Operator &&
        expr?.Unary?.operator &&
        expr?.Unary?.expression?.Unary?.operator
      ) {
        throw new ParsingError(
          'Cannot have 3 operators in a row',
          this.lexer.index
        );
      }
      return {
        Unary: {
          operator: token!.getValue(),
          expression: expr,
        },
      };
    }

    return this.parsePrimary();
  }

  // Multiplicative ::= Unary |
  //                    Multiplicative '*' Unary |
  //                    Multiplicative '/' Unary
  parseMultiplicative() {
    let expr, token;

    expr = this.parseUnary();
    token = this.lexer.peek();
    while (this.matchOp(token, '*') || this.matchOp(token, '/')) {
      token = this.lexer.next();
      expr = {
        Binary: {
          operator: token!.getValue(),
          left: expr,
          right: this.parseUnary(),
        },
      };
      token = this.lexer.peek();
    }
    return expr;
  }

  // Additive ::= Multiplicative |
  //              Additive '+' Multiplicative |
  //              Additive '-' Multiplicative
  parseAdditive() {
    let expr;
    let token: Token | undefined;

    expr = this.parseMultiplicative();
    token = this.lexer.peek();
    while (this.matchOp(token, '+') || this.matchOp(token, '-')) {
      token = this.lexer.next();
      // if (
      //   token?.getType() === TokenType.Operator &&
      //   expr?.Binary.right?.Unary.operator &&
      //   expr?.Binary.right?.Unary?.expression
      // ) {
      //   throw (
      //     (new ParsingError(
      //       // 'Cannot have more than 2 operators in series where the 2nd operator is not -'
      //       'test',
      //       this.lexer.index
      //     ),
      //     this.lexer.index)
      //   );
      // }
      expr = {
        Binary: {
          operator: token!.getValue(),
          left: expr,
          right: this.parseMultiplicative(),
        },
      };
      token = this.lexer.peek();
    }
    return expr;
  }

  // Assignment ::= Identifier '=' Assignment |
  //                Additive
  parseAssignment(): any {
    let token, expr;

    expr = this.parseAdditive();

    if (typeof expr !== 'undefined' && expr.Identifier) {
      token = this.lexer.peek();
      if (this.matchOp(token, '=')) {
        this.lexer.next();
        return {
          Assignment: {
            name: expr,
            value: this.parseAssignment(),
          },
        };
      }
      return expr;
    }

    return expr;
  }

  // Expression ::= Assignment
  parseExpression() {
    return this.parseAssignment();
  }

  parse(expression: string) {
    let expr, token;

    this.lexer.reset(expression);
    expr = this.parseExpression();

    token = this.lexer.next();
    if (typeof token !== 'undefined') {
      throw new ParsingError(
        'Unexpected token ' + token.getValue(),
        this.lexer.index
      );
    }

    return {
      Expression: expr,
    };
  }

  // return {
  //   parse: parse,
  // };
}
