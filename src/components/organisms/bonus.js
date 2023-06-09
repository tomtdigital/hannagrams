import { useContext } from "react";
import { AppContext } from "../utils/app-context";

const Bonus = ({ data, active }) => {
  const { setGameComplete } = useContext(AppContext);
  const { anagram, details, letter, word } = data;

  return (
    <div>
      <div className="flex justify-start">
        {[...Array(word.length)].map((_, index) => {
          return (
            <>
              <div>P</div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Bonus;
