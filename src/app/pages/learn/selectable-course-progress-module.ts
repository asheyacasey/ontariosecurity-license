import {CourseProgressModule} from "../../models/course";

export interface SelectableCourseProgressModule extends CourseProgressModule {
  selected: boolean;
}
