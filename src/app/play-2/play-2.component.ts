import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play-2',
  templateUrl: './play-2.component.html',
  styleUrls: ['./play-2.component.scss']
})
export class Play2Component {
  cards = Array(10).fill('?');
  letters =   ['N', 'D', 'B', 'R', 'A', 'H', 'X', 'Y', 'K', 'S', 'V', 'M', 'C', 'U', 'G', 'Z', 'F', 'O', 'L', 'Q', 'E', 'P', 'T', 'J', 'W', 'I', ];
  visibleCards = this.cards;
  isMobile = false;
  constructor(private router: Router) {}
  
  ngOnInit() {
    
  
  }
    closePage() {
      sessionStorage.removeItem('alertShown');
      this.router.navigate(['/landing'])

    }

    playFlipcards() {
      this.router.navigate(['/flip-cards-2'])
    }



}
