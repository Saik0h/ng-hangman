import { Component, inject, signal } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-word-to-guess',
  imports: [],
  templateUrl: './word-to-guess.component.html',
  styleUrl: './word-to-guess.component.css',
})
export class WordToGuessComponent {
  wordToGuess = inject(GameStateService).lettersArray
  stateManager = inject(GameStateService)
  normalizer = inject(UtilService);
  guessedLetters = this.stateManager.guessedLetters

  isGuessed = (i: string): boolean => {
    return !!this.guessedLetters().includes(this.normalizer.lNormalizer(i));
  };
}
