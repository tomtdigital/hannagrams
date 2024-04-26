import { useContext } from "react";
import Modal from "./modal";
import { AppContext } from "../utils/app-context";

const VictoryModal = ({ visible, maxScore, allGridsComplete }) => {
  const { setVictoryModalVisible, score, cluesRevealed, stage, totalStages } =
    useContext(AppContext);

  const content = allGridsComplete ? (
    <>
      <p>Hannagrams Complete!</p>
      <p>Yessss!!! You did it!!! The Hannah's go fucking mental!!!</p>
      <p>
        Your final score was {score}/{maxScore}
      </p>
      {cluesRevealed.length > 0 && (
        <p>
          You needed {cluesRevealed.length} clue
          {cluesRevealed.length === 1 ? "" : "s"}
        </p>
      )}
      <button
        className="bg-yellow"
        onClick={() => setVictoryModalVisible(false)}
      >
        Close
      </button>
    </>
  ) : (
    <>
      <p>Theme Solved!</p>
      <p>
        Yessss!!! You got the theme with only {stage + 1} of {totalStages}{" "}
        letters.
      </p>
      <p>
        See how close you can get to the maximum score of {maxScore} with the
        remaining grids!
      </p>
      <button
        className="bg-yellow"
        onClick={() => setVictoryModalVisible(false)}
      >
        Close
      </button>
    </>
  );

  return <Modal visible={visible}>{content}</Modal>;
};

export default VictoryModal;
