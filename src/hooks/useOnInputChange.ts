import { useState } from "react";
import { useObservableCallback, useObservableState } from "observable-hooks";
import { ChangeEvent } from "react";
import { map, tap, switchMap, of, iif, debounceTime, catchError } from "rxjs";
import { fetchRepositoriesAndUsers } from "../services/githubApi";
import { SearchData } from "../services/types";
import { R } from "@mobily/ts-belt";

export const useOnInputChange = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(null);

  const [onChange, textChange$] = useObservableCallback<
    SearchData[],
    ChangeEvent<HTMLInputElement>
  >((inputSubject$) =>
    inputSubject$.pipe(
      debounceTime(300),
      map((event) => event.target.value),
      tap(() => {
        setIsLoading(true);
        setErrorMessage(null);
      }),
      switchMap((data) =>
        iif(
          () => data.length > 2,
          fetchRepositoriesAndUsers(data).pipe(
            map((output) => {
              console.log(output);
              setIsLoading(false);
              return output;
            }),
            catchError((e) => {
              setErrorMessage(e);
              return of(null);
            })
          ),
          of(null)
        )
      ),
      map((array) => array?.slice(0, 50)),
      tap(() => setIsLoading(false))
    )
  );
  const data = useObservableState(textChange$);

  return { onChange, data, isLoading, errorMessage };
};
