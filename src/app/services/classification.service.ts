import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Method} from '../models/Method';
import {ClassificationRequest} from '../models/ClassificationRequest';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClassificationService {

  private link = 'https://python-classification-back.herokuapp.com';
  private localLink = 'http://127.0.0.1:5000';
  private classificationLink = `${this.link}/classification`;
  private dataLink = `${this.link}/train-data`;
  private testDataLink = `${this.link}/test-data`;

  constructor(private http: HttpClient) {
  }

  public getMethods() {
    return this.http.get<Method[]>(this.link + '/classification/methods');
  }

  public classify(classificationRequest: ClassificationRequest) {
    return this.http.post(this.classificationLink, classificationRequest.getJSON());
  }

  public sendDataFile(file: FormData) {
    this.http.post(this.dataLink, file)
      .subscribe(response => console.log(response));

  }

  public sendTestDataFile(file: FormData) {
    this.http.post(this.testDataLink, file)
      .subscribe(response => console.log(response));
  }

  public getResultsInFile(): Observable<any>{
    return this.http.post((this.link + '/classification-data'), {});
  }
}
