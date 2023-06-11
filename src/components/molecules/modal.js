const Modal = ({ visible, stage, data, praise, handleAdvance }) => (
  <div
    className={`${
      !visible && "hidden"
    } fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-3 w-[calc(100vw-3em)] max-w-[350px] shadow-z1`}
  >
    <p>Stage {stage + 1} Complete!</p>
    <p>{praise[stage]}</p>
    <p>Here were the descriptors for your answers-</p>
    {data.map((item) => (
      <p key={item.word}>
        {item.word.toUpperCase()} - {item.clue}
      </p>
    ))}
    <button className="bg-yellow" onClick={handleAdvance}>
      Advance
    </button>
  </div>
);

export default Modal;
