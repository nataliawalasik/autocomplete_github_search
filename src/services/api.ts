import { R } from "@mobily/ts-belt";
import { Observable, switchMap, of, catchError, from, map } from "rxjs";
import { fromFetch } from "rxjs/fetch";

export const fetchR = <T extends unknown>(
  url: string
): Observable<R.Result<T, Error>> => {
  const err = new Error(`An error occured. Please try again later`);
  return fromFetch(url).pipe(
    switchMap((response) => {
      if (response.ok) {
        return from(response.json()).pipe(
          map((data) => data as T),
          map((data) => R.fromNullable(data, err))
        );
      }
      return of(R.fromNullable(null, err));
    }),
    catchError((err) => {
      return of(R.fromNullable(null, err));
    })
  );
};
