import {Observable} from "rxjs";
import {Pagination} from "./pagination";

// interface for a search service that can be injected into admin components
export interface SearchService<T extends Pagination> {
  search(search: string | null, page: number): Observable<T>
}
