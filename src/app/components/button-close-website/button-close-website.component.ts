import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-close-website',
  templateUrl: './button-close-website.component.html',
  styleUrls: ['./button-close-website.component.scss']
})
export class ButtonCloseWebsiteComponent implements OnInit {

  private router: Router;

  constructor(
    router: Router
  ) {
    this.router = router;
  }

  public close() {
    try {
      history.go(-(history.length - 1));
    } catch {
      // There may be external exceptions as it is an external API
      // In such case better to move user to any place, instead of doing nothing
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

}
