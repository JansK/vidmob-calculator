/**
 * Custom error used to handle parsing errors that occur
 * is the Lexer and Parser classes
 */
export class ParsingError extends Error {
  index: number;

  constructor(msg: string, index: number) {
    super(msg);
    this.index = index;
    Object.setPrototypeOf(this, ParsingError.prototype);
  }
}
