import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../utils/app-context";

// Look at data
// Make keyboard
// Have individual value for cell stored in state
// Update guess in useeffect

const LGridFive = ({ active, data, onComplete }) => {
  // All downs then all acrosses
  const wordCells = [
    [0, 4, 8, 12, 16],
    [16, 17, 18, 19],
  ];
  const activeCells = wordCells.flatMap((cell) => cell);
  const [toggledWord, setToggledWord] = useState(wordCells[0]);
  const [toggledCell, setToggledCell] = useState(toggledWord[0]);
  console.log(data);

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

  const { keyPressed } = useContext(AppContext);

  useEffect(() => {
    const handleKeyPress = () => {};
    handleKeyPress(keyPressed);
  }, [keyPressed]);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-4 w-[calc(60vh-104px-12%)] h-[calc(60vh-104px)]">
        {[...Array(20)].map((_, index) => {
          let background;
          if (activeCells.includes(index)) background = "bg-yellow";
          if (toggledWord.includes(index)) background = "bg-purple";
          if (toggledCell === index) background = "bg-darkPurple";
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
              <div>{/* Insert letter */}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LGridFive;
