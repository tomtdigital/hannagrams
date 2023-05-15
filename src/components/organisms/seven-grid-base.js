import { formatCell } from "../utils/format-cell";

const SevenGridBase = ({
  activeCells,
  toggledWord,
  toggledCell,
  grid,
  handleClick,
}) => {
  return (
    <div className="flex justify-center h-[calc(60vh-104px)]">
      <div className="grid grid-cols-5 grid-rows-7 w-[calc(60vh-104px-12%)]">
        {[...Array(35)].map((_, index) => {
          const { backgroundColor, textColor, value } = formatCell(
            index,
            activeCells,
            toggledWord,
            toggledCell,
            grid
          );

          return (
            <div
              key={`cell ${index}`}
              className={`flex justify-center items-center ${backgroundColor} ${
                activeCells.includes(index)
                  ? "border-solid border-[0.5px] border-darkGrey"
                  : ""
              }`}
              onClick={() => handleClick(index)}
            >
              <div className={`${textColor}`}>{value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SevenGridBase;
