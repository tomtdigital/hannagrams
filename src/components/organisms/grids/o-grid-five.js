// Reminder- set score as you go
// Reminder- set clues used as you go

const OGridFive = ({ active, data, onComplete }) => {
  const name = "OGridFive";
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

export default OGridFive;
