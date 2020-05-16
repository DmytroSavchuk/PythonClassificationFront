import {Component, OnInit} from '@angular/core';
import {Method} from './models/Method';
import {ClassificationService} from './services/classification.service';
import {ArgumentProperties} from './models/ArgumentProperties';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public methods: Method[] = [];
  public chosenMethod: Method;
  public separatedMethod: Method;

  constructor(private service: ClassificationService) {
    this.separatedMethod = new Method('Classify With All Methods', 'Classify With All Methods', null);
  }

  private initializeMethods() {
    this.service.getMethods().subscribe(method => {
      for (const i of method) {
        i.methodArgs = new Map<string, ArgumentProperties>(Object.entries(i.methodArgs));
      }
      this.methods = method;
    });
  }

  ngOnInit(): void {
    this.initializeMethods();
  }

  setChosenMethod(method: Method) {
    this.chosenMethod = method;
  }

}
