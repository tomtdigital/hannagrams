import Modal from "./modal";

const AdvanceModal = ({ visible, stage, data, praise, handleAdvance }) => (
  <Modal visible={visible}>
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
  </Modal>
);

export default AdvanceModal;
