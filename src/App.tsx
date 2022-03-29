import "./App.css";
import { DropdownSearch } from "./components/DropdownSearch";
import { useOnInputChange } from "./components/hooks/useOnInputChange";
import { ListItem } from "./components/ListItem";

const App = () => {
  const { onChange, data, isLoading, errorMessage } = useOnInputChange();

  return (
    <div className="App">
      <DropdownSearch
        onChange={onChange}
        list={data}
        isLoading={isLoading}
        error={errorMessage}
        onSelectItem={(item) => {
          window.open(item.url);
        }}
        keyExtractor={(item) => item.id}
        renderItem={(item, index, selectedIndex) => (
          <ListItem
            key={item.id}
            name={item.name}
            url={item.url}
            isFocused={index === selectedIndex}
          />
        )}
      />
    </div>
  );
};

export default App;
