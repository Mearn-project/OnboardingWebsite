import { Component } from '@angular/core';

@Component({
  selector: 'app-token-modal',
  templateUrl: './token-modal.component.html',
  styleUrls: ['./token-modal.component.scss']
})
export class TokenModalComponent {
  email: string = '';

  constructor() { }
}
