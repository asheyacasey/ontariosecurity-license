import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {EligibilityTestCheckRequest, EligibilityTestQuestion} from "../models/eligibility-test";
import {Observable, of} from "rxjs";
import {ModuleTimer} from "../models/course";

const QUESTIONS: EligibilityTestQuestion[] = [
  {
    question: 'How old are you?',
    answers: [
      {
        letter: 'A',
        answer: '16 or less'
      }, {
        letter: 'B',
        answer: '17'
      }, {
        letter: 'C',
        answer: '18',
      }, {
        letter: 'D',
        answer: '19 or more'
      }
    ]
  },
  {
    question: 'Do you have a CPR Certificate?',
    answers: [
      {
        letter: 'A',
        answer: 'Yes'
      }, {
        letter: 'B',
        answer: 'No'
      }
    ]
  },
  {
    question: 'Which of the following do you have?',
    answers: [
      {
        letter: 'A',
        answer: 'Canadian Passport'
      }, {
        letter: 'B',
        answer: 'Permanent Resident Card (PR)'
      }, {
        letter: 'C',
        answer: 'Study or Work Permit',
      }, {
        letter: 'D',
        answer: 'Canadian Birth Certificate'
      }, {
        letter: 'E',
        answer: 'None of above'
      }
    ]
  },
  {
    question: 'Do you have a clean criminal record?',
    answers: [
      {
        letter: 'A',
        answer: 'Yes'
      }, {
        letter: 'B',
        answer: 'No'
      }, {
        letter: 'C',
        answer: 'I don\'t know',
      }
    ]
  },
  {
    question: 'Were you ever licensed in another Canadian province?',
    answers: [
      {
        letter: 'A',
        answer: 'Yes'
      }, {
        letter: 'B',
        answer: 'No'
      }
    ]
  },
  {
    question: 'Do you have any previous security guard experience?',
    answers: [
      {
        letter: 'A',
        answer: 'Yes'
      }, {
        letter: 'B',
        answer: 'No'
      }
    ]
  },
]

@Injectable({
  providedIn: 'root'
})
export class EligibilityTestService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  check(data: EligibilityTestCheckRequest): Observable<any> {
    return this.http.post<ModuleTimer>(`${this.apiUrl}/eligibility-test/check`, data);
  }

  getQuestions(): Observable<EligibilityTestQuestion[]> {
    return of(QUESTIONS)
  }
}
