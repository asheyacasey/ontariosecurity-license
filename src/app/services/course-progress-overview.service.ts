import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {CourseProgressOverview} from "../models/course";

const COURSES: CourseProgressOverview[] = [
  {
    id: 1,
    name: 'Security Guard Training + CPR',
    imageSmall: '/assets/course-1.png',
    imageBig: '/assets/course-image-1.png',
    price: 1249,
    description: `Featured: Essential learning for security guard training<br><br>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br><br>
  Ipsum dolor sit amet consectetur adipiscing elit. Id cursus metus aliquam eleifend mi. Nisi scelerisque eu ultrices vitae auctor eu augue. Curabitur vitae nunc sed velit dignissim sodales. Felis eget nunc lobortis mattis. Faucibus turpis in eu mi. Donec ultrices tincidunt arcu non sodales neque.<br><br>
  Diam volutpat commodo sed egestas egestas. Sem fringilla ut morbi tincidunt augue. Eu sem integer vitae justo eget magna fermentum. Id eu nisl nunc mi ipsum faucibus vitae. Posuere morbi leo urna molestie at elementum eu.<br><br>
  Ultricies integer quis auctor elit. Dictum at tempor commodo ullamcorper a. Magna sit amet purus gravida quis blandit turpis. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Cras semper auctor neque vitae. Facilisis magna etiam tempor orci. Diam in arcu cursus euismod. Vivamus arcu felis bibendum ut tristique. Imperdiet proin fermentum leo vel orci porta.<br><br>
  Vitae sapien pellentesque habitant morbi tristique senectus et. Lobortis scelerisque fermentum dui faucibus in ornare quam. Sed euismod nisi porta lorem mollis aliquam ut porttitor. Tristique risus nec feugiat in fermentum posuere urna nec tincidunt. Ultrices in iaculis nunc sed.<br><br>
  Quis enim lobortis scelerisque fermentum dui faucibus in. Nisi vitae suscipit tellus mauris a. Turpis massa tincidunt dui ut ornare lectus sit. Morbi tincidunt ornare massa eget egestas purus. Dui accumsan sit amet nulla facilisi morbi tempus iaculis urna. Egestas congue quisque egestas diam in arcu cursus euismod quis.<br><br>
  Duis tristique sollicitudin nibh sit amet commodo nulla facilisi.
  `,
    containsCPR: true,
    modules: [
      {
        id: 1,
        moduleNumber: 1,
        name: 'Hello first module',
        summary: 'Fist module desc'
      },
      {
        id: 2,
        moduleNumber: 2,
        name: 'Hello second module',
        summary: 'Second module desc'
      }
    ],
    modulesCompleted: 2
  }
];

@Injectable({
  providedIn: 'root'
})
export class CourseProgressOverviewService {

  constructor() { }

  getAll(): Observable<CourseProgressOverview[]> {
    return of(COURSES)
  }
}
