import GameWithData from "./components/utils/game-with-data";
import ContextProvider from "./components/utils/context";
import "./input.css";

const App = () => {
  return (
    <ContextProvider>
      <GameWithData />
    </ContextProvider>
  );
};

export default App;
