import type { Song } from "@/domain/Song";
import type { RestPagination } from "@/api/rest/RestSong";

export interface Page<T> {
  results: T[];
  pagination: RestPagination;
}
