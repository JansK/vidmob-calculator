export class ParsingError extends Error {
  index: number;

  constructor(msg: string, index: number) {
    super(msg);
    this.index = index;
    Object.setPrototypeOf(this, ParsingError.prototype);
  }
}
