const Modal = ({ visible, children }) => (
  <div
    className={`${
      !visible && "hidden"
    } fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-3 w-[calc(100vw-3em)] max-w-[350px] shadow-z1`}
  >
    {children}
  </div>
);

export default Modal;
