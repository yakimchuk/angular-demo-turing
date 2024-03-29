import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { fade, zoom } from '@app/utilities/transitions';
import { images } from '@app/config';

abstract class ImageComponent implements OnInit, OnChanges {

  protected url: string;

  public image: HTMLImageElement;
  public ready: boolean;
  public error: boolean;

  constructor() { }

  public reload() {

    delete this.ready;
    delete this.error;

    let image = new Image();

    image.onload = () => {
      this.image = image;
      setTimeout(() => this.ready = true);
    };

    image.onerror = () => this.error = true;

    let url = new URL(images.directory);
    url.pathname = [url.pathname, this.url].join('/');

    image.src = url.toString();
  }

  ngOnChanges(changes: SimpleChanges) {

    if (!changes.url || !changes.url.currentValue) {
      return;
    }

    this.reload();
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-image-large',
  templateUrl: './image.large.component.html',
  styleUrls: ['./image.large.component.scss'],
  animations: [fade, zoom]
})
export class LargeImageComponent extends ImageComponent implements OnChanges {

  @Input() url: string;

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }
}

@Component({
  selector: 'app-image-thumbnail',
  templateUrl: './image.thumbnail.component.html',
  styleUrls: ['./image.thumbnail.component.scss'],
  animations: [fade, zoom]
})
export class ThumbnailImageComponent extends ImageComponent implements OnChanges {

  @Input() url: string;

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }
}
