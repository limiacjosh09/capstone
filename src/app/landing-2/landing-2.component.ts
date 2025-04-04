import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-2',
  templateUrl: './landing-2.component.html',
  styleUrls: ['./landing-2.component.scss']
})
export class Landing2Component {
  letters = ['J', 'F', 'Q', 'P', 'W', 'R', 'S', 'X', 'T', 'A', 'L', 'G', 'C', 'B', 'Y', 'E', 'U', 'O', 'D', 'Z', 'K', 'H', 'I', 'M', 'N', 'V', ];
  constructor(private router: Router) {}
  goToPlay() {
    this.router.navigate(['/play-2'])
  }

  goToAbout() {
    this.router.navigate(['/about-2'])
  }

  goTohow() {
    this.router.navigate(['/how-to-play-2'])
  }
}
