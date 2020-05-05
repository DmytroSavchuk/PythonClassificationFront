export class Method {
  constructor(
    public name: string,
    public methodArgs: Map<string, string> = new Map<string, string>(),
  ) {
  }
}
