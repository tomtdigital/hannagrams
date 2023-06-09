import { useContext } from "react";
import { AppContext } from "../utils/app-context";
import EGridSeven from "./grids/e-grid-seven";
import IGridNine from "./grids/i-grid-nine";
import LGridFive from "./grids/l-grid-five";
import OGridFive from "./grids/o-grid-five";
import UGridSeven from "./grids/u-grid-seven";
import VGridNine from "./grids/v-grid-nine";

const Grid = ({ type, round, active, data, bonusScore }) => {
  const {
    tabIndex,
    setTabIndex,
    stage,
    setStage,
    setModalVisible,
    cluesRevealed,
    score,
    setKeyPressed,
    setScore,
    finishedGrids,
    setFinishedGrids,
    setBonusUnlocked,
    setGameComplete,
  } = useContext(AppContext);

  const onComplete = (stageGrid) => {
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

    const total = score + toAdd;
    setScore(total);
    setKeyPressed("");
    // Save grid
    setFinishedGrids([...finishedGrids, stageGrid]);
    setModalVisible(true);

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

  switch (type) {
    case "l-5":
      return (
        <LGridFive
          active={active}
          round={round}
          data={data}
          onComplete={onComplete}
        />
      );
    case "o-5":
      return (
        <OGridFive
          active={active}
          round={round}
          data={data}
          onComplete={onComplete}
        />
      );
    case "e-7":
      return (
        <EGridSeven
          active={active}
          round={round}
          data={data}
          onComplete={onComplete}
        />
      );
    case "u-7":
      return (
        <UGridSeven
          active={active}
          round={round}
          data={data}
          onComplete={onComplete}
        />
      );
    case "i-9":
      return (
        <IGridNine
          active={active}
          round={round}
          data={data}
          onComplete={onComplete}
        />
      );
    case "v-9":
      return (
        <VGridNine
          active={active}
          round={round}
          data={data}
          onComplete={onComplete}
        />
      );

    default:
      break;
  }
};

export default Grid;
