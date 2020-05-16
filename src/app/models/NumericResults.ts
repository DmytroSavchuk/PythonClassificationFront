export class NumericResults {
  constructor(
    public fit_time: number,
    public test_accuracy: number,
    public test_prediction_time: number,
    public train_accuracy: number,
    public train_prediction_time: number
  ) {
  }
}
