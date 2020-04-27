import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Method} from '../models/Method';
import {ClassificationRequest} from '../models/ClassificationRequest';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {

  private link = 'https://python-classification-back.herokuapp.com';
  private localLink = 'http://127.0.0.1:5000';
  private classificationLink = `${this.localLink}/classification`;
  private dataLink = `${this.localLink}/train-data`;
  private testDataLink = `${this.localLink}/test-data`;

  constructor(private http: HttpClient) {
  }

  public testData() {
    return this.http.get(this.link + '/test-data');
  }

  public getMethods() {
    return this.http.get<Method[]>(this.localLink + '/classification/methods');
  }

  public classify(classificationRequest: ClassificationRequest) {
    this.http.post(this.classificationLink, classificationRequest.getJSON())
      .subscribe(response => console.log(response));
  }

  public sendDataFile(file: FormData) {
    this.http.post(this.dataLink, file)
      .subscribe(response => console.log(response));

  }

  public sendTestDataFile(file: FormData) {
    this.http.post(this.testDataLink, file)
      .subscribe(response => console.log(response));
  }
}
