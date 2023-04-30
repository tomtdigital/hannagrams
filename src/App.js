import Game from "./components/pages/game";
import ContextProvider from "./components/utils/context";
// import Welcome from "./components/pages/welcome";
import "./input.css";

const App = () => {
  return (
    <ContextProvider>
      {/* <Welcome /> */}
      <Game />
    </ContextProvider>
  );
};

export default App;
