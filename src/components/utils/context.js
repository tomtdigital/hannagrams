import { useState } from "react";
import { AppContext } from "./app-context";

const ContextProvider = ({ children }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [totalStages, setTotalStages] = useState(0);
  const [stage, setStage] = useState(0);
  const [cluesRevealed, setCluesRevealed] = useState([]);
  const [score, setScore] = useState(0);
  const [keyPressed, setKeyPressed] = useState("");
  const [advanceModalVisible, setAdvanceModalVisible] = useState(false);
  const [victoryModalVisible, setVictoryModalVisible] = useState(false);
  const [lastCompletedGrid, setLastCompletedGrid] = useState([]);
  const [finishedGrids, setFinishedGrids] = useState([]);
  const [solutionGuess, setSolutionGuess] = useState("");
  const [correctSolution, setCorrectSolution] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [activeWord, setActiveWord] = useState({});

  return (
    <AppContext.Provider
      value={{
        tabIndex,
        setTabIndex,
        totalStages,
        setTotalStages,
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
        solutionGuess,
        setSolutionGuess,
        correctSolution,
        setCorrectSolution,
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
