import { createPortal } from "react-dom";

const Modal = ({ children, closeModal }) => {
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        {/* <button onClick={closeModal}>Close</button> */}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
