import { formatCell } from "../utils/format-cell";

const FiveGridBase = ({
  activeCells,
  toggledWord,
  toggledCell,
  grid,
  handleClick,
}) => {
  return (
    <div className="flex justify-center h-[calc(60vh-104px)]">
      <div className="grid grid-cols-4 grid-rows-5 w-[calc(60vh-104px-12%)]">
        {[...Array(20)].map((_, index) => {
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

export default FiveGridBase;
