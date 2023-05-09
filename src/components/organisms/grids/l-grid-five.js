import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../utils/app-context";

const LGridFive = ({ active, data, round, onComplete }) => {
  // All downs then all acrosses
  const baseGrid = [
    [
      { cell: 0, guess: "", answer: data[0].word[0].toUpperCase() },
      { cell: 4, guess: "", answer: data[0].word[1].toUpperCase() },
      { cell: 8, guess: "", answer: data[0].word[2].toUpperCase() },
      { cell: 12, guess: "", answer: data[0].word[3].toUpperCase() },
      { cell: 16, guess: "", answer: data[0].word[4].toUpperCase() },
    ],
    [
      { cell: 16, guess: "", answer: data[1].word[0].toUpperCase() },
      { cell: 17, guess: "", answer: data[1].word[1].toUpperCase() },
      { cell: 18, guess: "", answer: data[1].word[2].toUpperCase() },
      { cell: 19, guess: "", answer: data[1].word[3].toUpperCase() },
    ],
  ];
  const { keyPressed, setActiveWord, finishedGrids } = useContext(AppContext);
  const [grid, setGrid] = useState(
    finishedGrids[round]?.length > 0 ? finishedGrids[round] : baseGrid
  );
  const wordCells = baseGrid.map((word) => word.map((letter) => letter.cell));
  const activeCells = wordCells.flatMap((cell) => cell);
  const [toggledWord, setToggledWord] = useState(wordCells[0]);
  const [toggledCell, setToggledCell] = useState(toggledWord[0]);

  const toggleWords = (cell) => {
    // Only do something if its a cell in the game
    if (activeCells.includes(cell)) {
      setToggledCell(cell);
      const possibleToggles = wordCells.filter((word) => word.includes(cell));
      // Just toggle the word if there is only one word to choose from
      if (possibleToggles.length === 1) {
        setToggledWord(possibleToggles[0]);
      } else {
        // If there is more than one word to toggle...
        const possibleTogglesString = possibleToggles.map((word) =>
          JSON.stringify(word)
        );
        const toggledWordString = JSON.stringify(toggledWord);
        const startingIndex = possibleTogglesString.indexOf(toggledWordString);
        // ...and the currently toggled word isnt a possiblility for toggling, toggle the first available word.
        //  Do the same if the word is included but the loop needs to start over
        if (
          startingIndex === -1 ||
          startingIndex === possibleToggles.length - 1
        ) {
          setToggledWord(possibleToggles[0]);
        } else {
          setToggledWord(possibleToggles[startingIndex + 1]);
        }
      }
    }
  };

  const handleClick = (cell) => {
    toggleWords(cell);
  };

  const getWordLocation = () => {
    const toggledWordString = JSON.stringify(toggledWord);
    const wordCellStrings = wordCells.map((cellSet) => JSON.stringify(cellSet));
    return wordCellStrings.indexOf(toggledWordString);
  };

  useEffect(() => {
    setActiveWord(data[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const wordLocation = getWordLocation();
    setActiveWord(data[wordLocation]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggledWord]);

  useEffect(() => {
    const handleKeyPress = ({ letter: guess }) => {
      const newGrid = grid.map((word) =>
        word.map((letter) =>
          letter.cell === toggledCell
            ? { ...letter, guess: guess === "DEL" ? "" : guess }
            : letter
        )
      );
      setGrid(newGrid);
      const cellPosition = toggledWord.indexOf(toggledCell);
      const wordLocation = getWordLocation();

      if (guess === "DEL") {
        if (cellPosition === 0) {
          console.log(wordLocation);
          if (wordLocation === 0) {
            const lastWord = wordCells[wordCells.length - 1];
            setToggledWord(lastWord);
            setToggledCell(lastWord[lastWord.length - 1]);
          } else {
            const newWord = wordCells[wordLocation - 1];
            setToggledWord(newWord);
            if (newWord[newWord.length - 1] === toggledCell) {
              setToggledCell(newWord[newWord.length - 2]);
            } else {
              setToggledCell(newWord[newWord.length - 1]);
            }
          }
        } else {
          setToggledCell(toggledWord[cellPosition - 1]);
        }
      } else {
        if (cellPosition === toggledWord.length - 1) {
          if (wordLocation === wordCells.length - 1) {
            setToggledWord(wordCells[0]);
            setToggledCell(wordCells[0][0]);
          } else {
            const newWord = wordCells[wordLocation + 1];
            setToggledWord(newWord);
            if (newWord[0] === toggledCell) {
              setToggledCell(newWord[1]);
            } else {
              setToggledCell(newWord[0]);
            }
          }
        } else {
          setToggledCell(toggledWord[cellPosition + 1]);
        }
      }
    };

    if (keyPressed && active) handleKeyPress(keyPressed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyPressed]);

  useEffect(() => {
    if (
      active &&
      grid.every((word) =>
        word.every((letter) => letter.guess === letter.answer)
      )
    )
      onComplete(grid);
  }, [active, grid, onComplete]);

  return (
    <div className="flex justify-center h-[calc(60vh-104px)]">
      <div className="grid grid-cols-4 grid-rows-5 w-[calc(60vh-104px-12%)]">
        {[...Array(20)].map((_, index) => {
          let background;
          let text;
          if (activeCells.includes(index)) {
            background = "bg-yellow";
            text = "text-black";
          }
          if (toggledWord.includes(index)) {
            background = "bg-purple";
            text = "text-white";
          }
          if (toggledCell === index) background = "bg-darkPurple";
          const value = grid
            .flatMap(
              (word) => word.find((letter) => letter.cell === index)?.guess
            )
            .find((letter) => typeof letter === "string");

          return (
            <div
              key={`cell ${index}`}
              className={`flex justify-center items-center ${background} ${
                activeCells.includes(index)
                  ? "border-solid border-[0.5px] border-darkGrey"
                  : ""
              }`}
              onClick={() => handleClick(index)}
            >
              <div className={`${text}`}>{value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LGridFive;
