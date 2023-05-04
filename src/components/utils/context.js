import { useState } from "react";
import { AppContext } from "./app-context";

const ContextProvider = ({ children }) => {
  const [tabIndex, setTabIndex] = useState(1);
  const [stage, setStage] = useState(1);
  const [score, setScore] = useState(297);
  const [keyPressed, setKeyPressed] = useState("");
  const [bonusUnlocked, setBonusUnlocked] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [activeWord, setActiveWord] = useState({});

  return (
    <AppContext.Provider
      value={{
        tabIndex,
        setTabIndex,
        stage,
        setStage,
        score,
        setScore,
        bonusUnlocked,
        setBonusUnlocked,
        gameComplete,
        setGameComplete,
        keyPressed,
        setKeyPressed,
        activeWord,
        setActiveWord,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
