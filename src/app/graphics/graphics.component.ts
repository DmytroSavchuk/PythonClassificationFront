import {Component, OnInit} from '@angular/core';
import {ResultService} from '../services/result.service';
import {ClassificationService} from '../services/classification.service';
import {TokenService} from '../services/TokenService';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {
  withImages: boolean;
  imageToShow: any;
  isImageLoading: boolean;
  graphicsTypes: string[] = [];
  link = `http://ml-based-classification-back.herokuapp.com/classification-data?token=${this.tokenService.generateTokenIfNotExists()}&method_name=*`;

  constructor(private resultService: ResultService, private classificationService: ClassificationService,
              private tokenService: TokenService) {
    this.withImages = this.resultService.getIsWithImages();
  }

  ngOnInit(): void {
    this.graphicsTypes.push('Choose graphic type');
    this.graphicsTypes.push('Train time');
    this.graphicsTypes.push('Test accuracy');
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getImageFromService(url: string) {
    this.isImageLoading = true;
    this.classificationService.getGraphics(url).subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
    });
  }

  selectChangeHandler(event: any) {
    if (this.graphicsTypes.includes('Choose graphic type')) {
      this.graphicsTypes.shift();
    }
    const value = event.target.value;
    if (value.toLowerCase() === 'train time') {
      this.getImageFromService('/fit-time-plot');
    } else if (value.toLowerCase() === 'test accuracy') {
      this.getImageFromService('/test-accuracy-plot');
    }
  }

}
