import { NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameOverComponent } from './Screens/game-over/game-over.component';
import { YouWinComponent } from './Screens/you-win/you-win.component';

interface Word {
  word: string;
  hint: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, GameOverComponent, YouWinComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // Titulo do jogo
  title = signal('Jogo da Forca');
  subtitle = signal('Adivinhe a palavra em 6 tentativas');

  // Banco de palavras
  words = signal<Word[]>([
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
    { word: 'TELEVISÃO', hint: 'Aparelho para assistir filmes' },
    { word: 'RADIO', hint: 'Aparelho para ouvir música' },
    { word: 'FOTOGRAFIA', hint: 'Arte de tirar fotos' },
    { word: 'VIDEO', hint: 'Arte de gravar imagens em movimento' },
    { word: 'ANIMAÇÃO', hint: 'Arte de criar movimento' },
    { word: 'DESENHO', hint: 'Arte de desenhar' },
    { word: 'PINTURA', hint: 'Arte de pintar' },
    { word: 'ESCULTURA', hint: 'Arte de esculpir' },
    { word: 'ARQUITETURA', hint: 'Arte de projetar edifícios' },
    { word: 'ENGENHARIA', hint: 'Arte de projetar máquinas' },
    { word: 'MÚSICA', hint: 'Arte de fazer música' },
    { word: 'DANÇA', hint: 'Arte de dançar' },
    { word: 'TEATRO', hint: 'Arte de atuar' },
    { word: 'CINEMA', hint: 'Arte de fazer filmes' },
    { word: 'LITERATURA', hint: 'Arte de escrever livros' },
    { word: 'POESIA', hint: 'Arte de fazer poemas' },
    { word: 'FICÇÃO', hint: 'Arte de criar histórias' },
    { word: 'REALIDADE', hint: 'O que existe' },
    { word: 'FANTASIA', hint: 'O que não existe' },
  ]);

  // Letras do teclado
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

  // Seleciona uma palavra aleatória do banco de palavras
  setCurrentWord = () => {
    const randomIndex = Math.floor(Math.random() * this.words().length);
    return this.words()[randomIndex];
  };
  currentWord = signal<Word>(this.setCurrentWord());
  // --------------------------------------------------------

  // Armazena as letras da palavra atual em um array
  lettersArray = signal(this.currentWord().word.split(''));

  // Normaliza as letras de uma palavra para maiúsculas e sem acentos
  letterNormalizer = (array: string[], letter: string) => {
    const lNorm = this.lettersArray().map((l) =>
      l.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    );
    const letterNormalized = lNorm.find(
      (l) =>
        l.normalize('NFD').replace(/[\u0300-\u036f]/g, '') ===
        letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    );
    return letterNormalized;
  };

   // Normaliza uma letra para maiúscula e sem acento
   lNormalizer = (letter: string) => {
    return letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
  };
  // Array que armazena as letras adivinhadas
  guessedLetters = signal(['']);

  // Array que armazena as letras erradas adivinhadas
  wrongGuesses = signal(['']);

  // Array que armazena as letras certas adivinhadas
  correctGuesses = signal(['']);

  // Armazena o estado do jogo (ganhou ou perdeu)
  isGameWon = signal(false);
  isGameOver = signal(false);
  stateManager = () => {
    if (this.wrongGuesses().length - 1 >= 6) {
      this.isGameOver.set(true);
      return 'Game Over!';
    }
    if (
      this.lettersArray().every((letter) =>
        this.correctGuesses().includes(letter.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
      )
    ) {
      this.isGameWon.set(true);
      return 'You Won!';
    }
    return 'Game in Progress';
  };
  // --------------------------------------------------------

  // Função que faz a mágica acontecer
  includeLetters = (letter: string) => {
    // Verifica se a letra já foi adivinhada antes
    if (this.guessedLetters().includes(letter.toUpperCase())) return;

    // se não foi adivinhada, adiciona a letra ao array de letras adivinhadas
    this.guessedLetters.update((guessed) => [...guessed, letter]);

    // Verifica se as letras adivinhadas estão na palavra atual
    const letterNormalized = this.letterNormalizer(this.lettersArray(), letter);
    const isCorrect = letterNormalized?.includes(letter.toUpperCase());
    // Se a letra não estiver na palavra atual, adiciona a letra ao array de letras erradas
    // Se a letra estiver na palavra atual, adiciona a letra ao array de letras certas
    if (!isCorrect && !this.isGameOver() && !this.isGameWon()) {
      // && !this.isGameOver() && !this.isGameWon()
      this.wrongGuesses.update((wrong) => [...wrong, letter]);
    } else {
      this.correctGuesses.update((correct) => [...correct, letter]);
    }

    // após adicionar a letra, verifica se o jogo acabou ou se o jogador ganhou
    this.stateManager();
    // console.log(this.stateManager());
  };

  // Função que reinicia o jogo
  // Reinicia o jogo, selecionando uma nova palavra e limpando os arrays de letras adivinhadas
  resetGame = () => {
    this.currentWord = signal<Word>(this.setCurrentWord());
    this.lettersArray.set(this.currentWord().word.split(''));
    this.guessedLetters.set(['']);
    this.wrongGuesses.set(['']);
    this.correctGuesses.set(['']);
    this.isGameOver.set(false);
    this.isGameWon.set(false);
  };
}
