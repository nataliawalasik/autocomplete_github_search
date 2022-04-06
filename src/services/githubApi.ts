import { withLatestFrom } from "rxjs";
import { mapR } from "../utils/mapper";
import { fetchR } from "./api";
import { ResponseItems, RepoItem, SearchData, UserItem } from "./types";

const API_SEARCH_URL = "https://api.github.com/search";
const REPOSITORIES = "/repositories";
const USERS = "/users";

export const fetchRepositoriesAndUsers = (data: string) => {
  const searchParam = `?q=${data}`;

  const reposObservable$ = fetchR<ResponseItems<RepoItem>>(
    `${API_SEARCH_URL}${REPOSITORIES}${searchParam}`
  );
  //   .pipe(
  //   mapR((data) => {
  //     return [...data.items].sort((a, b) => a.name.localeCompare(b.name));
  //   }),
  //   map(R.getWithDefault([] as RepoItem[]))
  // );

  const usersObservable$ = fetchR<ResponseItems<UserItem>>(
    `${API_SEARCH_URL}${USERS}${searchParam}`
  );

  return reposObservable$.pipe(
    withLatestFrom(usersObservable$),
    // map array of Observable<Result>
    mapR(([repositoriesResponse, usersResponse]) => {
      if (
        isRepositoriesResponseData(repositoriesResponse) &&
        isUsersResponseData(usersResponse)
      ) {
        const repos: SearchData[] = repositoriesResponse.map(
          ({ name, html_url, id }) => ({
            id,
            name,
            url: html_url,
          })
        );
        const users: SearchData[] = usersResponse.map(
          ({ login, html_url, id }) => ({
            id,
            name: login,
            url: html_url,
          })
        );
        return users.concat(repos);
      }
    })
  );
};

const isRepositoriesResponseData = (
  response: string | RepoItem[]
): response is RepoItem[] => {
  return typeof response !== "string" && Array.isArray(response);
};

const isUsersResponseData = (
  response: string | UserItem[]
): response is UserItem[] => {
  return typeof response !== "string" && Array.isArray(response);
};
