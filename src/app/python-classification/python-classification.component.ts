import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ClassificationService} from '../services/classification.service';
import {Method} from '../models/Method';
import {ClassificationRequest} from '../models/ClassificationRequest';

@Component({
  selector: 'app-python-classification',
  templateUrl: './python-classification.component.html',
  styleUrls: ['./python-classification.component.css']
})
export class PythonClassificationComponent implements OnInit, OnChanges {
  @Input() method: Method;
  private object;
  testData: FormData = new FormData();
  data: FormData = new FormData();
  argumentsKeys = null;
  ifInitExecuted = false;

  constructor(private service: ClassificationService) {
  }

  ngOnInit(): void {
    this.argumentsKeys = Array.from(this.method.methodArgs.keys());
    this.ifInitExecuted = true;
  }

  public onChangeDataFile(files: FileList) {
    this.data.append('file', files[0]);
    this.service.sendDataFile(this.data);
    console.log(files);
  }

  public onChangeTestDataFile(files: FileList) {
    this.testData.append('file', files[0]);
    this.service.sendTestDataFile(this.testData);
    console.log(files);
  }

  public ngOnChanges(...args: any[]) {
    console.log('onChange fired');
    if (this.ifInitExecuted) {
      this.ngOnInit();
    }
  }

  public submitButtonClicked() {
    let form;
    for (const i of this.argumentsKeys) {
      form = (document.getElementById(i) as HTMLInputElement);
      form.type === 'checkbox' ? console.log(form.checked) : console.log(form.value);
    }
    this.service.classify(new ClassificationRequest());
  }
}
