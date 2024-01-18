import { Injectable } from '@angular/core';
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class TimeConverterService {

  constructor() { }

  ngbDateStructToString(struct: NgbDateStruct | null): string | null {
    if (struct === null) {
      return null;
    }
    return `${struct.year}-${struct.month}-${struct.day}`;
  }

  stringToNgbDateStruct(data: string | null): NgbDateStruct | null {
    if (data === null || data === '') {
      return null;
    }

    const parts = data.split('-');
    return {
      year: Number(parts[0]),
      month: Number(parts[1]),
      day: Number(parts[2])
    }
  }
}
