import {CourseBasic} from "./course";

export interface SelectableCourseOverview extends CourseBasic {
  selected: boolean;
}
