import "./Modal.css";

interface ModalProps {
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const Modal = ({ message, onClose, onConfirm }: ModalProps) => {
  return (
    <div className="modal-container">
      <div className="modal2">
        <p>{message}</p>
        <div className="modal2-buttons">
          {onConfirm && <button onClick={onConfirm}>Ja</button>}
          <button onClick={onClose}>{onConfirm ? "Nej" : "Stäng"}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
