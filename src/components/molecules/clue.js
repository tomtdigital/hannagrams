import { useContext } from "react";
import { AppContext } from "../utils/app-context";

const Clue = ({ active }) => {
  const { activeWord, cluesRevealed, setCluesRevealed } =
    useContext(AppContext);

  const handleClueReveal = (word) => {
    setCluesRevealed([...cluesRevealed, word]);
  };

  return (
    <div className="text-center">
      <p className="text-[1.5em]">{`${activeWord.anagram} ${
        activeWord.details?.pronoun ? "(p)" : ""
      } ${
        activeWord.details?.wordCount
          ? `(${activeWord.details?.wordCount})`
          : ""
      }`}</p>
      {cluesRevealed?.includes(activeWord.word) || !active ? (
        <p className="text-[1em]">{activeWord.clue}</p>
      ) : (
        <button
          className="bg-green"
          onClick={() => handleClueReveal(activeWord.word)}
        >
          Reveal Description
        </button>
      )}
    </div>
  );
};

export default Clue;
