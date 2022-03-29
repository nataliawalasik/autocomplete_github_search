import * as api from "../services/githubApi";
import { act, renderHook } from "@testing-library/react-hooks";
import { usersMock } from "../usersMock";
import { useOnInputChange } from "../hooks/useOnInputChange";
import { of } from "rxjs";

jest
  .spyOn(api, "fetchRepositoriesAndUsers")
  .mockImplementation(() => of({ data: usersMock, error: null }));

afterEach(() => {
  jest.clearAllMocks();
});

test("makes api call on input change", async () => {
  const { result, waitFor } = renderHook(() => useOnInputChange());

  const { onChange } = result.current;

  const event = {
    target: { value: "test" },
  } as React.ChangeEvent<HTMLInputElement>;

  act(() => {
    onChange(event);
  });

  await waitFor(() => expect(api.fetchRepositoriesAndUsers).toBeCalledTimes(1));
});

test("doesn't make api call when input is too short", async () => {
  const { result } = renderHook(() => useOnInputChange());

  const { onChange } = result.current;

  const event = {
    target: { value: "te" },
  } as React.ChangeEvent<HTMLInputElement>;

  act(() => {
    onChange(event);
  });

  expect(api.fetchRepositoriesAndUsers).toBeCalledTimes(0);
});
