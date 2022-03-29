import { useState } from "react";
import { useObservableCallback, useObservableState } from "observable-hooks";
import { ChangeEvent } from "react";
import { map, tap, switchMap, from, of, iif, debounceTime } from "rxjs";
import { fetchRepositoriesAndUsers } from "../../services/githubApi";
import { SearchData } from "../../services/types";

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
          from(
            fetchRepositoriesAndUsers(data).pipe(
              map(({ data, error }) => {
                setIsLoading(false);
                if (error) {
                  setErrorMessage(error);
                  return null;
                } else {
                  return data;
                }
              })
            )
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
