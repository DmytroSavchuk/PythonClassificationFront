import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Method} from '../models/Method';
import {ClassificationRequest} from '../models/ClassificationRequest';
import {Observable} from 'rxjs';
import {FileResponse} from '../models/FileResponse';


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
    return this.http.post<FileResponse>(this.dataLink, file);
  }

  public sendTestDataFile(file: FormData) {
    return this.http.post<FileResponse>(this.testDataLink, file);
  }

  public getResultsInFile(): Observable<any>{
    return this.http.post((this.link + '/classification-data'), {});
  }
}
