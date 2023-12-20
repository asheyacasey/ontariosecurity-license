export interface CourseOverview {
  id: number;
  name: string;
  imageSmall: string;
  imageBig: string;
  price: number;
  description: string;
  containsCPR: boolean;
  modules: CourseModule[];
}

export interface CourseModule {
  id: number;
  moduleNumber: number;
  name: string;
  summary: string;
}

export interface CourseProgressOverview extends CourseOverview {
  modulesCompleted: number;
}
