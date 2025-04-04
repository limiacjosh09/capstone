import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { Level } from '../models/interfaces';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss'],
})
export class LevelsComponent implements OnInit {
  letters = ['K', 'C', 'Q', 'H', 'Y', 'B', 'E', 'I', 'W', 'V', 'U', 'A', 'X', 'R', 'N', 'P', 'S', 'F', 'J', 'Z', 'L', 'T', 'G', 'M', 'O', 'D'];
  levels: Level[] = [];
  categoryId!: number;
  error: string = '';
  completedLevelsSet = new Set<number>(); 

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoryId = +this.route.snapshot.paramMap.get('categoryId')!;
    this.loadCompletedLevels();
    this.loadLevels();
  }

  loadLevels() {
    this.quizService.getLevels(this.categoryId).subscribe({
      next: (data) => {
        const completedLevelsKey = `category_${this.categoryId}_completedLevels`;
        const completedLevels = JSON.parse(sessionStorage.getItem(completedLevelsKey) || '[]'); 
        this.levels = data.map(level => ({
          ...level,
          completed: completedLevels.includes(level.id) // ✅ Mark completed levels
        }));
      },
      error: (error) => this.error = error.message
    });
  }

  selectLevel(levelId: number) {
    this.router.navigate(['/levels', levelId, 'questions'], {
      queryParams: { categoryId: this.categoryId }
    });
  }
  

  isLevelCompleted(levelId: number): boolean {
    return this.completedLevelsSet.has(levelId);
  }

  getButtonClass(levelId: number): string {
    return this.isLevelCompleted(levelId) ? 'completed disabled-btn' : 'in-progress';
  }

  goBack() {
    this.router.navigate(['/categories']);
  }

  // Save completed levels to sessionStorage
  private saveCompletedLevels() {
    sessionStorage.setItem(`completed_levels_${this.categoryId}`, JSON.stringify(Array.from(this.completedLevelsSet)));
  }

  // Load completed levels from sessionStorage
  private loadCompletedLevels() {
    const savedLevels = sessionStorage.getItem(`completed_levels_${this.categoryId}`);
    if (savedLevels) {
      this.completedLevelsSet = new Set(JSON.parse(savedLevels));
    }
  }
}