import { useContext } from "react";
import EGridSeven from "./grids/e-grid-seven";
import IGridNine from "./grids/i-grid-nine";
import LGridFive from "./grids/l-grid-five";
import OGridFive from "./grids/o-grid-five";
import UGridSeven from "./grids/u-grid-seven";
import VGridNine from "./grids/v-grid-nine";
import { AppContext } from "../utils/app-context";

const Grid = ({ type, active, round, data }) => {
  const { setAdvanceModalVisible, setLastCompletedGrid } =
    useContext(AppContext);

  const handleComplete = (grid) => {
    setAdvanceModalVisible(true);
    setLastCompletedGrid(grid);
  };

  switch (type) {
    case "l-5":
      return (
        <LGridFive
          active={active}
          round={round}
          data={data}
          onComplete={handleComplete}
        />
      );
    case "o-5":
      return (
        <OGridFive
          active={active}
          round={round}
          data={data}
          onComplete={handleComplete}
        />
      );
    case "e-7":
      return (
        <EGridSeven
          active={active}
          round={round}
          data={data}
          onComplete={handleComplete}
        />
      );
    case "u-7":
      return (
        <UGridSeven
          active={active}
          round={round}
          data={data}
          onComplete={handleComplete}
        />
      );
    case "i-9":
      return (
        <IGridNine
          active={active}
          round={round}
          data={data}
          onComplete={handleComplete}
        />
      );
    case "v-9":
      return (
        <VGridNine
          active={active}
          round={round}
          data={data}
          onComplete={handleComplete}
        />
      );

    default:
      break;
  }
};

export default Grid;
