import { Component, Input, OnInit } from '@angular/core';
import { fade, zoom } from '@app/common/transitions';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  animations: [fade, zoom]
})
export class ImageComponent implements OnInit {

  @Input('url') url: string;

  public image: HTMLImageElement;
  public ready: boolean = false;
  public error: boolean;

  constructor() { }

  public reload() {

    delete this.image;
    delete this.error;

    let image = new Image();

    image.onload = () => {
      this.image = image;
      setTimeout(() => this.ready = true);
    };

    image.onerror = () => this.error = true;

    image.src = this.url;
  }

  ngOnInit() {

    this.reload();

  }

}
