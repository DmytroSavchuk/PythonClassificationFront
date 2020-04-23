import {Component, OnInit} from '@angular/core';
import {Method} from './models/Method';
import {ClassificationService} from './services/classification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DataVisualisation';
  public methods: Method[] = [];
  public chosenMethod: Method;
  public arrayOfArg;
  constructor(private service: ClassificationService) {
  }

  private initializeMethods() {
    this.service.getMethods().subscribe(method => {
      // for (const i of method){
      //   const map = new Map<string, string>(Object.entries(i.methodArgs));
      //   this.methods.push(new Method(i.name, map));
      // }
      for (const i of method) {
        i.methodArgs = new Map<string, string>(Object.entries(i.methodArgs));
      }
      this.methods = method;
      console.log('_________________________________');
    });
  }

  ngOnInit(): void {
    this.initializeMethods();
  }

  setChosenMethod(method: Method) {
    this.chosenMethod = method;
  }

}
