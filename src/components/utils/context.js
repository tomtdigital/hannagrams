import { useState } from "react";
import { AppContext } from "./app-context";

const ContextProvider = ({ children }) => {
  const [tabIndex, setTabIndex] = useState(1);
  const [stage, setStage] = useState(1);
  const [score, setScore] = useState(297);
  const [bonusUnlocked, setBonusUnlocked] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
