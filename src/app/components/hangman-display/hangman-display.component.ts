import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-hangman-display',
  imports: [],
  templateUrl: './hangman-display.component.html',
  styleUrl: './hangman-display.component.css',
})
export class HangmanDisplayComponent {
  @Input() wrongGuesses = signal<Array<string>>([]);
}
