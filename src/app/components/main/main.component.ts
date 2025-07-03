import { Component, inject, Input, input } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  @Input({required: true}) startGame = () => {};
  stateManager = inject(GameStateService);

  startNewGame = () => {
    this.startGame()
  };
}
