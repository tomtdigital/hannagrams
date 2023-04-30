import { useContext } from "react";
import { AppContext } from "../utils/app-context";

const Bonus = ({ data, active }) => {
  const name = "Bonus";
  const { setGameComplete } = useContext(AppContext);

  return (
    <>
      <p>{name}</p>
      <button
        className="bg-purple p-2 rounded-md text-white font-medium min-w-fit"
        onClick={() => setGameComplete(true)}
        disabled={!active}
      >
        Complete
      </button>
    </>
  );
};

export default Bonus;
