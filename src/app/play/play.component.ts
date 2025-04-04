import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { Category } from '../models/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  categories: Category[] = [];
  cards = Array(10).fill('?');
  letters = ['N', 'D', 'B', 'R', 'A', 'H', 'X', 'Y', 'K', 'S', 'V', 'M', 'C', 'U', 'G', 'Z', 'F', 'O', 'L', 'Q', 'E', 'P', 'T', 'J', 'W', 'I'];
  visibleCards = this.cards;
  isMobile = false;
  showTooltip: boolean = false;
  activeTooltip: number | null = null;

  constructor(private router: Router, private quizService: QuizService) {}

  ngOnInit() {
    this.quizService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
    const isAlertShown = sessionStorage.getItem('alertShown');

    if (!sessionStorage.getItem('alertShown')) {
      Swal.fire({
        title:'',
        html: `<b>Do you have prior knowledge of Kapampangan Vocabulary?</b>`,
        imageUrl: '/assets/icon.png',
        imageWidth: 150,
        imageHeight: 150,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        confirmButtonColor: '#BB3E03',
        cancelButtonColor: '#BB3E03',
        allowOutsideClick: false,
        allowEscapeKey: false, 
        allowEnterKey: false, 
        customClass: {
          title: 'swal-custom-title',
          htmlContainer: 'swal-custom-text',
          confirmButton: 'swal-custom-button',
          cancelButton: 'swal-custom-button'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          sessionStorage.setItem('alertShown', 'true');
        } else {
          this.router.navigate(['/play-2']);
          sessionStorage.setItem('alertShown', 'true');
        }
      });
    }
  }


  closePage() {
    sessionStorage.removeItem('alertShown');
    this.router.navigate(['/landing']);
    
  }

  categoryPage() {
    this.router.navigate(['/categories']);
  }

  playFlipcards() {
    this.router.navigate(['/flip-cards']);
  }

  goToLevels(categoryId: number) {
    this.router.navigate(['/categories', categoryId, 'levels']);
  }

  getCategoryImage(categoryId: number): string {
    return `assets/category-images/category-${categoryId}.png`;
  }

  showCustomTooltip(id: number, event: MouseEvent) {
    this.activeTooltip = id;
  }

  hideCustomTooltip() {
    this.activeTooltip = null;
  }

}
