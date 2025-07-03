import { inject, Injectable, signal } from '@angular/core';
import { Word } from '../utils/types';
import { WordGetterService } from './word-getter.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  wordProvider = inject(WordGetterService);
  utils = inject(UtilService);
  words = signal<Word[]>(this.wordProvider.getWords());
  currentWord = signal<Word>(this.utils.setCurrentWord(this.words()));
  lettersArray = signal(this.currentWord().word.split(''));
  guessedLetters = signal<Array<string>>([]);
  wrongGuesses = signal<Array<string>>([]);
  correctGuesses = signal<Array<string>>([]);
  isGameRunning = signal<boolean>(false);
  isGameWon = signal<boolean>(false);
  isGameOver = signal<boolean>(false);

  includeLetter(letter: string) {
    if (this.guessedLetters().includes(letter.toUpperCase())) return;
    this.guessedLetters.update((guessed) => [...guessed, letter]);
    const letterNormalized = this.utils.letterNormalizer(
      this.lettersArray(),
      letter
    );

    const isCorrect = letterNormalized?.includes(letter.toUpperCase());
    if (!isCorrect && !this.isGameOver() && !this.isGameWon()) {
      this.wrongGuesses.update((wrong) => [...wrong, letter]);
    } else {
      this.correctGuesses.update((correct) => [...correct, letter]);
    }

    this.verifyCurrentGameStatus();
  }
  verifyCurrentGameStatus = () => {
    if (this.wrongGuesses().length >= 6) {
      this.isGameOver.set(true);
    }
    if (
      this.lettersArray().every((letter: string) =>
        this.correctGuesses().includes(
          letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        )
      )
    ) {
      this.isGameWon.set(true);
    }
  };

  resetGame() {
    this.currentWord.set(this.utils.setCurrentWord(this.words()));
    this.lettersArray.set(this.currentWord().word.split(''));
    this.guessedLetters.set([]);
    this.wrongGuesses.set([]);
    this.correctGuesses.set([]);
    this.isGameOver.set(false);
    this.isGameWon.set(false);
  }
}
