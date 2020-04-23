import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Method} from '../models/Method';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {

  private link = 'https://python-classification-back.herokuapp.com/';
  private localLink = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) {
  }

  public testData() {
    return this.http.get(this.link + '/test-data');
  }
  public getMethods() {
    return this.http.get<Method[]>(this.localLink + '/classification/methods');
  }
}
