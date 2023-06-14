import { useContext } from "react";
import { AppContext } from "../utils/app-context";

const Bonus = ({ data, active }) => {
  const { setGameComplete } = useContext(AppContext);
  const { details, additionalLetters, word } = data;
  const inputWidth = 100 / word.length;
  console.log(additionalLetters.length);
  return (
    <div className="h-[calc(60vh-104px)]">
      <p>
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
            return (
              <div className="border-solid border-red border-[1px] min-h-[2em] flex items-center justify-center">
                <div>P</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Bonus;
