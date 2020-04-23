import {Component, Input, OnInit} from '@angular/core';
import {ClassificationService} from '../services/classification.service';
import {Method} from '../models/Method';

@Component({
  selector: 'app-python-classification',
  templateUrl: './python-classification.component.html',
  styleUrls: ['./python-classification.component.css']
})
export class PythonClassificationComponent implements OnInit {
  @Input() method: Method;
  private object;
  testData: File = null;
  data: File = null;
  constructor(private service: ClassificationService) {
  }

  ngOnInit(): void {
    this.service.testData().subscribe(res => {
      this.object = res;
      console.log(res);
    });
  }

  public onChangeDataFile(files: FileList){
    this.data = files[0];
    console.log(files);
  }

  public onChangeTestDataFile(files: FileList){
    this.testData = files[0];
    console.log(files);
  }
}
