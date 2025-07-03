import { Component, inject, Input } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-game-over',
  imports: [],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.css'
})
export class GameOverComponent {
stateManager = inject(GameStateService)

tryAgain(){
  this.stateManager.resetGame()
}
}
