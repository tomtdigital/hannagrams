import { useState } from "react";
import { AppContext } from "./app-context";

const ContextProvider = ({ children }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [stage, setStage] = useState(0);
  const [cluesRevealed, setCluesRevealed] = useState([]);
  const [score, setScore] = useState(0);
  const [keyPressed, setKeyPressed] = useState("");
  const [advanceModalVisible, setAdvanceModalVisible] = useState(false);
  const [victoryModalVisible, setVictoryModalVisible] = useState(false);
  const [lastCompletedGrid, setLastCompletedGrid] = useState([]);
  const [finishedGrids, setFinishedGrids] = useState([]);
  const [bonusUnlocked, setBonusUnlocked] = useState(false);
  const [bonusGuess, setBonusGuess] = useState("");
  const [gameComplete, setGameComplete] = useState(false);
  const [activeWord, setActiveWord] = useState({});

  return (
    <AppContext.Provider
      value={{
        tabIndex,
        setTabIndex,
        stage,
        setStage,
        cluesRevealed,
        setCluesRevealed,
        score,
        setScore,
        lastCompletedGrid,
        setLastCompletedGrid,
        finishedGrids,
        setFinishedGrids,
        bonusUnlocked,
        setBonusUnlocked,
        bonusGuess,
        setBonusGuess,
        gameComplete,
        setGameComplete,
        keyPressed,
        setKeyPressed,
        advanceModalVisible,
        setAdvanceModalVisible,
        victoryModalVisible,
        setVictoryModalVisible,
        activeWord,
        setActiveWord,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
