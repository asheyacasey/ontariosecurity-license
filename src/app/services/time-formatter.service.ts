import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeFormatterService {

  constructor() { }

    secondsToTime(totalSeconds: number): string {
    if (totalSeconds <= 0) {
      return '00:00:00';
    }

    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = (Math.floor(totalSeconds / 60) % 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }
}
