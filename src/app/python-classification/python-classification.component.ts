import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ClassificationService} from '../services/classification.service';
import {Method} from '../models/Method';

@Component({
  selector: 'app-python-classification',
  templateUrl: './python-classification.component.html',
  styleUrls: ['./python-classification.component.css']
})
export class PythonClassificationComponent implements OnInit, OnChanges {
  @Input() method: Method;
  private object;
  testData: File = null;
  data: File = null;
  argumentsKeys = null;
  ifInitExecuted = false;
  constructor(private service: ClassificationService) {
  }

  ngOnInit(): void {
    this.argumentsKeys = Array.from(this.method.methodArgs.keys());
    this.ifInitExecuted = true;
    // for (const i of this.argumentsKeys)
    // {
    //   console.log(this.method.methodArgs.get(i));
    // }
    // console.log(this.argumentsKeys);
    // this.service.testData().subscribe(res => {
    //   this.object = res;
    //   console.log(res);
    // });
  }

  public onChangeDataFile(files: FileList){
    this.data = files[0];
    console.log(files);
  }

  public onChangeTestDataFile(files: FileList){
    this.testData = files[0];
    console.log(files);
  }

  public ngOnChanges(...args: any[]) {
    console.log('onChange fired');
    if (this.ifInitExecuted) {
      this.ngOnInit();
    }
  }
}
