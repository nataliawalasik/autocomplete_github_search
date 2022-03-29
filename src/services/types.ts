export interface ResponseItems<T> {
  items: T[];
}

export interface RepoItem {
  name: string;
  id: number;
  html_url: string;
}

export interface UserItem {
  login: string;
  id: number;
  html_url: string;
}

export interface SearchData {
  id: number;
  name: string;
  url: string;
}

export interface CustomResponse<T> {
  data?: T;
  error?: string;
}
