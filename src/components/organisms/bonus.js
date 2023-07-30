import { useContext, useEffect, useState } from "react";
import { AppContext } from "../utils/app-context";

const Bonus = ({ data, active }) => {
  const { setGameComplete, keyPressed, score, setScore } =
    useContext(AppContext);
  const { details, additionalLetters, word } = data;
  const multipleWords = details.wordCount && details.wordCount > 1;
  const [toggledCell, setToggledCell] = useState(0);
  const [guess, setGuess] = useState("");

  useEffect(() => {
    const handleKeyPress = ({ letter }) => {
      if (letter === "DEL") {
        if (toggledCell === 0) {
          setGuess(" " + guess.substring(1, guess.length));
          setToggledCell(word.length - 1);
        } else {
          const partOne = guess.substring(0, toggledCell);
          const partTwo = guess.substring(toggledCell + 1, guess.length);
          setToggledCell(toggledCell - 1);
          setGuess(partOne + " " + partTwo);
        }
      } else {
        if (toggledCell === 0) {
          setGuess(letter + guess.substring(1, guess.length));
          setToggledCell(toggledCell + 1);
        } else {
          const partOne = guess.substring(0, toggledCell);
          const partTwo = guess.substring(toggledCell + 1, guess.length);
          if (toggledCell === word.length - 1) {
            setToggledCell(0);
          } else {
            setToggledCell(toggledCell + 1);
          }
          setGuess(partOne + letter + partTwo);
        }
      }
    };

    if (keyPressed && active) handleKeyPress(keyPressed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyPressed]);

  useEffect(() => {
    if (guess.toUpperCase() === word.toUpperCase()) {
      setGameComplete(true);
      setScore(score + 20);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guess, word, setGameComplete]);

  return (
    <div className="h-[calc(60vh-104px)]">
      <h1 className="text-center text-header1">Bonus Round</h1>
      <p className="my-2">
        Congratulations on completing all of the grids! Can you guess the{" "}
        {`${!multipleWords || !details.wordCount ? "word" : "phrase"}`} that
        ties everything together?
      </p>
      <p className="my-2">
        Use all of the grid shapes, plus the letter
        {additionalLetters.length > 1 ? "s" : ""}{" "}
        {additionalLetters.map(
          (letter, index) =>
            `${letter}${index < additionalLetters.length - 1 ? "," : ""}`
        )}{" "}
      </p>
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
                <div className={`text-${color}`}>{guess[index]}</div>
              </div>
            );
          })}
        </div>
      </div>
      {multipleWords && <p className="my-2">Word count: {details.wordCount}</p>}
      <p>Toggled cell {toggledCell}</p>
    </div>
  );
};

export default Bonus;
