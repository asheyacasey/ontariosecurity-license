import {Pagination} from "./pagination";
import {AdminUser} from "./user";
import {AdminCourse} from "./course";

export interface AdminCourseProgress {
  id: number;
  user: AdminUser;
  course: AdminCourse;
  lastSeenAt: string;
  lastSeenAgo: string;

  secondsSpent: number;
  secondsSpentRequired: number;

  modulesTotal: number;
  modulesCompleted: number;
}

export interface PagedAdminCourseProgress extends Pagination {
  items: AdminCourseProgress[];
}
