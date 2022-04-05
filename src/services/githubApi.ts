import { map, Observable, withLatestFrom } from "rxjs";
import { fetch } from "./api";
import {
  ResponseItems,
  RepoItem,
  SearchData,
  UserItem,
  CustomResponse,
} from "./types";

const API_SEARCH_URL = "https://api.github.com/search";
const REPOSITORIES = "/repositories";
const USERS = "/users";

export const fetchRepositoriesAndUsers = (
  data: string
): Observable<CustomResponse<SearchData[]>> => {
  const searchParam = `?q=${data}`;

  const reposObservable$ = fetch<ResponseItems<RepoItem>>(
    `${API_SEARCH_URL}${REPOSITORIES}${searchParam}`
  ).pipe(
    map(({ data, error }) =>
      data
        ? [...data?.items].sort((a, b) => a.name.localeCompare(b.name))
        : error
    )
  );

  const usersObservable$ = fetch<ResponseItems<UserItem>>(
    `${API_SEARCH_URL}${USERS}${searchParam}`
  ).pipe(
    map(({ data, error }) =>
      data ? data.items?.sort((a, b) => a.login.localeCompare(b.login)) : error
    )
  );

  return reposObservable$.pipe(
    withLatestFrom(usersObservable$),
    map(([repositoriesResponse, usersResponse]) => {
      if (
        isRepositoriesRsponseData(repositoriesResponse) &&
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

        return { data: [...users, ...repos], error: null };
      }
      return { error: "An error occured. Please try again later", data: null };
    })
  );
};

const isRepositoriesRsponseData = (
  response: string | RepoItem[]
): response is RepoItem[] => {
  return typeof response !== "string" && Array.isArray(response);
};

const isUsersResponseData = (
  response: string | UserItem[]
): response is UserItem[] => {
  return typeof response !== "string" && Array.isArray(response);
};
