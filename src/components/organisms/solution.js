import { useContext, useEffect, useState } from "react";
import { AppContext } from "../utils/app-context";
import VictoryModal from "../molecules/victory-modal";

const Solution = ({ text, active, maxScore }) => {
  const {
    setGameComplete,
    keyPressed,
    stage,
    totalStages,
    victoryModalVisible,
    setVictoryModalVisible,
    solutionGuess,
    setSolutionGuess,
    correctSolution,
    setCorrectSolution,
  } = useContext(AppContext);
  const word = text.replace(/ /g, "");
  const multipleWords = text.includes(" ");
  const [toggledCell, setToggledCell] = useState(0);
  const allGridsComplete = stage === totalStages;

  useEffect(() => {
    const handleKeyPress = ({ letter }) => {
      if (letter === "DEL") {
        if (toggledCell === 0) {
          setSolutionGuess(
            " " + solutionGuess.substring(1, solutionGuess.length)
          );
          setToggledCell(word.length - 1);
        } else {
          const partOne = solutionGuess.substring(0, toggledCell);
          const partTwo = solutionGuess.substring(
            toggledCell + 1,
            solutionGuess.length
          );
          setToggledCell(toggledCell - 1);
          setSolutionGuess(partOne + " " + partTwo);
        }
      } else {
        if (toggledCell === 0) {
          setSolutionGuess(
            letter + solutionGuess.substring(1, solutionGuess.length)
          );
          setToggledCell(toggledCell + 1);
        } else {
          const partOne = solutionGuess.substring(0, toggledCell);
          const partTwo = solutionGuess.substring(
            toggledCell + 1,
            solutionGuess.length
          );
          if (toggledCell === word.length - 1) {
            setToggledCell(0);
          } else {
            setToggledCell(toggledCell + 1);
          }
          setSolutionGuess(partOne + letter + partTwo);
        }
      }
    };

    if (keyPressed && active && !correctSolution) handleKeyPress(keyPressed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyPressed]);

  useEffect(() => {
    if (
      solutionGuess.toUpperCase() === word.toUpperCase() &&
      !correctSolution
    ) {
      if (allGridsComplete) {
        setGameComplete(true);
      }
      setCorrectSolution(true);
      setVictoryModalVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solutionGuess, word, setGameComplete]);

  return (
    <>
      <div className="h-[calc(60vh-104px)]">
        <h1 className="text-center text-header1">{`${
          correctSolution ? "" : "Enter "
        } Solution`}</h1>
        {!correctSolution && (
          <>
            <p className="my-2">
              Can you guess the theme that ties everything together?
            </p>
            <p className="my-2">Use all of the grid shapes</p>
          </>
        )}
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
                  <div className={`text-${color}`}>{solutionGuess[index]}</div>
                </div>
              );
            })}
          </div>
        </div>
        {multipleWords && !correctSolution && (
          <p className="my-2">Word count: {text.split(" ").length}</p>
        )}
      </div>
      <VictoryModal
        visible={victoryModalVisible}
        allGridsComplete={allGridsComplete}
        maxScore={maxScore}
      />
    </>
  );
};

export default Solution;
