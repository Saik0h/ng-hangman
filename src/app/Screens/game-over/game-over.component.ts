import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-over',
  imports: [],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.css'
})
export class GameOverComponent {
@Input() tryAgain = () => {};
}
