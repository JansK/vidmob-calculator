export class Token {
  type: string;
  value: string;
  start?: number;
  end?: number;

  constructor(type: string, value: string, start: number, end: number) {
    this.type = type;
    this.value = value;
    this.start = start;
    this.end = end;
  }
}
