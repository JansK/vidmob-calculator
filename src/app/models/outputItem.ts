import { Output } from '../interfaces/output';
export class OutPutItem implements Output {
  title: string;
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}
