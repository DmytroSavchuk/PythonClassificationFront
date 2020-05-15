import {ArgumentProperties} from './ArgumentProperties';

export class Method {
  constructor(
    public name: string,
    public label: string,
    public methodArgs: Map<string, ArgumentProperties> = new Map<string, ArgumentProperties>(),
  ) {
  }
}
