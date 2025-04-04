import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { LevelsComponent } from './levels/levels.component';
import { QuestionsComponent } from './questions/questions.component';
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './landing/landing.component';
import { AboutComponent } from './about/about.component';
import { HowToPlayComponent } from './how-to-play/how-to-play.component';
import { PlayComponent } from './play/play.component';
import { FlipCardsComponent } from './flip-cards/flip-cards.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Landing2Component } from './landing-2/landing-2.component';
import { Play2Component } from './play-2/play-2.component';
import { About2Component } from './about-2/about-2.component';
import { HowToPlay2Component } from './how-to-play-2/how-to-play-2.component';
import { FlipCards2Component } from './flip-cards-2/flip-cards-2.component'


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    LevelsComponent,
    QuestionsComponent,
    LandingComponent,
    AboutComponent,
    HowToPlayComponent,
    PlayComponent,
    FlipCardsComponent,
    Landing2Component,
    Play2Component,
    About2Component,
    HowToPlay2Component,
    FlipCards2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
