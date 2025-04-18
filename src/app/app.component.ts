import { NgFor } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameOverComponent } from './Screens/game-over/game-over.component';
import { YouWinComponent } from './Screens/you-win/you-win.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, GameOverComponent, YouWinComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = signal('Jogo da Forca');

  // array of letters
  letters = signal([
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
  ]);

  //array of words
  words = signal([
    { word: 'CARRO', hint: 'Tem quatro rodas' },
    { word: 'GATO', hint: 'Animal de estimação' },
    { word: 'CACHORRO', hint: 'Animal de estimação' },
    { word: 'COMPUTADOR', hint: 'Máquina de calcular' },
    { word: 'TELEFONE', hint: 'Aparelho de comunicação' },
    { word: 'CELULAR', hint: 'Aparelho de comunicação' },
    { word: 'LIVRO', hint: 'Fonte de conhecimento' },
    { word: 'PAPEL', hint: 'Material para escrever' },
    { word: 'CANETA', hint: 'Instrumento para escrever' },
    { word: 'MESA', hint: 'Móvel para trabalhar' },
    { word: 'CADEIRA', hint: 'Móvel para sentar' },
    { word: 'FONE', hint: 'Aparelho para ouvir música' },
    { word: 'TECLADO', hint: 'Aparelho para digitar' },
    { word: 'MOUSE', hint: 'Aparelho para controlar o cursor' },
    { word: 'MONITOR', hint: 'Tela do computador' },
    { word: 'IMPRESSORA', hint: 'Aparelho para imprimir' },
    { word: 'ROTEADOR', hint: 'Aparelho para conectar à internet' },
    { word: 'CÂMERA', hint: 'Aparelho para tirar fotos' },
    { word: 'PROJETOR', hint: 'Aparelho para projetar imagens' },
  ]);

  i = signal(Math.floor(this.words().length * Math.random()));
  currentWord = signal({
    word: this.words()[this.i()].word || '',
    hint: this.words()[this.i()].hint || '',
  });
  lettersArray = signal(this.currentWord().word.split(''));
  //array of letters guessed
  guessedLetters = signal(['']);
  //array of wrong guesses
  wrongGuesses = signal(['']);
  //array of correct guesses
  correctGuesses = signal(['']);

  isGameWon = signal(false);
  isGameOver = signal(false);

  stateManager = () => {
    if (this.wrongGuesses().length - 1 >= 6) {
      this.isGameOver.set(true);
      return 'Game Over!';
    }
    if (
      this.lettersArray().every((letter) =>
        this.correctGuesses().includes(letter)
      )
    ) {
      this.isGameWon.set(true);
      return 'You Won!';
    }
    return 'Game in Progress';
  };

  includeLetters = (letter: string) => {
    // check if letter is already guessed
    if (this.guessedLetters().includes(letter)) return;
    // add letter to guessed letters
    this.guessedLetters.update((guessed) => [...guessed, letter]);
    // check if letter is in word
    const isCorrect = this.lettersArray().includes(letter);
    if (!isCorrect && !this.isGameOver() && !this.isGameWon()) {
      // && !this.isGameOver() && !this.isGameWon()
      this.wrongGuesses.update((wrong) => [...wrong, letter]);
    } else {
      this.correctGuesses.update((correct) => [...correct, letter]);
    }
    this.stateManager();
    // console.log(this.stateManager());
  };

  // reset game
  resetGame = () => {
    this.i.set(Math.floor(this.words().length * Math.random()));
    this.currentWord.set({
      word: this.words()[this.i()].word || '',
      hint: this.words()[this.i()].hint || '',
    });
    this.lettersArray.set(this.currentWord().word.split(''));
    this.guessedLetters.set(['']);
    this.wrongGuesses.set(['']);
    this.correctGuesses.set(['']);
    this.isGameOver.set(false);
    this.isGameWon.set(false);
  };
}
