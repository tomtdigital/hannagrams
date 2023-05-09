const UGridSeven = ({ data, round, active, onComplete }) => {
  const name = "UGridSeven";
  return (
    <>
      <p>{name}</p>
      <button
        className="bg-purple p-2 rounded-md text-white font-medium min-w-fit"
        onClick={onComplete}
      >
        Complete
      </button>
    </>
  );
};

export default UGridSeven;
