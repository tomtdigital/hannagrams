import { useContext } from "react";
import { AppContext } from "../utils/app-context";

const Keyboard = () => {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M", "#"],
  ];

  const { gameComplete, setKeyPressed } = useContext(AppContext);

  return (
    <>
      {rows.map((row, index) => {
        let colClass = "grid-cols-10";
        if (index === 1) colClass = "grid-cols-9";
        if (index === 2) colClass = "grid-cols-8";

        return (
          // Row container
          <div
            key={row.toString()}
            className={`grid ${colClass} border-solid border-blue border-2`}
          >
            {row.map((char) => {
              return (
                //  Individual Buttons
                <div
                  key={char}
                  className={`flex items-center justify-center cursor-pointer bg-midGrey text-white mr-[0.2em] mb-[0.2em] rounded-[0.2em] text-center font-bold`}
                  onClick={(event) => {
                    event.preventDefault();
                    if (!gameComplete) {
                      //   object forces re-render
                      setKeyPressed({ letter: char });
                    }
                  }}
                >
                  <div>{char}</div>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default Keyboard;
