import { NgFor } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})


export class AppComponent {
  title = signal("Hangman Game");

  // array of letters
  letters = signal([
    'Q', 'W', 'E', 'R',
    'T', 'Y', 'U', 'I',
    'O', 'P', 'A', 'S',
    'D', 'F', 'G', 'H',
    'J', 'K', 'L', 'Z',
    'X', 'C', 'V', 'B',
    'N', 'M'
  ])

  //array of words
  words = signal([
    { word: 'JAVASCRIPT', hint: 'PROGRAMMING LANGUAGE' },
    { word: 'ANGULAR', hint: 'TS Framework' },
    { word: 'REACT', hint: 'JS Framework' },
    { word: 'HTML', hint: 'Everything depends on this' },
    { word: 'CSS', hint: 'STYLING LANGUAGE' },
    { word: 'BOOTSTRAP', hint: 'CSS Framework' },
    { word: 'TAILWIND', hint: 'CSS Framework' },
    { word: 'NODE', hint: 'JS Runtime' },
    { word: 'TYPESCRIPT', hint: 'JS superset' },
    { word: 'JAVA', hint: 'PROGRAMMING LANGUAGE' },
    { word: 'PYTHON', hint: 'PROGRAMMING LANGUAGE' },
    { word: 'CPLUSPLUS', hint: 'PROGRAMMING LANGUAGE' },
    { word: 'PHP', hint: 'PROGRAMMING LANGUAGE' },
    { word: 'RUBY', hint: 'PROGRAMMING LANGUAGE' },
  ])

  i = signal(Math.floor(this.words().length * Math.random()))
  currentWord = signal({word: this.words()[this.i()].word || '', hint: this.words()[this.i()].hint || ''})
  lettersArray = signal(this.currentWord().word.split(''))
   //array of letters guessed
  guessedLetters = signal([''])
  //array of wrong guesses
  wrongGuesses = signal([''])
  //array of correct guesses
  correctGuesses = signal([''])

  isGameWon = signal(false)
  isGameOver = signal(false)

  stateManager = () => {
    if (this.wrongGuesses().length - 1 >= 6) {
      this.isGameOver.set(true);
      return "Game Over!";
    }  
    if (this.lettersArray().every(letter => this.correctGuesses().includes(letter))) {
      this.isGameWon.set(true);
    return "You Won!";
    }
return "Game in Progress";
  }

  includeLetters = (letter: string) => {
       // check if letter is already guessed
    if (this.guessedLetters().includes(letter)) return;
    // add letter to guessed letters
    this.guessedLetters.update(guessed => [...guessed, letter]);
    // check if letter is in word
    const isCorrect = this.lettersArray().includes(letter);
    if (!isCorrect && !this.isGameOver() && !this.isGameWon()) {
      // && !this.isGameOver() && !this.isGameWon()
      this.wrongGuesses.update(wrong => [...wrong, letter]);
    } else {
      this.correctGuesses.update(correct => [...correct, letter]);
    }
    this.stateManager();
    console.log(this.stateManager())
  }

  // reset game
  resetGame = () => {
    this.i.set(Math.floor(this.words().length * Math.random()));
    this.currentWord.set({word: this.words()[this.i()].word || '', hint: this.words()[this.i()].hint || ''});
    this.lettersArray.set(this.currentWord().word.split(''));
    this.guessedLetters.set(['']);
    this.wrongGuesses.set(['']);
    this.correctGuesses.set(['']);
    this.isGameOver.set(false);
    this.isGameWon.set(false);
  }
  

}
