import {CourseOverview} from "../../../models/course";

export interface SelectableCourseOverview extends CourseOverview {
  selected: boolean;
}
