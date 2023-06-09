const Modal = ({ visible, stage, data, praise }) => (
  <div
    className={`${
      !visible && "hidden"
    } fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-3`}
  >
    <p>Stage {stage + 1} Complete!</p>
    <p>{praise[stage]}</p>
    <p>Here were the descriptors for your answers-</p>
    {data.map((item) => (
      <p>
        {item.word.toUpperCase()} - {item.clue}
      </p>
    ))}
  </div>
);

export default Modal;
