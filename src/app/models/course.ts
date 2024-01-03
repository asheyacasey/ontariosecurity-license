export interface CourseBasic {
  id: number;
  name: string;
  imageSmall: string;
  imageBig: string;
  description: string;
  price: number;
  cprTrainingIncluded: boolean;
  modules: CourseModule[];
}

export interface CourseModule {
  id: number;
  moduleNumber: number;
  name: string;
  description: string;
}

export interface CourseProgressOverview extends CourseBasic {
  modulesCompleted: number;
}

export interface CourseProgressModule {
  id: number;
  moduleNumber: number;
  name: string;
  completed: boolean;
  lectureIds: number[];
}


export interface CourseTimer {
  secondsLeft: number;
}

/**
 * Describes the current navigation state in a given course
 */
export interface CourseNavigationState {
  courseId: number;
  itemType: 'lecture' | 'quiz';
  itemId: number;
}
