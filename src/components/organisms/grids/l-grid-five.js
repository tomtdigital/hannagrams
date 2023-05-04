import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../utils/app-context";

const LGridFive = ({ active, data, onComplete }) => {
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
  const [grid, setGrid] = useState(baseGrid);
  const wordCells = baseGrid.map((word) => word.map((letter) => letter.cell));
  const activeCells = wordCells.flatMap((cell) => cell);
  const [toggledLine, setToggledLine] = useState(wordCells[0]);
  const [toggledCell, setToggledCell] = useState(toggledLine[0]);
  const { keyPressed } = useContext(AppContext);

  const toggleWords = (cell) => {
    // Only do something if its a cell in the game
    if (activeCells.includes(cell)) {
      setToggledCell(cell);
      const possibleToggles = wordCells.filter((word) => word.includes(cell));
      // Just toggle the word if there is only one word to choose from
      if (possibleToggles.length === 1) {
        setToggledLine(possibleToggles[0]);
      } else {
        // If there is more than one word to toggle...
        const possibleTogglesString = possibleToggles.map((word) =>
          JSON.stringify(word)
        );
        const toggledLineString = JSON.stringify(toggledLine);
        const startingIndex = possibleTogglesString.indexOf(toggledLineString);
        // ...and the currently toggled word isnt a possiblility for toggling, toggle the first available word.
        //  Do the same if the word is included but the loop needs to start over
        if (
          startingIndex === -1 ||
          startingIndex === possibleToggles.length - 1
        ) {
          setToggledLine(possibleToggles[0]);
        } else {
          setToggledLine(possibleToggles[startingIndex + 1]);
        }
      }
    }
  };

  const handleClick = (cell) => {
    toggleWords(cell);
  };

  useEffect(() => {
    const handleKeyPress = ({ letter: guess }) => {
      const newGrid = grid.map((word) =>
        word.map((letter) =>
          letter.cell === toggledCell ? { ...letter, guess } : letter
        )
      );
      setGrid(newGrid);
    };

    handleKeyPress(keyPressed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyPressed]);

  useEffect(() => {
    if (
      grid.every((word) =>
        word.every((letter) => letter.guess === letter.answer)
      )
    )
      onComplete();
  }, [grid, onComplete]);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-4 w-[calc(60vh-104px-12%)] min-h-[calc(60vh-104px)]">
        {[...Array(20)].map((_, index) => {
          let background;
          let text;
          if (activeCells.includes(index)) {
            background = "bg-yellow";
            text = "text-black";
          }
          if (toggledLine.includes(index)) {
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
