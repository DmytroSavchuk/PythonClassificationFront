import {Injectable} from '@angular/core';
import {TSMap} from 'typescript-map';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private map: TSMap<string, string> = null;
  private withImages;
  private allMethodResults: TSMap<string, TSMap<string, string>>;
  private methodName: string;

  constructor() {
  }

  public setMap(map: TSMap<string, string>) {
    this.map = map;
  }

  public getMap() {
    return this.map;
  }

  public setIsWithImages(withImages: boolean) {
    this.withImages = withImages;
  }

  public getIsWithImages() {
    return this.withImages;
  }

  public getMethodResults() {
    return this.allMethodResults;
  }

  public setAllMethodsResults(allMethodsResults: TSMap<string, TSMap<string, string>>) {
    this.allMethodResults = allMethodsResults;
  }

  public setMethodName(methodName: string) {
    this.methodName = methodName;
  }

  public getMethodName() {
    return this.methodName;
  }
}
