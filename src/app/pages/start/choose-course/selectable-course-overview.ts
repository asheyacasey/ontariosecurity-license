import {CourseBasic} from "../../../models/course";

export interface SelectableCourseOverview extends CourseBasic {
  selected: boolean;
}
