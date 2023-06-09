import { useState } from "react";
import { AppContext } from "./app-context";

const ContextProvider = ({ children }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [stage, setStage] = useState(0);
  const [cluesRevealed, setCluesRevealed] = useState([]);
  const [score, setScore] = useState(0);
  const [keyPressed, setKeyPressed] = useState("");
  const [modalVisible, setModalVisible] = useState(true);
  const [finishedGrids, setFinishedGrids] = useState([]);
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
        cluesRevealed,
        setCluesRevealed,
        score,
        setScore,
        finishedGrids,
        setFinishedGrids,
        bonusUnlocked,
        setBonusUnlocked,
        gameComplete,
        setGameComplete,
        keyPressed,
        setKeyPressed,
        modalVisible,
        setModalVisible,
        activeWord,
        setActiveWord,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
