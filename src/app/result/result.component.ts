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
  keys: string[] = [];
  values: string[] = [];
  link = `https://python-classification-back.herokuapp.com/classification-data?token=${this.tokenService.generateTokenIfNotExists()}`;

  constructor(private resultService: ResultService, private classificationService: ClassificationService,
              private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.results = this.resultService.getMap();
    console.log(this.results);
    this.keys = this.results.keys();
    this.values = this.results.values();
  }

  getResults() {
    this.classificationService.getResultsInFile().subscribe(response => {
      window.location.href = response.url;
    });
  }
}
