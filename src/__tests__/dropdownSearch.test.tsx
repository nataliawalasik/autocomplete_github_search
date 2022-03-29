import { DropdownSearch } from "../components/DropdownSearch";
import { render, unmountComponentAtNode } from "react-dom";
import { screen, fireEvent } from "@testing-library/react";
import { usersMock } from "../usersMock";

let container = null;
const onChange = jest.fn();
const data = usersMock;
const isLoading = false;
const keyExtractor = (item) => item.id;
const renderItem = () => <></>;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("fires input change event once", () => {
  render(
    <DropdownSearch
      list={data}
      onChange={onChange}
      isLoading={isLoading}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />,
    container
  );

  const input = screen.getByRole("input");
  fireEvent.change(input, { target: { value: "change" } });

  expect(onChange).toHaveBeenCalledTimes(1);
});

test("shows list when data is defined", async () => {
  render(
    <DropdownSearch
      list={data}
      onChange={onChange}
      isLoading={isLoading}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />,
    container
  );

  expect(screen.getByRole("list")).toBeInTheDocument();
});

test("shows empty state when list is empty", async () => {
  render(
    <DropdownSearch
      list={[]}
      onChange={onChange}
      isLoading={isLoading}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />,
    container
  );

  expect(screen.getByText("No results found")).toBeInTheDocument();
});
