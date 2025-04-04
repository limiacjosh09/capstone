  import { Component, OnInit, HostListener } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { QuizService } from '../services/quiz.service';
  import { Question, Category, Level, Answer } from '../models/interfaces';
  import Swal from 'sweetalert2';

  @Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
  })
  export class QuestionsComponent implements OnInit {
    letters = ['K', 'C', 'Q', 'H', 'Y', 'B', '', 'I', 'W', 'V', 'U', 'A', 'X', 'R', 'N', 'P', 'S', 'F', 'J', 'Z', 'L', 'T', 'G', 'M', 'O', 'D', ];
    questions: Question[] = [];
    currentQuestionIndex = 0;
    selectedAnswer: number | null = null;
    error: string = '';
    levelId!: number;
    categoryId!: number;
    levelName!: string;
    categoryName!: string;
    showFeedback = false;
    isCorrect: boolean = false;
    isLastLevel: boolean = false;
    isDisabled: boolean = false;
    showModal: boolean = false;
    tallyResults: any[] = [];
    correctAnswer = '';
    answeredQuestionIds = new Set<number>();
    isAnswerRevealed: boolean = false;
    isModalScaling: boolean = false;
    selectedAnswerId: number | null = null;
    

    constructor(
      private quizService: QuizService,
      private route: ActivatedRoute,
      private router: Router
    ) {}

    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        // Get levelId and categoryId from route
        this.levelId = +params.get('levelId')!;
        this.categoryId = +this.route.snapshot.queryParamMap.get('categoryId')!;
    
        console.log('Initialized Level ID:', this.levelId);
        console.log('Initialized Category ID:', this.categoryId);
    
        // Load questions and other data
        this.loadQuestions();
        this.getLevelNameById(this.levelId);
        this.getCategoryNameById(this.categoryId);
        this.checkIfLastLevel();
    
        // Load selectedAnswerId from sessionStorage
        const savedAnswerId = sessionStorage.getItem('selectedAnswerId');
        if (savedAnswerId) {
          this.selectedAnswerId = parseInt(savedAnswerId, 10);
        }
    
        // Load answered questions from sessionStorage
        const savedAnsweredQuestions = sessionStorage.getItem(`answeredQuestions_${this.categoryId}_${this.levelId}`);
        if (savedAnsweredQuestions) {
          this.answeredQuestionIds = new Set(JSON.parse(savedAnsweredQuestions));
        }
    
        // Retrieve the modal state from sessionStorage and display if available
        const savedModalState = sessionStorage.getItem('showModal');
        if (savedModalState === 'true') {
          const savedTallyResults = sessionStorage.getItem('tallyResults');
          const savedCorrectAnswer = sessionStorage.getItem('correctAnswer');
          if (savedTallyResults && savedCorrectAnswer) {
            this.tallyResults = JSON.parse(savedTallyResults);
            this.correctAnswer = savedCorrectAnswer;
            this.showModal = true;
          }
        }
      }); // Close the subscribe block
    }
  revealAnswer() {
    this.isAnswerRevealed = !this.isAnswerRevealed; // Toggle the flip state
  }
    flipCard(answer: any) {
      answer.flipped = !answer.flipped;
    }
    
    scaleModal() {
      this.isModalScaling = true; // Trigger scaling animation
      setTimeout(() => {
        this.isModalScaling = false; // Reset after animation
      }, 200); // Match the duration of the CSS animation
    }

    @HostListener('document:click', ['$event'])
    onClickOutside(event: MouseEvent) {
      const modalContent = document.querySelector('.modal-content');
      if (modalContent && !modalContent.contains(event.target as Node)) {
        // Clicked outside the modal
        this.scaleModal();
        
      }
    }
    getLevelNameById(levelId: number) {
      this.quizService.getLevels(this.categoryId).subscribe({
        next: (levels: Level[]) => {
          const level = levels.find(lvl => lvl.id === levelId);
          if (level) {
            this.levelName = level.name;
          }
        },
        error: (error) => {
          this.error = error.message;
        }
      });
    }

    getCategoryNameById(categoryId: number) {
      this.quizService.getCategories().subscribe({
        next: (categories: Category[]) => {
          const category = categories.find(cat => cat.id === categoryId);
          if (category) {
            this.categoryName = category.name;
          }
        },
        error: (error) => {
          this.error = error.message;
        }
      });
    }

    loadQuestions() {
      this.quizService.getQuestions(this.levelId).subscribe({
        next: (data) => {
          this.questions = data;
        },
        error: (error) => {
          this.error = error.message;
        }
      });
    }

    onAnswerClick(answerId: number) {
      if (this.isDisabled) return;
      this.isDisabled = true;
    
      const currentQuestion = this.questions[this.currentQuestionIndex];
      const questionId = currentQuestion.id;
    

      const isQuestionAlreadyAnswered = this.answeredQuestionIds.has(questionId);
    
      if (!isQuestionAlreadyAnswered) {
        this.quizService.updateAnswerClicks(answerId).subscribe(response => {
          console.log('Clicks updated:', response.clicks);
        });
    
        this.answeredQuestionIds.add(questionId);
        sessionStorage.setItem(`answeredQuestions_${this.categoryId}_${this.levelId}`, JSON.stringify(Array.from(this.answeredQuestionIds)));
      }
    
      const linguistCorrect = currentQuestion.answers.find(a => a.is_correct);
      const answersList = currentQuestion.answers.slice();
    
      const selectedIdx = answersList.findIndex(a => a.id === answerId);
      if (answersList[selectedIdx]) {
        answersList[selectedIdx].clicks += isQuestionAlreadyAnswered ? 0 : 1; 
      }
      answersList.sort((a, b) => b.clicks - a.clicks);
      this.tallyResults = answersList.slice();
      this.correctAnswer = linguistCorrect?.answer_text || '';
    
      sessionStorage.setItem('showModal', 'true');
      sessionStorage.setItem('tallyResults', JSON.stringify(this.tallyResults));
      sessionStorage.setItem('correctAnswer', this.correctAnswer);
      this.showModal = true;
    

      this.markLevelAsCompleted();
      this.selectedAnswerId = answerId;
      sessionStorage.setItem('selectedAnswerId', answerId.toString());
    }

    selectAnswer(answerId: number) {
      if (!this.showFeedback) {
        this.selectedAnswer = answerId;
        this.showFeedback = true;
    
        this.markLevelAsCompleted();

        const currentQuestion = this.questions[this.currentQuestionIndex];
        const selectedAnswer = currentQuestion.answers.find(a => a.id === answerId);
        this.isCorrect = selectedAnswer?.is_correct || false;

        this.onAnswerClick(answerId);
    
        // Show feedback modal (if needed)
        // this.showFeedbackModal();
      }
    }

    ngOnDestroy() {
      sessionStorage.removeItem('showModal');
      sessionStorage.removeItem('tallyResults');
      sessionStorage.removeItem('correctAnswer');
      this.selectedAnswer = null;
      this.showFeedback = false;
      this.isDisabled = false;
    }
    markLevelAsCompleted() {
      const completedLevelsKey = `category_${this.categoryId}_completedLevels`;
      let completedLevels = JSON.parse(sessionStorage.getItem(completedLevelsKey) || '[]');
    
      if (!completedLevels.includes(this.levelId)) {
        completedLevels.push(this.levelId);
        sessionStorage.setItem(completedLevelsKey, JSON.stringify(completedLevels));
      }
    }

    // showFeedbackModal() {
    //   const isCorrectText = this.isCorrect ? 'Correct!' : 'Oops, try again!';
    //   const isCorrectMessage = this.isCorrect ? 'Great job, keep going!' : 'Please review the answer and try again.';

    //   let confirmButtonText = 'Back to Scenarios';
    //   let cancelButtonText = 'Try Again';
    //   let confirmButtonColor = '#3085d6';
    //   let cancelButtonColor = '#d33';
    //   let showCancelButton = true;

    //   if (this.isCorrect && !this.isLastLevel) {
    //     cancelButtonText = 'Next Scenario';
    //     cancelButtonColor = 'green';
    //   }
    //   // else if (!this.isCorrect) {
    //   //   confirmButtonText = 'Back to Scenarios';
    //   //   cancelButtonText = 'Try Again';
    //   //   cancelButtonColor = 'red';
    //   // }
    //   else if (this.isLastLevel) {
    //     showCancelButton = false;
    //   }

    //   Swal.fire({
    //     title: isCorrectText,
    //     text: isCorrectMessage,
    //     icon: this.isCorrect ? 'success' : 'error',
    //     showCancelButton: showCancelButton,
    //     confirmButtonText: confirmButtonText,
    //     cancelButtonText: cancelButtonText,
    //     confirmButtonColor: confirmButtonColor,
    //     cancelButtonColor: cancelButtonColor,
    //     reverseButtons: true,
    //     customClass: {
    //       confirmButton: 'btn-primary',
    //       cancelButton: 'btn-secondary',

    //     },
    //     allowOutsideClick: false,
    //     allowEscapeKey: false
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       this.goBack();
    //     } else if (result.dismiss === Swal.DismissReason.cancel) {
    //       if (this.isCorrect && !this.isLastLevel) {
    //         this.goToNextLevel();
    //       } else if (!this.isCorrect) {
    //         this.selectedAnswer = null;
    //         this.showFeedback = false;
    //       }
    //     }
    //   });

    // }




    goBack() {
      sessionStorage.removeItem('showModal');
      sessionStorage.removeItem('tallyResults');
      sessionStorage.removeItem('correctAnswer');
      this.selectedAnswer = null;
      this.showFeedback = false;
      this.isDisabled = false;
      this.router.navigate(['/categories', this.categoryId, 'levels']);
      sessionStorage.removeItem('selectedAnswerId');
    }

    goToNextLevel() {

      this.quizService.getLevels(this.categoryId).subscribe({
        next: (levels: Level[]) => {
          const currentLevelIndex = levels.findIndex(level => level.id === this.levelId);
          const totalLevels = levels.length;
          const nextLevelIndex = currentLevelIndex + 1;
          const nextLevelId = nextLevelIndex < totalLevels ? levels[nextLevelIndex].id : null;
    
          const isLastLevel = nextLevelId === null;
    
          if (isLastLevel) {
            console.log('This is the last level. Navigating back to levels page.');
            this.router.navigate([`/categories/${this.categoryId}/levels`]);
          } else {
            console.log('Navigating to next level:', nextLevelId); // Debugging
            this.router.navigate([`/levels/${nextLevelId}/questions`], {
              queryParams: { categoryId: this.categoryId },
            }).then(() => {
              window.location.reload();
              this.loadQuestions(); // Ensure the component reloads
            });
            sessionStorage.removeItem('showModal');
            sessionStorage.removeItem('tallyResults');
            sessionStorage.removeItem('correctAnswer');
            sessionStorage.removeItem('selectedAnswerId');
          }
        },
        error: (error) => {
          console.error('Failed to fetch levels:', error);
        }
      });
      
    }
    checkIfLastLevel() {
    const storedLevels: Level[] = JSON.parse(localStorage.getItem(`category_${this.categoryId}_levels`) || '[]');

    if (storedLevels.length > 0) {
      // Use levels from localStorage
      const currentLevelIndex = storedLevels.findIndex(level => level.id === this.levelId);
      const totalLevels = storedLevels.length;
      this.isLastLevel = currentLevelIndex === totalLevels - 1;
    } else {
      // Fetch levels from the API if not in localStorage
      this.quizService.getLevels(this.categoryId).subscribe({
        next: (levels: Level[]) => {
          const currentLevelIndex = levels.findIndex(level => level.id === this.levelId);
          const totalLevels = levels.length;
          this.isLastLevel = currentLevelIndex === totalLevels - 1;
          console.log('Is Last Level:', this.isLastLevel); // Debugging
        },
        error: (error) => {
          this.error = error.message;
        }
      });
    }
  }

    retryQuestion() {
      this.showFeedback = false;
      this.selectedAnswer = null;
      this.showCurrentQuestion();
    }

    showCurrentQuestion() {
      const currentQuestion = this.questions[this.currentQuestionIndex];

    }
    closeModal() {
      this.showModal = false;
      this.isAnswerRevealed = false;
      sessionStorage.removeItem('showModal'); // Remove modal state when closed
      sessionStorage.removeItem('tallyResults'); // Remove saved tally results
      sessionStorage.removeItem('correctAnswer'); // Remove saved correct answer
    }

  }
