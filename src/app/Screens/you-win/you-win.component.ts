import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-you-win',
  imports: [],
  templateUrl: './you-win.component.html',
  styleUrl: './you-win.component.css'
})
export class YouWinComponent {
@Input() playAgain = () => {};
}
