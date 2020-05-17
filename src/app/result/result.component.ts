import {Component, OnInit} from '@angular/core';
import {ResultService} from '../services/result.service';
import {TSMap} from 'typescript-map';
import {ClassificationService} from '../services/classification.service';
import {TokenService} from '../services/TokenService';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  results: TSMap<string, string>;
  allMethodResults: TSMap<string, TSMap<string, string>>;
  keys: string[] = [];
  values: string[] = [];
  withImages: boolean;
  methodName: string;
  link: string;
  resultParameters: string[] = [];

  constructor(private resultService: ResultService, private classificationService: ClassificationService,
              private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.initializeParameters();
    this.withImages = this.resultService.getIsWithImages();
    this.methodName = this.resultService.getMethodName();
    this.link = `https://python-classification-back.herokuapp.com/classification-data?token=${this.tokenService.generateTokenIfNotExists()}&method_name=${this.methodName}`;
    if (this.withImages) {
      this.allMethodResults = this.resultService.getMethodResults();
    } else {
      this.results = this.resultService.getMap();
      this.keys = this.results.keys();
      this.values = this.results.values();
    }
  }

  toNumber(str: string) {
    return Number(str);
  }

  initializeParameters() {
    this.resultParameters.push('Train time');
    this.resultParameters.push('Test accuracy');
    this.resultParameters.push('Test prediction time');
    this.resultParameters.push('Train accuracy');
    this.resultParameters.push('Train prediction time');
  }
}
