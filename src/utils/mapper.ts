import { Result, R } from "@mobily/ts-belt";
import { Observable, share, map } from "rxjs";

//[R.Result<ResponseItems<RepoItem>, Error>, R.Result<ResponseItems<UserItem>, Error>]
export const mapR =
  <Ok, E, X>(mappingFn: (r: Ok) => NonNullable<X>) =>
  ($: Observable<Result<Ok, E>>[]) => {
    return $.pipe(
      share(),
      map((result) => {
        if (R.isOk(result)) {
          return R.Ok(mappingFn(R.getExn(result)));
        }
        return result;
      })
    );
  };
