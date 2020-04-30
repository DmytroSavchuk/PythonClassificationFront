import { Injectable } from '@angular/core';
import { TSMap } from 'typescript-map';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private map: TSMap<string, string> = new TSMap<string, string>();

  constructor() { }

  public setMap(map: TSMap<string, string>){
    this.map = map;
    console.log(this.map + ' in setter');
  }

  public getMap(){
    console.log(this.map + ' in getter');
    return this.map;
  }
}
