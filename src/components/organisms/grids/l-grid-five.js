const LGridFive = ({ active, data, onComplete }) => {
  const name = "LGridFive";
  return (
    <>
      <p>{name}</p>
      <button
        className="bg-purple p-2 rounded-md text-white font-medium min-w-fit"
        onClick={onComplete}
        disabled={!active}
      >
        Complete
      </button>
    </>
  );
};

export default LGridFive;
