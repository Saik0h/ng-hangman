import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  imports: [],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.css',
})
export class KeyboardComponent {
  @Input({ required: true }) isGameWon = signal<boolean>(false);
  @Input({ required: true }) isGameOver = signal<boolean>(false);
  @Input({ required: true }) correctGuesses = signal<Array<string>>([]);
  @Input({ required: true }) wrongGuesses = signal<Array<string>>([]);
  @Input({ required: true }) guessedLetters = signal<Array<string>>([]);
  @Input({ required: true }) includeFunction = (i: string) => {};
  
  includeLetters = (i: string) => {
    this.includeFunction(i)
  }
  
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
}
