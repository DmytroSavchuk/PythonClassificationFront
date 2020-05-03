import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ClassificationService} from '../services/classification.service';
import {Method} from '../models/Method';
import {ClassificationRequest} from '../models/ClassificationRequest';
import {TSMap} from 'typescript-map';
import {ResultService} from '../services/result.service';
import {FileResponse} from '../models/FileResponse';

@Component({
  selector: 'app-python-classification',
  templateUrl: './python-classification.component.html',
  styleUrls: ['./python-classification.component.css']
})
export class PythonClassificationComponent implements OnInit, OnChanges {
  @Input() method: Method;
  testData: FormData = new FormData();
  data: FormData = new FormData();
  argumentsKeys = null;
  ifInitExecuted = false;
  testDataFileName = '';
  dataFileName = '';
  resultOutput = false;
  testDataFileStatus: FileResponse;
  trainDataFileStatus: FileResponse;

  constructor(private service: ClassificationService, private resultService: ResultService) {
  }

  ngOnInit(): void {
    this.argumentsKeys = Array.from(this.method.methodArgs.keys());
    this.ifInitExecuted = true;
  }

  public onChangeDataFile(files: FileList) {
    this.dataFileName = files[0].name;
    this.data.append('file', files[0]);
    this.service.sendDataFile(this.data).subscribe(res => {
      this.trainDataFileStatus = res;
    });
  }

  public onChangeTestDataFile(files: FileList) {
    this.testDataFileName = files[0].name;
    this.testData.append('file', files[0]);
    this.service.sendTestDataFile(this.testData).subscribe(res => {
      this.testDataFileStatus = res;
    });
  }

  public ngOnChanges(...args: any[]) {
    if (this.ifInitExecuted) {
      this.ngOnInit();
      this.resultOutput = false;
    }
  }

  public submitButtonClicked() {
    this.resultOutput = false;
    let form;
    const mapOfArgs = {};
    const degreeMap = {
      degree: 2
    };
    for (const i of this.argumentsKeys) {
      form = (document.getElementById(i) as HTMLInputElement);
      if (form != null) {
        form.type === 'checkbox' ? console.log(form.checked) : console.log(form.value);
        mapOfArgs[i] = this.getValueFromForm(form);
      }

    }
    console.log(mapOfArgs);
    console.log(degreeMap);
    this.service.classify(new ClassificationRequest('PolynomialFeatures', this.method.name,
      mapOfArgs, degreeMap)).subscribe(response => {
      console.log(response);
      const map = new TSMap<string, string>().fromJSON(response);
      this.resultService.setMap(map);
      this.resultOutput = true;
    });
  }

  private getValueFromForm(form: HTMLInputElement) {
    switch (form.type) {
      case 'number_list':
        return null;
      case 'checkbox':
        return form.checked;
      case 'number':
        if (form.value === '') {
          return null;
        }
        return Number(form.value);
      case 'string':
        if (form.value === '') {
          return null;
        }
        return form.value;
    }
  }
}
