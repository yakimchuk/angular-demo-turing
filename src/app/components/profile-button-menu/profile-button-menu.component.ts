import { Component, OnInit } from '@angular/core';
import { slideRight } from '@app/utilities/transitions';

@Component({
  selector: 'app-profile-button-menu',
  templateUrl: './profile-button-menu.component.html',
  styleUrls: ['./profile-button-menu.component.scss'],
  animations: [slideRight]
})
export class ProfileButtonMenuComponent implements OnInit {
  ngOnInit(): void {
  }


}
