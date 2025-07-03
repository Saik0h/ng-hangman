import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameOverComponent } from './components/game-over/game-over.component';
import { YouWinComponent } from './components/you-win/you-win.component';
import { UtilService } from './services/util.service';
import { GameOngoingComponent } from './game-ongoing/game-ongoing.component';
import { GameStateService } from './services/game-state.service';
import { MainComponent } from './components/main/main.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    GameOverComponent,
    YouWinComponent,
    GameOngoingComponent,
    MainComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = signal('Jogo da Forca');
  subtitle = signal('Adivinhe a palavra em 6 tentativas');
  stateManager = inject(GameStateService);

  isGameOver = this.stateManager.isGameOver;
  isGameWon = this.stateManager.isGameWon;
  isGameRunning = this.stateManager.isGameRunning;

  startGame = () => {
    this.stateManager.isGameRunning.set(true)
  }
}
