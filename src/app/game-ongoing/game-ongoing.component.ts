import { Component, inject, Input, signal } from '@angular/core';
import { UtilService } from '../services/util.service';
import { WordGetterService } from '../services/word-getter.service';
import { Word } from '../utils/types';
import { HangmanDisplayComponent } from '../components/hangman-display/hangman-display.component';
import { KeyboardComponent } from '../components/keyboard/keyboard.component';
import { WordToGuessComponent } from '../components/word-to-guess/word-to-guess.component';
import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'app-game-ongoing',
  imports: [HangmanDisplayComponent, KeyboardComponent, WordToGuessComponent],
  templateUrl: './game-ongoing.component.html',
  styleUrl: './game-ongoing.component.css',
})
export class GameOngoingComponent {
  title = signal('Jogo da Forca');
  subtitle = signal('Adivinhe a palavra em 6 tentativas');
  utils = inject(UtilService);
  stateManager = inject(GameStateService)
  guessedLetters = this.stateManager.guessedLetters;
  currentWord = this.stateManager.currentWord;
  lettersArray = this.stateManager.lettersArray;
  wrongGuesses = this.stateManager.wrongGuesses;
  correctGuesses =this.stateManager.correctGuesses;
  isGameWon = this.stateManager.isGameWon
  isGameOver = this.stateManager.isGameOver

  verify() {
    this.stateManager.verifyCurrentGameStatus();
  }

  includeLetters = (letter: string) => {
   this.stateManager.includeLetter(letter)
  };

  resetGame = () => {
    this.stateManager.resetGame()
  };
}
