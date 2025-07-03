import { Component, inject, Input } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-you-win',
  imports: [],
  templateUrl: './you-win.component.html',
  styleUrl: './you-win.component.css'
})
export class YouWinComponent {
stateManager = inject(GameStateService)

playAgain(){
  this.stateManager.resetGame()
}
}
