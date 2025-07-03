import { Injectable, signal } from '@angular/core';
import { Word } from '../utils/types';

@Injectable({
  providedIn: 'root'
})
export class WordGetterService {

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

  
  getWords(): Word[] {
    return this.words();
  }
}
