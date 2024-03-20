import {Component, OnInit} from '@angular/core';

export interface FAQAnswer {
  question: string;
  answer: string;
}

const ANSWERS: FAQAnswer[] = [
  {
    question: 'Is This Course Right For Me?',
    answer: `This course is for anyone looking to work as a Security Guard in Ontario. Just make sure you are:
1. At least 18 years of age
2. Have a Clean Criminal record
3. Can Work In Canada (Cad. Birth Certificate, Work Permit, Study Permit, Cad. Passport, PR Card, SIN Number)`
  }, {
    question: 'What Support Do You Provide For International Students?',
    answer: `We train many international students daily through this course. We provide a Live Instructor who speaks Hindi and Punjabi and also have course material available entirely in Hindi and Punjabi respectively as well.`
  }, {
    question: 'What Support Do You Have For Me AFTER I complete the course?',
    answer: `We have a Live Instructor who will help you with your Application to the Ministry. We will make sure you have all the correct forms filled out properly and that all the attachments are the corrects one in the correct format so that you won’t get rejected and that you will get your license without any delay as fast as possible.
Additionally, we help with Job Placement. You can use our Resume Builder to make an attractive Resume and then we will send it over to the recruiters at our Partner Companies to quickly get you hired.`
  }, {
    question: 'What makes your course different than all the other ones, What other benefits do I get When I take this course?',
    answer: `✔️ We provide Live Instructor Helpline and Support 24/7 – in English, Hindi & Punjabi
✔️ You can do our course entirely through your phone
✔️ You can do our course entirely from home, at your own pace during your free time
✔️ FREE help with Application Assistance so you avoid lengthy delays and quickly get your paperwork in properly so you can get your license in the shortest time frame possible.
✔️ FREE Insider Access to Companies & Jobs Not Advertised Publicly
✔️ FREE Proprietary Security Guard Resume Builder ($49 value)
✔️ Discounted Members-only Pricing for more Courses ($633 in savings) such as our Private Investigator Training, Loss Prevention Course, etc.
✔️ FREE lifetime access to the training material along with updates to contents and syllabus and new lessons.`
  }, {
    question: 'Can the entire course be done online, do I have to be in Canada to take this course?',
    answer: `Yes. You can do the course from anywhere in the world at any hour of the day. You will have 24/7 access to the training.`
  }, {
    question: 'Where and when is the CPR training provided?',
    answer: `You will notify us of where you live and what day and time works for you and we will slot you in to an in person training class closest to you.`
  }, {
    question: 'Is This Training Course Ministry Approved?',
    answer: `Yes. In fact we are the only Ministry Approved course permitted to offer multi-language training.`
  }, {
    question: 'What is the total price of the entire course?',
    answer: `$199.99 plus HST = $225.98`
  }, {
    question: 'Can I do the training course from my phone?',
    answer: `Yes. We are Mobile Friendly and Optimized. All the modules, videos, quizzes and anything else in the training can be done from your phone.`
  }, {
    question: 'How Can I Get A refund?',
    answer: `If you fail to pass the test and just can’t get licensed at all no matter what, send us an email at tcn@ontatiosecuritylicense.ca and we will refund you.`
  }, {
    question: 'How long will the entire process take?',
    answer: `It takes our students, on average, 4-5 days to get through the online training, it can be done faster and it can also take longer. It depends on your free time and how much of a rush you are i  to get it done and start working.`
  }, {
    question: 'What results have previous students received?',
    answer: `They got their license in record time and then also found a job much faster than anyone else.`
  }, {
    question: 'What languages is the course available in?',
    answer: `English, Hindi and Punjabi. French and other languages coming.`
  }, {
    question: 'What is the entire licensing process?',
    answer: `1. Complete Mandatory 40 Hour Training and Get TCN
2. Use TCN to Book Ministry Exam & Pass It By At least 63%
3. Submit all paperwork and application form to the Ministry.
4. Get Digital License within 3 days and the physical one in mail within 2 weeks.`
  }
]

@Component({
  selector: 'app-faq-v2',
  templateUrl: './faq-v2.component.html',
  styleUrls: ['./faq-v2.component.scss']
})
export class FaqV2Component implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  answers(): FAQAnswer[] {
    return ANSWERS;
  }

}
