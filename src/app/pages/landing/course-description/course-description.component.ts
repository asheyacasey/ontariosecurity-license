import {Component, OnInit} from '@angular/core';
import {CourseBasic, CourseModule} from "../../../models/course";
import {CourseOverviewService} from "../../../services/course-overview.service";
import {SelectableCourseOverview} from "../../../models/selectable-course-overview";
import {LandingRegisterModalComponent} from "../register-modal/landing-register-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


export interface Course {
  icon: string;
  title: string;
  price: string
}

const COURSES: { [key: string]: Course } = {
  'false': {
    icon: '/assets/course-1-icon.png',
    title: 'Security Guard & CPR Training Course',
    price: '199.99'
  },
  'true': {
    icon: '/assets/course-2-icon.png',
    title: 'Security Guard Training Course',
    price: '99.99'
  }
}

export interface SelectableCourseModule extends CourseModule {
  selected: boolean;
}

@Component({
  selector: 'app-course-description',
  templateUrl: './course-description.component.html',
  styleUrls: ['./course-description.component.scss']
})
export class CourseDescriptionComponent implements OnInit {

  jobs: string[] = [
    'Airport Security',
    'Mall Security',
    'Loss Prevention Security',
    'Condominium Concierge',
    'Close Protection',
    'Night Club or Bar "bouncer"',
    'Special Event Security',
    'Mobile Patrol',
  ];

  currentCourse: Course = COURSES['false'];
  modules: SelectableCourseModule[] = [];

  constructor(
    private modalService: NgbModal,
    private courseOverviewService: CourseOverviewService) {
  }

  ngOnInit(): void {
    this.courseOverviewService.getAll().subscribe((courses: CourseBasic[]) => {
      this.modules = courses[0].modules.map((c => c as SelectableCourseModule));
      this.modules[0].selected = true;
    });
  }

  goToSignUp(): void {
    this.modalService.open(LandingRegisterModalComponent, {size: 'lg'});
  }

  changeCourseType($event: Event) {
    this.currentCourse = COURSES[(($event.target as HTMLInputElement).checked.toString())]
  }

  toggleModule(module: SelectableCourseModule) {
    module.selected = !module.selected;
  }
}
