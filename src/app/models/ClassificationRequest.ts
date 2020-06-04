export class ClassificationRequest {
  constructor(
    public polynomialName: string,
    public classifierName: string,
    public classifierParamsDictionary: object,
    public polynomialParamsDictionary: object,
  ) {
  }

  public getJSON() {
    return {
      polynomial_name: this.polynomialName,
      classifier_name: this.classifierName,
      classifier_params_dictionary: this.classifierParamsDictionary,
      polynomial_params_dictionary: this.polynomialParamsDictionary,
    };
  }
}
