import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category, Level, Question } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`)
      .pipe(catchError(this.handleError));
  }

  getQuestions(levelId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/levels/${levelId}/questions`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API error:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  updateAnswerClicks(answerId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/answers/${answerId}/click`, {})
      .pipe(catchError(this.handleError));
  }

  saveScore(categoryId: number, score: { completedLevels: number[]; percentage: number }) {
    const scores = this.getScores();
    scores[categoryId] = score;
    sessionStorage.setItem('quiz_scores', JSON.stringify(scores)); // Gamitin ang sessionStorage
  }

  getScores(): { [key: number]: { completedLevels: number[]; percentage: number } } {
    const scores = sessionStorage.getItem('quiz_scores'); // Gamitin ang sessionStorage
    return scores ? JSON.parse(scores) : {};
  }

  getLevels(categoryId: number): Observable<Level[]> {
    return this.http.get<Level[]>(`${this.baseUrl}/categories/${categoryId}/levels`).pipe(
      tap((levels: Level[]) => {
        console.log('Fetched Levels from API:', levels);
        sessionStorage.setItem(`category_${categoryId}_levels`, JSON.stringify(levels)); // Gamitin ang sessionStorage
      }),
      catchError(this.handleError)
    );
  }

  setLevelAnswered(categoryId: number, levelId: number) {
    let scores = this.getScores();

    if (!scores[categoryId]) {
      scores[categoryId] = { completedLevels: [], percentage: 0 };
    }

    if (!scores[categoryId].completedLevels.includes(levelId)) {
      scores[categoryId].completedLevels.push(levelId);
    }

    sessionStorage.setItem('quiz_scores', JSON.stringify(scores)); // Gamitin ang sessionStorage
  }
}
