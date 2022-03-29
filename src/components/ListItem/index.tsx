import { Item } from "./styles";

interface Props {
  name: string;
  url: string;
  isFocused: boolean;
}

export const ListItem = (props: Props) => {
  const { name, url, isFocused } = props;

  const goToUrl = () => {
    window.open(url, "_blank");
  };

  return (
    <Item role="option" isFocused={isFocused} onClick={goToUrl}>
      {name}
    </Item>
  );
};
