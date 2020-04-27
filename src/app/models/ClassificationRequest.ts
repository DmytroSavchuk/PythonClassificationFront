export class ClassificationRequest {
  public polynomialName: string;
  public classifierName: string;
  public classifierParamsDictionary: Map<string, string> = new Map<string, string>();
  public polynomialParamsDictionary: Map<string, string> = new Map<string, string>();
  public getJSON() {
    return {
      polynomial_name: 'PolynomialFeatures',
      classifier_name: 'DecisionTreeClassifier',
      classifier_params_dictionary: {max_depth: null, min_samples_split: 2, random_state: 0},
      polynomial_params_dictionary: {degree: 2}
    };
  }
}
