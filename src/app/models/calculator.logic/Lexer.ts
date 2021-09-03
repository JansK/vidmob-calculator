import { Token } from './Token';
import { TokenType } from '../../enums/TokenType';
import { ParsingError } from '../calculator.error/ParsingError';

/**
 * The Lexer class takes each character in the equation and
 * creates the appropriate token (Number, Operator, or Identifier)
 */
export class Lexer {
  expression = '';
  length = 0;
  index = 0;
  marker = 0;

  constructor() {}

  peekNextChar(this: any) {
    let idx = this.index;
    return idx < this.length ? this.expression.charAt(idx) : '\x00';
  }

  getNextChar() {
    let ch = '\x00',
      idx = this.index;
    if (idx < this.length) {
      ch = this.expression.charAt(idx);
      this.index += 1;
    }
    return ch;
  }

  isWhiteSpace(ch: string) {
    return ch === '\u0009' || ch === ' ' || ch === '\u00A0';
  }

  isLetter(ch: string | number) {
    return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
  }

  isDecimalDigit(ch: string | number) {
    return ch >= '0' && ch <= '9';
  }

  createToken(type: string, value: string) {
    return new Token(type, value, this.marker, this.index - 1);
  }

  skipSpaces() {
    let ch;

    while (this.index < this.length) {
      ch = this.peekNextChar();
      if (!this.isWhiteSpace(ch)) {
        break;
      }
      this.getNextChar();
    }
  }

  scanOperator() {
    let ch = this.peekNextChar();
    if ('+-*/()'.indexOf(ch) >= 0) {
      return this.createToken(TokenType.Operator, this.getNextChar());
    }
    return undefined;
  }

  isIdentifierStart(ch: string) {
    return ch === '_' || this.isLetter(ch);
  }

  isIdentifierPart(ch: string) {
    return this.isIdentifierStart(ch) || this.isDecimalDigit(ch);
  }

  scanIdentifier() {
    let ch, id;

    ch = this.peekNextChar();
    if (!this.isIdentifierStart(ch)) {
      return undefined;
    }

    id = this.getNextChar();
    while (true) {
      ch = this.peekNextChar();
      if (!this.isIdentifierPart(ch)) {
        break;
      }
      id += this.getNextChar();
    }

    return this.createToken(TokenType.Identifier, id);
  }

  scanNumber() {
    let ch, number;

    ch = this.peekNextChar();
    if (!this.isDecimalDigit(ch) && ch !== '.') {
      return undefined;
    }

    number = '';
    if (ch !== '.') {
      number = this.getNextChar();
      while (true) {
        ch = this.peekNextChar();
        if (!this.isDecimalDigit(ch)) {
          break;
        }
        number += this.getNextChar();
      }
    }

    if (ch === '.') {
      number += this.getNextChar();
      while (true) {
        ch = this.peekNextChar();
        if (!this.isDecimalDigit(ch)) {
          break;
        }
        number += this.getNextChar();
      }
    }

    if (number === '.') {
      throw new ParsingError(
        'Expecting decimal digits after the dot sign',
        this.index
      );
    }

    return this.createToken(TokenType.Number, number);
  }

  reset(str: string) {
    this.expression = str;
    this.length = str.length;
    this.index = 0;
  }

  // Scans the next character in the equation and creates the appropriate token
  next() {
    let token;

    this.skipSpaces();
    if (this.index >= this.length) {
      return undefined;
    }

    this.marker = this.index;

    token = this.scanNumber();
    if (typeof token !== 'undefined') {
      return token;
    }

    token = this.scanOperator();
    if (typeof token !== 'undefined') {
      return token;
    }

    token = this.scanIdentifier();
    if (typeof token !== 'undefined') {
      return token;
    }

    throw new ParsingError(
      'Unknown token from character ' + this.peekNextChar(),
      this.index
    );
  }

  // Looks at the character that comes after the token currently being evaluated
  peek() {
    let token, idx;

    idx = this.index;

    token = this.next();
    if (typeof token !== 'undefined') {
      delete token.start;
      delete token.end;
    } else {
      token = undefined;
    }
    this.index = idx;

    return token;
  }
}
