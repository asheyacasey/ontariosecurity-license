export interface EligibilityTestAnswer {
  letter: string;
  answer: string;
}

export interface EligibilityTestQuestion {
  question: string;
  answers: EligibilityTestAnswer[];
}

export interface EligibilityTestCheckRequest {
  email: string;
  answers: string[];
}
