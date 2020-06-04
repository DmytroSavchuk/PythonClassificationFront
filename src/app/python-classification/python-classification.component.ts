import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ClassificationService} from '../services/classification.service';
import {Method} from '../models/Method';
import {ClassificationRequest} from '../models/ClassificationRequest';
import {TSMap} from 'typescript-map';
import {ResultService} from '../services/result.service';
import {FileResponse} from '../models/FileResponse';
import {ArgumentProperties} from '../models/ArgumentProperties';
import {MethodResults} from '../models/MethodResults';

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
  withImages: boolean;
  pasxalka: 'I love Izumin';

  constructor(private service: ClassificationService, private resultService: ResultService) {
  }

  ngOnInit(): void {
    this.withImages = false;
    console.log(this.method.methodArgs);
    if (this.method.label !== 'Classify With All Methods') {
      this.argumentsKeys = Array.from(this.method.methodArgs.keys());
      const arr = Array.from(this.method.methodArgs.values());
      for (const i of this.method.methodArgs.values()) {
        if (i.type === 'STRING_ENUM') {
          const index = i.possibleValues.indexOf(i.defaultValue);
          if (index > -1) {
            i.possibleValues.splice(index, 1);
          }
        }
      }
    }
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

  public ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
    this.resultOutput = false;
    this.method = changes.method.currentValue;
  }


  public submitButtonClicked() {
    this.resultOutput = false;
    let form;
    const mapOfArgs = {};
    const degreeMap = {
      degree: 2
    };
    if (this.method.label !== 'Classify With All Methods') {
      for (const i of this.argumentsKeys) {
        form = (document.getElementById(i) as HTMLInputElement);
        if (form != null) {
          mapOfArgs[i] = this.getValueFromForm(form);
        }
      }
      this.service.classify(new ClassificationRequest('PolynomialFeatures', this.method.name,
        mapOfArgs, degreeMap)).subscribe(response => {
        const map = new TSMap<string, string>().fromJSON(response);
        this.resultService.setMap(map);
        this.resultService.setIsWithImages(false);
        this.resultService.setMethodName(this.method.name);
        this.resultOutput = true;
      });
    } else {
      this.service.classifyWithAllMethods().subscribe(res => {
        // @ts-ignore
        const map = new TSMap<string, string>().fromJSON(res.result);
        const mapRes = new TSMap<string, TSMap<string, string>>();
        for (const key of map.keys()) {
          mapRes.set(key, new TSMap<string, string>().fromJSON(map.get(key)));
        }
        this.resultService.setAllMethodsResults(mapRes);
        this.resultService.setIsWithImages(true);
        this.withImages = true;
        this.resultOutput = true;
      });
    }
  }

  private getValueFromForm(form: HTMLInputElement) {
    switch (form.type) {
      case 'text':
        if (form.value === '') {
          return null;
        }
        const array = form.value.split(',');
        const newArray = [];
        for (const i of array) {
          newArray.push(Number(i));
        }
        return newArray;
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
      case 'select-one':
        if (form.value === '') {
          return null;
        }
        return form.value;
    }
  }
}
