import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Spinner } from "../Spinner";
import {
  Container,
  DropdownBox,
  DropdownContainer,
  Input,
  ListWrapper,
  TextContainer,
} from "./styles";

const clamp = (max: number, min: number, value) =>
  Math.min(Math.max(value, min), max);

type Props<T> = {
  list: T[];
  isLoading: boolean;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectItem?: (item: T) => void;
  renderItem: (
    item: T,
    index: number,
    selectedIndex: number
  ) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
};

export const DropdownSearch = <T,>(props: Props<T>) => {
  const {
    onChange,
    list,
    error,
    isLoading,
    onSelectItem,
    renderItem,
    keyExtractor,
  } = props;
  const disableOptionHover = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  );

  // eslint-disable-next-line
  const listRefMemo = useMemo<HTMLDivElement[]>(() => [], [list]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      disableOptionHover.current = true;

      if (e.code === "ArrowUp") {
        setSelectedIndex(
          clamp(
            49,
            0,
            typeof selectedIndex === "number" ? selectedIndex - 1 : 0
          )
        );
      }

      if (e.code === "ArrowDown") {
        setSelectedIndex(
          clamp(
            49,
            0,
            typeof selectedIndex === "number" ? selectedIndex + 1 : 0
          )
        );
      }

      if (e.code === "Enter") {
        onSelectItem?.(list[selectedIndex]);
      }
    },
    [selectedIndex, setSelectedIndex, onSelectItem, list]
  );

  const onMouseMove = (index: number) => () => {
    if (!disableOptionHover.current) {
      setSelectedIndex(index);
    }
  };

  useEffect(() => {
    disableOptionHover.current &&
      listRefMemo[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
  }, [selectedIndex, listRefMemo]);

  useEffect(() => setSelectedIndex(0), [list]);

  return (
    <Container
      ref={containerRef}
      onMouseMove={() => {
        disableOptionHover.current = false;
      }}
    >
      <DropdownContainer>
        <Input
          placeholder="Search..."
          onChange={onChange}
          onKeyDown={handleKeyDown}
          role="input"
        ></Input>

        <DropdownBox visible={!!(isLoading || error || list)}>
          {error ? (
            <TextContainer>{error}</TextContainer>
          ) : isLoading ? (
            <Spinner />
          ) : list?.length > 0 ? (
            <ListWrapper role="list">
              {list.map((item, index) => (
                <div
                  key={keyExtractor(item)}
                  onMouseMove={onMouseMove(index)}
                  ref={(ref) => {
                    listRefMemo[index] = ref;
                  }}
                >
                  {renderItem(item, index, selectedIndex)}
                </div>
              ))}
            </ListWrapper>
          ) : (
            <TextContainer>No results found</TextContainer>
          )}
        </DropdownBox>
      </DropdownContainer>
    </Container>
  );
};
