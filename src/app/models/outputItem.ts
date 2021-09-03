import { Output } from '../interfaces/output';
/**
 * Class used to handle creation of OutputRowComponent
 */
export class OutPutItem implements Output {
  title: string;
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}
