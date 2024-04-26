import { useContext } from "react";
import { AppContext } from "../utils/app-context";
import Grid from "./grid";
import AdvanceModal from "../molecules/advance-modal";
import VictoryModal from "../molecules/victory-modal";

const GridSection = ({ type, round, active, data, praise, maxScore }) => {
  const {
    tabIndex,
    setTabIndex,
    stage,
    setStage,
    totalStages,
    advanceModalVisible,
    setAdvanceModalVisible,
    cluesRevealed,
    score,
    setKeyPressed,
    lastCompletedGrid,
    finishedGrids,
    setFinishedGrids,
    setScore,
    victoryModalVisible,
    setVictoryModalVisible,
    correctSolution,
    setGameComplete,
  } = useContext(AppContext);

  const allGridsComplete = stage + 1 === totalStages;

  const advance = () => {
    // Calculate/set score
    const wordsAvailable = data.map((item) => item.word);
    let toAdd = 0;

    for (let x = 0; x < wordsAvailable.length; x++) {
      const word = wordsAvailable[x];
      if (cluesRevealed.includes(wordsAvailable[x])) {
        toAdd += word.length;
      } else {
        toAdd += word.length * 3;
      }
    }
    // Set the score
    const total = score + toAdd;
    setScore(total);
    // Reset values
    setKeyPressed("");
    setFinishedGrids([...finishedGrids, lastCompletedGrid]);
    setAdvanceModalVisible(false);

    if (allGridsComplete && correctSolution) {
      setGameComplete(true);
      setVictoryModalVisible(true);
    } else {
      // Advance game
      setStage(stage + 1);
      setTabIndex(tabIndex + 1);
    }
  };

  return (
    <>
      <Grid type={type} active={active} round={round} data={data} />
      <AdvanceModal
        visible={advanceModalVisible}
        stage={stage}
        data={data}
        praise={praise}
        handleAdvance={() => advance()}
      />
      <VictoryModal
        visible={victoryModalVisible}
        maxScore={maxScore}
        allGridsComplete={allGridsComplete}
      />
    </>
  );
};

export default GridSection;
