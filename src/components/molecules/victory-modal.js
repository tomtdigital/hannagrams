import { useContext } from "react";
import Modal from "./modal";
import { AppContext } from "../utils/app-context";

const VictoryModal = ({ visible, maxScore }) => {
  const { setVictoryModalVisible, score, bonusUnlocked, cluesRevealed } =
    useContext(AppContext);

  return (
    <Modal visible={visible}>
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
      {!bonusUnlocked && (
        <p>Next time, try to use less clues to unlock the bonus round</p>
      )}
      <button
        className="bg-yellow"
        onClick={() => setVictoryModalVisible(false)}
      >
        Close
      </button>
    </Modal>
  );
};

export default VictoryModal;
