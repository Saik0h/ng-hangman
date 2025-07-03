import { Injectable } from '@angular/core';
import { Word } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  lNormalizer = (letter: string) => {
    return letter
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();
  };

  letterNormalizer = (array: string[], letter: string) => {
    const lNorm = array.map((l) =>
      l.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    );
    const letterNormalized = lNorm.find(
      (l) =>
        l.normalize('NFD').replace(/[\u0300-\u036f]/g, '') ===
        letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    );
    return letterNormalized;
  };

  setCurrentWord = (words: Word[]) => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };
}
