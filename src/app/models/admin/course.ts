import {Pagination} from "./pagination";

export interface AdminCourse {
  id: number;
  name: string;
  price: number;
  enabled: boolean;
  secondsSpentRequired: number;
  cprTrainingIncluded: boolean;
}

export interface PagedAdminCourses extends Pagination {
  items: AdminCourse[];
}

