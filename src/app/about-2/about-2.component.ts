import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-2',
  templateUrl: './about-2.component.html',
  styleUrls: ['./about-2.component.scss']
})
export class About2Component {
  letters = ['N', 'D', 'J', 'T', 'L', 'U', 'B', 'I', 'A', 'F', 'Q', 'K', 'M', 'G', 'C', 'W', 'X', 'Z', 'H', 'V', 'R', 'P', 'Y', 'S', 'E', 'O',]
  constructor(private router: Router) {}

  closePage() {
    this.router.navigate(['/landing'])
  }

}
