import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Testimonial} from "../../../models/testimonial";

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TestimonialsComponent implements OnInit {

  testimonials: Testimonial[] = [
    {
      pictureUrl: '/assets/testimonials/1.jpeg',
      name: 'Jordan',
      role: 'Security Guard',
      title: 'Effortless Learning',
      content: 'I cannot recommend this Ontario Security License platform enough! The learning process was so easy and the material was presented in a way that made it easy to understand. I was able to pass the ministry exam on my first try thanks to the comprehensive training provided by this platform. And I got hired as a Security Guard right after!'
    },
    {
      pictureUrl: '/assets/testimonials/2.jpeg',
      name: 'Adam',
      role: 'Security Guard',
      title: 'Making the Process Easy',
      content: 'I was a bit hesitant to start the process of getting my Ontario Security License, but this platform made it so easy. The online coursework was easy to follow and the practice quizzes helped me feel confident going into the ministry exam. I am happy to say that I passed the exam on my first attempt and a few weeks later got a well-paying job as a Security Guard!'
    },
    {
      pictureUrl: '/assets/testimonials/3.jpeg',
      name: 'Noah',
      role: 'Security Guard',
      title: 'Highly Recommended',
      content: 'I highly recommend the Ontario Security License platform to anyone looking to get their license. The material was easy to understand and the online format made it convenient for me to study at my own pace. I felt well-prepared for the ministry exam and I\'m grateful for the support provided by this platform in helping me pass.'
    }
  ]

  currentTestimonial: Testimonial = this.testimonials[0];

  constructor() { }

  ngOnInit(): void {
  }

  selectTestimonial(testimonial: Testimonial) {
    this.currentTestimonial = testimonial;
  }
}
