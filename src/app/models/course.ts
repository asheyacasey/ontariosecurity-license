import {Language} from "./language";

export interface CourseBasic {
  id: number;
  name: string;
  imageSmall: string;
  imageBig: string;
  description: string;
  price: number;
  cprTrainingIncluded: boolean;
  modules: CourseModule[];
  availableInLanguages: Language[];
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
  lectureIds: number[];
  secondsLeft: number;
  locked: boolean;
  completed: boolean;
}


export interface CourseTimer {
  secondsLeft: number;
}

export interface ModuleTimer extends CourseTimer {

}

/**
 * Describes the current navigation state in a given course
 */
export interface CourseNavigationState {
  courseId: number;
  itemType: 'lecture' | 'quiz';
  itemId: number;
}
