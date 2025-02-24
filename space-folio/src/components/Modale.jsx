import * as Dialog from "@radix-ui/react-dialog";
import "./Modale.css"; // Ajoute du style

export default function Modale({ open, onClose, title, content }) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content className="modal-content">
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{content}</Dialog.Description>
          <Dialog.Close className="modal-close">Fermer</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
