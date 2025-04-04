import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flip-cards-2',
  templateUrl: './flip-cards-2.component.html',
  styleUrls: ['./flip-cards-2.component.scss']
})
export class FlipCards2Component {
  letters =   ['F', 'K', 'T', 'J', 'G', 'N', 'A', 'Z', 'D', 'C', 'Y', 'W', 'U', 'L', 'S', 'P', 'Q', 'B', 'E', 'H', 'X', 'V', 'R', 'O', 'M', 'I', ]
  
    constructor(private router: Router) {}
  
    backPage() {
      this.router.navigate(['/play-2']);
    }
  
    
    cards = [
      { question: "I love you", answer: 'Kaluguran daka' },
      { question: "Good morning", answer: 'Mayap a abak' },
      { question: "Thank you so much", answer: 'Dakal a salamat' },
      { question: "How are you?", answer: 'Komusta ka?' },
      { question: "Good evening", answer: 'Mayap a bengi' },
      { question: "Yes", answer: "Wa/Opu" },
      { question: "No", answer: "Alî" },
      { question: "But", answer: "Oneng/Pero" },
      { question: "Because", answer: "Uli/Uling" },
      { question: "Distracted", answer: "Mebaligo/Melibang" },
      { question: "Discuss", answer: "Pisábyán" },
      { question: "Follow", answer: "Tukyán/Túkián" },
      { question: "Sorry", answer: "Pasensya na/Pasensya pu" },
      { question: "Borrow", answer: "Manandám/Andamán" },
      { question: "Forgive", answer: "Magpatawad/Patawaran" },
      { question: "Tell", answer: "Sabyán" },
      { question: "Use", answer: "Gamitan" },
      { question: "Help", answer: "Saup/Sopan" },
      { question: "Talk", answer: "Manyalita/Pakisabyán" },
      { question: "A lot/So much", answer: "Dakal/Marakal" },
      { question: "Can", answer: "Agyû" },
      { question: "True", answer: "Tutu/Tune" },
      { question: "False", answer: "E tutû/Ali tune" },
      { question: "Advice", answer: "Payu" },
      { question: "Penalize", answer: "Parusán/Mamarusa" },
      { question: "Work", answer: "n. Obra v. pagobran" },
      { question: "Affection", answer: "Lugúd" },
      { question: "Divide", answer: "Pipitna-pitna, pitnán" },
      { question: "Involve", answer: "Miyabe, iyabe" },
      { question: "Dear", answer: "Kalugurán" },
      { question: "Arise", answer: "(get up) tikdó, talakad, mibangun" },
      { question: "Ugly", answer: "Matsura, manong" },
      { question: "First", answer: "Mumuna, prumeru" },
      { question: "Ourselves", answer: "Ikata or icami or itamu" },
      { question: "Us", answer: "kekatamu/itamu, or kékami, ikami" },
      { question: "Buy", answer: 'salì, saliwán' }
    ];
    flippedCards: boolean[] = new Array(this.cards.length).fill(false);
    currentPage = 0;
    itemsPerPage = 12; 
    totalPages = Math.ceil(this.cards.length / this.itemsPerPage);
  
    get paginatedCards() {
      const startIndex = this.currentPage * this.itemsPerPage;
      return this.cards.slice(startIndex, startIndex + this.itemsPerPage);
    }
  
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
      }
    }
  
    previousPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    }
    unflipAll() {
      this.flippedCards.fill(false);
    }
  
    onCardClick(index: number) {
      const actualIndex = index + this.currentPage * this.itemsPerPage;
      this.flippedCards[actualIndex] = !this.flippedCards[actualIndex];
    }
  
}
