import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { LevelsComponent } from './levels/levels.component';
import { QuestionsComponent } from './questions/questions.component';
import { LandingComponent } from './landing/landing.component';
import { AboutComponent } from './about/about.component';
import { HowToPlayComponent } from './how-to-play/how-to-play.component';
import { PlayComponent } from './play/play.component';
import { FlipCardsComponent } from './flip-cards/flip-cards.component';
import { Landing2Component } from './landing-2/landing-2.component';
import { Play2Component } from './play-2/play-2.component';
import { About2Component } from './about-2/about-2.component';
import { HowToPlay2Component } from './how-to-play-2/how-to-play-2.component';
import { FlipCards2Component } from './flip-cards-2/flip-cards-2.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'landing-2', component: Landing2Component },
  { path: 'play', component: PlayComponent },
  { path: 'play-2', component: Play2Component },
  { path: 'about', component: AboutComponent },
  { path: 'about-2', component: About2Component },
  { path: 'how-to-play', component: HowToPlayComponent },
  { path: 'how-to-play-2', component: HowToPlay2Component },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/:categoryId/levels', component: LevelsComponent },
  { path: 'levels/:levelId/questions', component: QuestionsComponent },
  { path: 'flip-cards', component: FlipCardsComponent },
  { path: 'flip-cards-2', component: FlipCards2Component }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
