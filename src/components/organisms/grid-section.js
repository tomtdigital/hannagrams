import { useContext } from "react";
import { AppContext } from "../utils/app-context";
import Modal from "../molecules/modal";
import Grid from "./grid";

const GridSection = ({ type, round, active, data, praise, bonusScore }) => {
  const {
    tabIndex,
    setTabIndex,
    stage,
    setStage,
    modalVisible,
    setModalVisible,
    cluesRevealed,
    score,
    setKeyPressed,
    lastCompletedGrid,
    finishedGrids,
    setFinishedGrids,
    setScore,
    setBonusUnlocked,
    setGameComplete,
  } = useContext(AppContext);

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
    setModalVisible(false);

    // Advance game
    if (stage === 5) {
      // Unlock bonus
      if (total >= bonusScore) {
        setBonusUnlocked(true);
        setStage(stage + 1);
        setTabIndex(tabIndex + 1);
      } else {
        setGameComplete(true);
      }
    } else {
      setStage(stage + 1);
      setTabIndex(tabIndex + 1);
    }
  };

  return (
    <>
      <Grid type={type} active={active} round={round} data={data} />
      <Modal
        visible={modalVisible}
        stage={stage}
        data={data}
        praise={praise}
        handleAdvance={() => advance()}
      />
    </>
  );
};

export default GridSection;
