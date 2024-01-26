import { useContext, useEffect, useState } from "react";
import { AppContext } from "../utils/app-context";
import VictoryModal from "../molecules/victory-modal";

const Bonus = ({ data, active, maxScore }) => {
  const {
    setGameComplete,
    keyPressed,
    score,
    setScore,
    victoryModalVisible,
    setVictoryModalVisible,
    bonusGuess,
    setBonusGuess,
  } = useContext(AppContext);
  const { category } = data;
  const word = category.replace(/ /g, "");
  const multipleWords = category.includes(" ");
  const [toggledCell, setToggledCell] = useState(0);

  useEffect(() => {
    const handleKeyPress = ({ letter }) => {
      if (letter === "DEL") {
        if (toggledCell === 0) {
          setBonusGuess(" " + bonusGuess.substring(1, bonusGuess.length));
          setToggledCell(word.length - 1);
        } else {
          const partOne = bonusGuess.substring(0, toggledCell);
          const partTwo = bonusGuess.substring(
            toggledCell + 1,
            bonusGuess.length
          );
          setToggledCell(toggledCell - 1);
          setBonusGuess(partOne + " " + partTwo);
        }
      } else {
        if (toggledCell === 0) {
          setBonusGuess(letter + bonusGuess.substring(1, bonusGuess.length));
          setToggledCell(toggledCell + 1);
        } else {
          const partOne = bonusGuess.substring(0, toggledCell);
          const partTwo = bonusGuess.substring(
            toggledCell + 1,
            bonusGuess.length
          );
          if (toggledCell === word.length - 1) {
            setToggledCell(0);
          } else {
            setToggledCell(toggledCell + 1);
          }
          setBonusGuess(partOne + letter + partTwo);
        }
      }
    };

    if (keyPressed && active) handleKeyPress(keyPressed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyPressed]);

  useEffect(() => {
    if (bonusGuess.toUpperCase() === word.toUpperCase()) {
      setGameComplete(true);
      setScore(score + 20);
      setVictoryModalVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bonusGuess, word, setGameComplete]);

  return (
    <>
      <div className="h-[calc(60vh-104px)]">
        <h1 className="text-center text-header1">Bonus Round</h1>
        <p className="my-2">
          Congratulations on completing all of the grids! Can you guess the{" "}
          {`${!multipleWords ? "word" : "phrase"}`} that ties everything
          together?
        </p>
        <p className="my-2">Use all of the grid shapes</p>
        <div className="flex justify-center p-4">
          <div className={`w-[100%] grid grid-cols-${word.length}`}>
            {[...Array(word.length)].map((_, index) => {
              const background = index === toggledCell ? "purple" : "yellow";
              const color = index === toggledCell ? "white" : "black";
              return (
                <div
                  onClick={() => {
                    setToggledCell(index);
                  }}
                  className={`cursor-pointer border-solid border-black bg-${background} border-[1px] min-h-[2em] flex items-center justify-center`}
                >
                  <div className={`text-${color}`}>{bonusGuess[index]}</div>
                </div>
              );
            })}
          </div>
        </div>
        {multipleWords && (
          <p className="my-2">Word count: {category.split(" ").length}</p>
        )}
        <p>Toggled cell {toggledCell}</p>
      </div>
      <VictoryModal visible={victoryModalVisible} maxScore={maxScore} />
    </>
  );
};

export default Bonus;
