import { Observable, switchMap, of, catchError, from, map } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { CustomResponse } from "./types";

export const fetch = <T extends unknown>(
  url: string
): Observable<CustomResponse<T>> => {
  return fromFetch(url).pipe(
    switchMap((response) => {
      if (response.ok) {
        return from(response.json()).pipe(
          map((data) => ({ data } as CustomResponse<T>))
        );
      }
      return of({
        error: `Error status ${response.status}`,
      } as CustomResponse<T>);
    }),
    catchError((err) => {
      return of({ error: err.message } as CustomResponse<T>);
    })
  );
};
